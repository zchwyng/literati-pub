'use server';

import OpenAI from 'openai';
import { put } from '@vercel/blob';
import { pool } from './db';
import { stackServerApp } from '../stack';
import { revalidatePath, cacheTag, revalidateTag } from 'next/cache';

// --- Internal Cached Functions ---

async function getProjectsInternal(userId: string) {
  'use cache';
  cacheTag(`user-${userId}-projects`);

  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 AND COALESCE(archived, false) = false ORDER BY COALESCE(pinned, false) DESC, created_at DESC',
      [userId]
    );
    return result.rows;
  } catch (error) {
    // If pinned or archived column doesn't exist yet, fall back to simple query
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === '42703'
    ) {
      const result = await pool.query(
        'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    }
    throw error;
  }
}

async function getProjectInternal(id: string, userId: string) {
  'use cache';
  cacheTag(`project-${id}`);

  const result = await pool.query(
    'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return result.rows[0];
}

async function getAudioGenerationsInternal(projectId: string) {
  'use cache';
  cacheTag(`project-${projectId}-audio`);

  const result = await pool.query(
    'SELECT * FROM audio_generations WHERE project_id = $1 ORDER BY created_at DESC',
    [projectId]
  );
  return result.rows;
}

async function getCoverGenerationsInternal(projectId: string) {
  'use cache';
  cacheTag(`project-${projectId}-covers`);

  try {
    const result = await pool.query(
      'SELECT * FROM cover_generations WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    );
    return result.rows;
  } catch {
    return [];
  }
}

// --- Project Management ---

export async function createProject(title: string, content: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  if (!title || !content) {
    throw new Error('Title and content are required');
  }

  const result = await pool.query(
    'INSERT INTO projects (user_id, title, content) VALUES ($1, $2, $3) RETURNING id',
    [user.id, title, content]
  );

  revalidateTag(`user-${user.id}-projects`, 'max');
  revalidatePath('/dashboard');
  return result.rows[0].id;
}

export async function getProjects() {
  const user = await stackServerApp.getUser();
  if (!user) return [];
  return getProjectsInternal(user.id);
}

export async function getProject(id: string) {
  const user = await stackServerApp.getUser();
  if (!user) return null;
  return getProjectInternal(id, user.id);
}

export async function updateProject(
  id: string,
  data: { title?: string; content?: string }
) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  const updates: string[] = [];
  const values: (string | number)[] = [];
  let paramIndex = 1;

  if (data.title !== undefined) {
    updates.push(`title = $${paramIndex++}`);
    values.push(data.title);
  }

  if (data.content !== undefined) {
    updates.push(`content = $${paramIndex++}`);
    values.push(data.content);
  }

  if (updates.length === 0) {
    return;
  }

  values.push(id, user.id);
  await pool.query(
    `UPDATE projects SET ${updates.join(
      ', '
    )} WHERE id = $${paramIndex++} AND user_id = $${paramIndex}`,
    values
  );

  revalidateTag(`project-${id}`, 'max');
  revalidateTag(`user-${user.id}-projects`, 'max');
  revalidatePath(`/dashboard/project/${id}`);
  revalidatePath('/dashboard');
}

export async function deleteProject(id: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  await pool.query('DELETE FROM projects WHERE id = $1 AND user_id = $2', [
    id,
    user.id,
  ]);
  revalidateTag(`user-${user.id}-projects`, 'max');
  revalidateTag(`project-${id}`, 'max');
  revalidatePath('/dashboard');
}

export async function togglePinProject(id: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  // First get current pinned status
  const project = await getProject(id);
  if (!project) throw new Error('Project not found');

  const newPinnedStatus = !(project.pinned ?? false);

  try {
    await pool.query(
      'UPDATE projects SET pinned = $1 WHERE id = $2 AND user_id = $3',
      [newPinnedStatus, id, user.id]
    );
  } catch (error: any) {
    // If pinned column doesn't exist, we need to add it first
    if (error?.code === '42703') {
      // Add the column if it doesn't exist
      await pool.query(
        'ALTER TABLE projects ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT false'
      );
      // Try again
      await pool.query(
        'UPDATE projects SET pinned = $1 WHERE id = $2 AND user_id = $3',
        [newPinnedStatus, id, user.id]
      );
    } else {
      throw error;
    }
  }

  revalidateTag(`project-${id}`, 'max');
  revalidateTag(`user-${user.id}-projects`, 'max');
  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/project/${id}`);
  return newPinnedStatus;
}

export async function toggleArchiveProject(id: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  // First get current archived status
  const project = await getProject(id);
  if (!project) throw new Error('Project not found');

  const newArchivedStatus = !(project.archived ?? false);

  try {
    await pool.query(
      'UPDATE projects SET archived = $1 WHERE id = $2 AND user_id = $3',
      [newArchivedStatus, id, user.id]
    );
  } catch (error) {
    // If archived column doesn't exist, we need to add it first
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === '42703'
    ) {
      // Add the column if it doesn't exist
      await pool.query(
        'ALTER TABLE projects ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT false'
      );
      // Try again
      await pool.query(
        'UPDATE projects SET archived = $1 WHERE id = $2 AND user_id = $3',
        [newArchivedStatus, id, user.id]
      );
    } else {
      throw error;
    }
  }

  revalidateTag(`project-${id}`, 'max');
  revalidateTag(`user-${user.id}-projects`, 'max');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/archive');
  revalidatePath(`/dashboard/project/${id}`);
  return newArchivedStatus;
}

// --- TTS & Audio ---

export async function getAudioGenerations(projectId: string) {
  const user = await stackServerApp.getUser();
  if (!user) return [];

  // Verify ownership implicitly by joining or checking project first.
  const project = await getProject(projectId);
  if (!project) return [];

  return getAudioGenerationsInternal(projectId);
}

export async function generateTtsForProject(projectId: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  const project = await getProject(projectId);
  if (!project) throw new Error('Project not found');

  const text = project.content;
  if (!text) throw new Error('No content to generate audio from');

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    // Generate speech
    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: text.slice(0, 4096), // Truncate for MVP safety
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    // Upload to Blob
    const filename = `tts-${projectId}-${Date.now()}.mp3`;
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'audio/mpeg',
    });

    // Save Record
    await pool.query(
      'INSERT INTO audio_generations (project_id, audio_url) VALUES ($1, $2)',
      [projectId, blob.url]
    );

    revalidateTag(`project-${projectId}-audio`, 'max');
    revalidatePath(`/dashboard`);
    return blob.url;
  } catch (error) {
    console.error('Error generating TTS:', error);
    throw new Error('Failed to generate audio');
  }
}

// --- Cover Image Generation ---

export async function generateCoverImage(
  projectId: string,
  prompt: string,
  model: string = 'dalle-3'
) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Unauthorized');

  const project = await getProject(projectId);
  if (!project) throw new Error('Project not found');

  if (!prompt || prompt.trim().length === 0) {
    throw new Error('Prompt is required');
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    // Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: model === 'dalle-3' ? 'dall-e-3' : 'dall-e-2',
      prompt: `Professional book cover design: ${prompt}. High quality, detailed, book cover illustration.`,
      n: 1,
      size: model === 'dalle-3' ? '1024x1024' : '1024x1024',
      quality: 'standard',
    });

    if (
      !response.data ||
      response.data.length === 0 ||
      !response.data[0]?.url
    ) {
      throw new Error('No image URL returned from OpenAI');
    }
    const imageUrl = response.data[0].url;

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Upload to Blob
    const filename = `cover-${projectId}-${Date.now()}.png`;
    const blob = await put(filename, imageBuffer, {
      access: 'public',
      contentType: 'image/png',
    });

    // Save to database (we'll need to create a covers table or add to projects)
    // For now, let's store it in a covers table
    try {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS cover_generations (
          id SERIAL PRIMARY KEY,
          project_id VARCHAR(255) NOT NULL,
          cover_url TEXT NOT NULL,
          prompt TEXT,
          model VARCHAR(50),
          created_at TIMESTAMP DEFAULT NOW()
        )`
      );

      await pool.query(
        'INSERT INTO cover_generations (project_id, cover_url, prompt, model) VALUES ($1, $2, $3, $4)',
        [projectId, blob.url, prompt, model]
      );
    } catch (dbError) {
      console.error('Error saving cover to database:', dbError);
      // Continue even if DB save fails
    }

    revalidateTag(`project-${projectId}-covers`, 'max');
    revalidatePath(`/dashboard/project/${projectId}`);
    return blob.url;
  } catch (error) {
    console.error('Error generating cover image:', error);
    throw new Error('Failed to generate cover image');
  }
}

export async function getCoverGenerations(projectId: string) {
  const user = await stackServerApp.getUser();
  if (!user) return [];

  const project = await getProject(projectId);
  if (!project) return [];

  return getCoverGenerationsInternal(projectId);
}

// Legacy/Simple Action (Optional, kept for reference or quick testing)
export async function generateTtsFromText(_text: string) {
  // ... implementation ...
  // For now I'll remove it or comment it out to force usage of the robust flow
  // or just leave it for the landing page demo if we want a "try it out" feature without login.
  // I'll leave a stub or the original if the user wants to keep the demo.
  // I'll assume we move to the dashboard flow.
  return null;
}
