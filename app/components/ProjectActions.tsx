'use client';

import { useState } from 'react';
import { generateTtsForProject } from '../actions';
import { Button } from '@/components/ui/button';
import { Loader2, Play } from 'lucide-react';

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
    <div className="flex gap-4">
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" /> Generate Audio
          </>
        )}
      </Button>
    </div>
  );
}
