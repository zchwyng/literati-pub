'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '../actions';
import { useUser } from '@stackframe/stack';
import mammoth from 'mammoth';
import { Input } from '@/components/ui/input';
import { Upload, Loader2 } from 'lucide-react';

export default function LandingUploader() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const user = useUser();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // If not logged in, redirect to sign up
    if (!user) {
      router.push('/handler/sign-up');
      return;
    }

    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const { value: rawText } = await mammoth.extractRawText({ arrayBuffer });
      const title = file.name.replace(/\.docx?$/, '');

      // Create project directly
      const projectId = await createProject(title, rawText);

      // Redirect to project page
      router.push(`/dashboard/project/${projectId}`);
    } catch (err) {
      console.error(err);
      alert('Failed to process file. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto group">
      <label
        className={`
        relative flex flex-col items-center justify-center w-full h-64 
        border-2 border-dashed rounded-xl cursor-pointer
        transition-all duration-200 ease-in-out
        ${
          isProcessing
            ? 'border-border bg-muted/50 opacity-50 cursor-not-allowed'
            : 'border-border hover:border-primary/50 hover:bg-primary/5 bg-background hover:shadow-sm hover:scale-[1.01]'
        }
      `}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          {isProcessing ? (
            <>
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-sm font-medium text-muted-foreground">
                Reading manuscript...
              </p>
            </>
          ) : (
            <>
              <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <p className="mb-2 text-xl font-semibold text-foreground">
                Upload Manuscript
              </p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Drop your{' '}
                <span className="font-medium text-foreground">.docx</span> file
                here to instantly start converting to Audio & Print.
              </p>
            </>
          )}
        </div>
        <Input
          type="file"
          accept=".docx"
          className="hidden"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </label>
    </div>
  );
}
