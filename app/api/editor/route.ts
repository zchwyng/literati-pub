import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const modeDescriptions = {
  dramaturgy: 'story structure, pacing, and narrative flow',
  style: 'voice, consistency, and readability',
  spelling: 'spelling, grammar, and sentence clarity',
  analysis: 'holistic editing feedback',
} as const;

export async function POST(req: Request) {
  try {
    const {
      prompt,
      focus = 'all',
      language = 'en',
      depth = 'standard',
      tone = 'professional',
      mode = 'analysis',
    } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response('Missing prompt text', { status: 400 });
    }

    const focusLabel =
      focus === 'all' ? 'overall editing' : `${focus} improvements`;

    const targetMode =
      modeDescriptions[mode as keyof typeof modeDescriptions] ??
      modeDescriptions.analysis;

    const depthLabel =
      depth === 'comprehensive'
        ? 'comprehensive and highly detailed'
        : depth === 'thorough'
          ? 'thorough and specific'
          : depth === 'quick'
            ? 'quick and concise'
            : 'standard and balanced';

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: `You are a professional book editor. Provide ${depthLabel} feedback in ${language} with a ${tone} tone. Focus on ${focusLabel} and emphasize ${targetMode}. Format the response with short bullet points under "Strengths", "Issues", and "Suggestions". Keep answers actionable and avoid rewriting the manuscript.`,
      messages: [
        {
          role: 'user',
          content: `Manuscript excerpt for review:\n${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Editor generation failed', error);
    return new Response('Failed to generate editor feedback', { status: 500 });
  }
}
