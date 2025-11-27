import 'server-only';

import type { PaginatedDocs } from 'payload';

const baseApiUrl = process.env.PAYLOAD_API_URL?.replace(/\/$/, '');
const apiKey = process.env.PAYLOAD_API_KEY;
const usersCollection = process.env.PAYLOAD_USERS_COLLECTION || 'users';
const stackIdField = process.env.PAYLOAD_USER_STACK_ID_FIELD || 'stackUserId';

type PayloadUserInput = {
  stackUserId: string;
  email?: string | null;
};

type PayloadClient = {
  baseApiUrl: string;
  usersCollection: string;
  stackIdField: string;
  headers: HeadersInit;
};

function createPayloadClient(): PayloadClient | null {
  if (!baseApiUrl || !apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'Payload client is not configured. Set PAYLOAD_API_URL and PAYLOAD_API_KEY to enable user sync.'
      );
    }

    return null;
  }

  return {
    baseApiUrl,
    usersCollection,
    stackIdField,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  };
}

const payloadClient = createPayloadClient();

async function findUserId(client: PayloadClient, stackUserId: string) {
  const searchUrl = new URL(`${client.baseApiUrl}/api/${client.usersCollection}`);
  searchUrl.searchParams.set(`where[${client.stackIdField}][equals]`, stackUserId);

  const response = await fetch(searchUrl.toString(), {
    headers: client.headers,
    cache: 'no-store',
  });

  if (!response.ok) return undefined;

  const existing = (await response.json()) as PaginatedDocs<unknown>;
  const document = Array.isArray(existing?.docs) ? existing.docs[0] : undefined;

  if (document && typeof document === 'object' && 'id' in document) {
    return document.id as string;
  }

  return undefined;
}

export async function ensurePayloadUser({ stackUserId, email }: PayloadUserInput) {
  if (!payloadClient) return;

  try {
    const existingId = await findUserId(payloadClient, stackUserId);

    const payloadBody: Record<string, string> = {
      [payloadClient.stackIdField]: stackUserId,
    };

    if (email) {
      payloadBody.email = email;
    }

    if (existingId) {
      await fetch(`${payloadClient.baseApiUrl}/api/${payloadClient.usersCollection}/${existingId}`, {
        method: 'PATCH',
        headers: payloadClient.headers,
        body: JSON.stringify(payloadBody),
      });
      return;
    }

    await fetch(`${payloadClient.baseApiUrl}/api/${payloadClient.usersCollection}`, {
      method: 'POST',
      headers: payloadClient.headers,
      body: JSON.stringify(payloadBody),
    });
  } catch (error) {
    console.error('Failed to sync Payload user', error);
  }
}
