'use client';

import { useState } from 'react';
import { generateTtsForProject } from '../actions';
import { Loader2 } from 'lucide-react';

export default function ProjectActions({ projectId }: { projectId: string }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateTtsForProject(projectId);
    } catch (error) {
      console.error(error);
      alert('Failed to generate audio');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-semibold hover:bg-white/30 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> Generating...
        </>
      ) : (
        'Generate Audio'
      )}
    </button>
  );
}
