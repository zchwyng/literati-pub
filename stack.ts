import 'server-only';
import { StackServerApp } from '@stackframe/stack';

// Get and clean the project ID
const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID?.trim().replace(/^['"]|['"]$/g, '');

if (!projectId) {
  throw new Error(
    'NEXT_PUBLIC_STACK_PROJECT_ID is required. Please set it in your environment variables.'
  );
}

export const stackServerApp = new StackServerApp({
  projectId,
  tokenStore: 'nextjs-cookie',
  urls: {
    signIn: '/handler/sign-in',
    signUp: '/handler/sign-up',
    afterSignIn: '/dashboard',
    afterSignUp: '/dashboard',
  },
});
