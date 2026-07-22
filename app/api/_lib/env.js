import { Redis } from '@upstash/redis';

function findEnv(suffix) {
  if (process.env[suffix]) return process.env[suffix];
  const key = Object.keys(process.env).find((k) => k.endsWith(suffix));
  return key ? process.env[key] : undefined;
}

// Vercel's Postgres/Redis integrations sometimes prefix env var names
// (e.g. "vd_portfolio_POSTGRES_URL") instead of the plain names the
// official SDKs expect. Patch process.env once so `@vercel/postgres`'s
// `sql` and Upstash's `Redis.fromEnv()`-style lookups both just work.
if (!process.env.POSTGRES_URL) {
  const url = findEnv('POSTGRES_URL');
  if (url) process.env.POSTGRES_URL = url;
}

export const redis = new Redis({
  url: findEnv('UPSTASH_REDIS_REST_URL') || findEnv('KV_REST_API_URL'),
  token: findEnv('UPSTASH_REDIS_REST_TOKEN') || findEnv('KV_REST_API_TOKEN'),
});
