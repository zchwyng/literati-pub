# Caching in Literati Pub

We use Next.js Cache Components (available in Next.js 16) to improve performance by caching data fetching and expensive computations.

## How to use Cache Components

### 1. Enable in Configuration

Ensure `cacheComponents` is enabled in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
  },
  // ...
};
```

### 2. Use the `use cache` Directive

You can cache functions, components, or entire files using the `'use cache'` directive.

#### Function Level (Recommended for Actions)

```typescript
async function getCachedData(userId: string) {
  'use cache'
  cacheTag('my-data-' + userId) // Tag for invalidation
  cacheLife('hours') // Optional: set lifetime
  
  return await db.query(...)
}
```

#### Component Level

```typescript
async function MyComponent({ userId }: { userId: string }) {
  'use cache'
  // ... content is cached based on props
}
```

### 3. Invalidating Cache

Use `revalidateTag` or `expireTag` (depending on API version) to invalidate cached data when it changes.

```typescript
import { revalidateTag } from 'next/cache'

export async function updateData() {
  await db.update(...)
  revalidateTag('my-data-' + userId)
}
```

## Best Practices

1.  **Pass Dynamic Data as Arguments**: Do not call `cookies()`, `headers()`, or `searchParams` inside a cached function. Pass the necessary values (like `userId`) as arguments.
2.  **Use Tags**: Always tag your cached data so you can invalidate it precisely.
3.  **User-Specific Data**: Include `userId` in the cache tag and as an argument to ensure data is cached per-user.
4.  **Cache Granularity**: Cache at the data fetching level (in `actions.ts`) rather than the page level for better control and reuse.

## Example: Project Caching

In `app/actions.ts`, we separate the user retrieval (dynamic) from the data fetching (cacheable).

```typescript
// Cached internal function
async function getProjectInternal(projectId: string, userId: string) {
  'use cache'
  cacheTag(`project-${projectId}`)
  // ... db query
}

// Public action
export async function getProject(id: string) {
  const user = await stackServerApp.getUser();
  if (!user) return null;
  return getProjectInternal(id, user.id);
}
```

