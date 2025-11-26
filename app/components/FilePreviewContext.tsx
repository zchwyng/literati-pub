'use client';

import * as React from 'react';

type FilePreview = {
  type: 'pdf' | 'audio' | 'cover' | 'manuscript';
  url: string;
  name: string;
  format?: string;
  projectTitle?: string;
} | null;

type FilePreviewContextProps = {
  preview: FilePreview;
  setPreview: (preview: FilePreview) => void;
};

const FilePreviewContext = React.createContext<FilePreviewContextProps | null>(null);

export function FilePreviewProvider({ children }: { children: React.ReactNode }) {
  const [preview, setPreview] = React.useState<FilePreview>(null);

  return (
    <FilePreviewContext.Provider value={{ preview, setPreview }}>
      {children}
    </FilePreviewContext.Provider>
  );
}

export function useFilePreview() {
  const context = React.useContext(FilePreviewContext);
  if (!context) {
    throw new Error('useFilePreview must be used within a FilePreviewProvider');
  }
  return context;
}

