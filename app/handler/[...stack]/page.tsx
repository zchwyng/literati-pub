import { stackServerApp } from '../../../stack';
import { StackHandler } from '@stackframe/stack';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Handler(props: any) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      {/* Logo/Brand */}
      <div className="mb-8 flex items-center gap-2">
        <div className="h-8 w-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
          <BookOpen className="h-4 w-4" />
        </div>
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          Literati Publishing
        </Link>
      </div>
      
      {/* Auth Form Container */}
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
          <StackHandler app={stackServerApp} {...props} />
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
