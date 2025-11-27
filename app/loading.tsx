import { i18n } from '../i18n-config';

export default function Loading() {
  // Use default locale for loading state to avoid Suspense issues
  const label = 'Loading...';

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-pulse text-zinc-500">{label}</div>
    </div>
  );
}

