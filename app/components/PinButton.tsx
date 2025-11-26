'use client';

import { useState } from 'react';
import { Pin, PinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { togglePinProject } from '../actions';
import { useRouter } from 'next/navigation';

interface PinButtonProps {
  projectId: string;
  isPinned: boolean;
}

export function PinButton({ projectId, isPinned }: PinButtonProps) {
  const [pinned, setPinned] = useState(isPinned);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      const newPinnedStatus = await togglePinProject(projectId);
      setPinned(newPinnedStatus);
      router.refresh();
    } catch (error) {
      console.error('Failed to toggle pin', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-7 w-7 absolute top-2 right-2 z-20 ${
        pinned
          ? 'text-amber-500 hover:text-amber-600 bg-white/20 hover:bg-white/30'
          : 'text-white/70 hover:text-white/90 bg-white/10 hover:bg-white/20'
      } backdrop-blur-sm`}
      onClick={handleToggle}
      disabled={isLoading}
      title={pinned ? 'Unpin project' : 'Pin project'}
    >
      {pinned ? (
        <Pin className="h-4 w-4 fill-current" />
      ) : (
        <PinOff className="h-4 w-4" />
      )}
    </Button>
  );
}

