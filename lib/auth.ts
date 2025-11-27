import 'server-only';

import { stackServerApp } from '../stack';
import { ensurePayloadUser } from './payload';

export type StackUser = Awaited<ReturnType<typeof stackServerApp.getUser>>;

type EmailLike = { email?: string | null; address?: string | null };

function extractUserEmail(user: StackUser) {
  if (!user) return undefined;

  const userWithEmail = user as unknown as {
    email?: string | null;
    primaryEmail?: EmailLike;
    primaryEmailAddress?: string | null;
    emails?: EmailLike[];
  };

  return (
    userWithEmail.email ||
    userWithEmail.primaryEmail?.email ||
    userWithEmail.primaryEmail?.address ||
    userWithEmail.primaryEmailAddress ||
    userWithEmail.emails?.find((entry) => entry?.email || entry?.address)?.email ||
    userWithEmail.emails?.find((entry) => entry?.address)?.address ||
    undefined
  );
}

export async function getAuthenticatedUser() {
  const user = await stackServerApp.getUser();

  if (user) {
    await ensurePayloadUser({
      stackUserId: user.id,
      email: extractUserEmail(user),
    });
  }

  return user;
}
