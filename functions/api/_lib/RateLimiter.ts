/// <reference types="@cloudflare/workers-types" />

export const RATE_LIMIT = {
  maxRequests: 5,
  windowSeconds: 600,
} as const;

export async function checkRateLimit(
  kv: KVNamespace,
  ip: string
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `rl:${ip}`;
  const nowMs = Date.now();
  const windowMs = RATE_LIMIT.windowSeconds * 1000;

  let count = 0;
  let expiresAt = nowMs + windowMs;

  try {
    const stored = await kv.get(key);
    if (stored !== null) {
      const sep = stored.lastIndexOf(':');
      const storedCount = parseInt(stored.slice(0, sep), 10);
      const storedExpiry = parseInt(stored.slice(sep + 1), 10);
      if (nowMs < storedExpiry) {
        count = storedCount;
        expiresAt = storedExpiry;
      }
    }
  } catch {
    return { allowed: true, remaining: RATE_LIMIT.maxRequests };
  }

  if (count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  const ttlSeconds = Math.max(1, Math.ceil((expiresAt - nowMs) / 1000));
  try {
    await kv.put(key, `${count + 1}:${expiresAt}`, { expirationTtl: ttlSeconds });
  } catch {
    // Non-fatal — still allow the request
  }

  return { allowed: true, remaining: RATE_LIMIT.maxRequests - count - 1 };
}
