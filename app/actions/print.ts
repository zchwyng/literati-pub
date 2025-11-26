'use server';

import { put } from '@vercel/blob';
import { pool } from '../db';
import { stackServerApp } from '../../stack';
import { revalidatePath } from 'next/cache';
import mammoth from 'mammoth';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { FONTS, type FontKey } from '../lib/print-constants';

// --- Shared PDF Generation Logic ---

async function generateBookPdf(
  htmlContent: string,
  jobId: string,
  format: 'print' | 'ebook',
  fontKey: FontKey = 'baskerville'
) {
  const isPrint = format === 'print';
  const fontConfig = FONTS[fontKey] || FONTS['baskerville'];

  // Styles
  // Print: 6x9", specific margins, serif font
  // eBook: A5 (or similar standard), larger text, sans-serif or flexible font, smaller margins (reading on screen)
  const css = isPrint
    ? `
      @page { size: 6in 9in; margin: 0; }
      body { 
        font-family: ${fontConfig.family}; 
        font-size: 10.5pt; 
        line-height: 1.5; 
        text-align: justify; 
        margin: 0; 
        padding: 0; 
        -webkit-font-smoothing: antialiased; 
        color: #111; 
        text-rendering: optimizeLegibility;
      }
      
      /* Chapter Headers */
      h1 { 
        page-break-before: always; 
        page-break-inside: avoid;
        margin-top: 30vh; /* Deep sink for chapter start */
        margin-bottom: 0.8in; 
        text-align: center; 
        font-size: 24pt; 
        font-weight: 700; 
        letter-spacing: -0.02em;
        line-height: 1.2;
      }
      
      /* Standard Paragraphs */
      p { 
        margin: 0; 
        text-indent: 1.5em; /* Classic indent */
        orphans: 2; 
        widows: 2; 
      }
      
      /* First Paragraph after Header (No Indent + Drop Cap optional) */
      h1 + p, h2 + p { 
        text-indent: 0; 
      }
      
      /* Scene Breaks (* * *) */
      p.scene-break {
        text-align: center;
        text-indent: 0;
        margin-top: 1em;
        margin-bottom: 1em;
        font-size: 1.2em;
        letter-spacing: 0.5em;
      }
      /* Paragraph AFTER a scene break is also not indented */
      p.scene-break + p {
        text-indent: 0;
      }
      `
    : `
      @page { size: A5; margin: 20mm; } 
      body { font-family: ${fontConfig.family}, "Georgia", serif; font-size: 11pt; line-height: 1.7; color: #1a1a1a; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
      h1 { page-break-before: always; margin-top: 1em; margin-bottom: 0.5em; font-size: 22pt; color: #111; text-align: left; font-weight: 700; }
      p { margin-bottom: 1.2em; text-align: left; } 
      `;

  const printHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?${fontConfig.url}&display=swap" rel="stylesheet">
        <style>${css}</style>
      </head>
      <body>${htmlContent}</body>
    </html>
  `;

  const isLocal = process.env.NODE_ENV === 'development';
  const browser = await puppeteer.launch({
    args: isLocal ? [] : chromium.args,
    defaultViewport: null,
    executablePath: isLocal
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(printHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      width: isPrint ? '6in' : '148mm', // A5 width
      height: isPrint ? '9in' : '210mm', // A5 height
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 9px; font-family: ${fontConfig.family}; width: 100%; text-align: center; padding-bottom: 15px;">
          <span class="pageNumber"></span>
        </div>
      `,
      margin: {
        top: isPrint ? '0.75in' : '20mm',
        bottom: isPrint ? '0.75in' : '20mm',
        left: isPrint ? '0.75in' : '15mm',
        right: isPrint ? '0.75in' : '15mm',
      },
    });

    // Upload PDF
    const pdfFilename = `${format}-ready-${jobId}.pdf`;
    const pdfBlob = await put(pdfFilename, Buffer.from(pdfBuffer), {
      access: 'public',
      contentType: 'application/pdf',
    });

    // Update DB
    await pool.query(
      'UPDATE print_jobs SET pdf_file_url = $1, status = $2 WHERE id = $3',
      [pdfBlob.url, 'completed', jobId]
    );
  } catch (e) {
    throw e;
  } finally {
    await browser.close();
  }
}

// --- Action: Create Job from Uploaded DOCX ---

export async function createPrintJob(
  projectId: string,
  formData: FormData,
  format: 'print' | 'ebook' = 'print',
  fontKey: FontKey = 'baskerville'
) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  const file = formData.get('file') as File;
  if (!file) throw new Error('No file uploaded');

  try {
    // Upload original
    const originalFilename = `orig-${projectId}-${Date.now()}.docx`;
    const originalBlob = await put(originalFilename, file, {
      access: 'public',
    });

    // DB Record
    const result = await pool.query(
      'INSERT INTO print_jobs (project_id, original_file_url, status, format, font) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [projectId, originalBlob.url, 'processing', format, fontKey]
    );
    const jobId = result.rows[0].id;

    // Convert Docx -> HTML
    const buffer = Buffer.from(await file.arrayBuffer());
    const { value: html } = await mammoth.convertToHtml({ buffer });

    // Generate PDF
    await generateBookPdf(html, jobId, format, fontKey);

    revalidatePath(`/dashboard/project/${projectId}`);
    return jobId;
  } catch (error) {
    console.error('Print Job Error:', error);
    throw new Error('Failed to create print job');
  }
}

// --- Action: Create Job from Project Content (Text) ---

export async function createPrintJobFromContent(
  projectId: string,
  format: 'print' | 'ebook' = 'print',
  fontKey: FontKey = 'baskerville'
) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  try {
    // Fetch Content
    const projectRes = await pool.query(
      'SELECT content FROM projects WHERE id = $1 AND user_id = $2',
      [projectId, user.id]
    );
    const content = projectRes.rows[0]?.content;
    if (!content) throw new Error('No content found');

    // DB Record
    const result = await pool.query(
      'INSERT INTO print_jobs (project_id, original_file_url, status, format, font) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [projectId, '', 'processing', format, fontKey]
    );
    const jobId = result.rows[0].id;

    // Convert Text -> HTML
    const paragraphs = content.split(/\n\s*\n/);
    const html = paragraphs
      .filter((p: string) => p.trim().length > 0)
      .map((p: string) => `<p>${p.trim()}</p>`)
      .join('');

    // Generate PDF
    await generateBookPdf(html, jobId, format, fontKey);

    revalidatePath(`/dashboard/project/${projectId}`);
    return jobId;
  } catch (error) {
    console.error('Print Job Error:', error);
    throw new Error('Failed to create print job from content');
  }
}

export async function getPrintJobs(projectId: string) {
  const user = await stackServerApp.getUser();
  if (!user) return [];

  const result = await pool.query(
    'SELECT * FROM print_jobs WHERE project_id = $1 ORDER BY created_at DESC',
    [projectId]
  );
  return result.rows;
}
