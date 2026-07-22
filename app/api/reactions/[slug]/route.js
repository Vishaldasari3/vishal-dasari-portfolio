import { Redis } from '@upstash/redis';

function findEnv(suffix) {
  if (process.env[suffix]) return process.env[suffix];
  const key = Object.keys(process.env).find((k) => k.endsWith(suffix));
  return key ? process.env[key] : undefined;
}

const redis = new Redis({
  url: findEnv('UPSTASH_REDIS_REST_URL') || findEnv('KV_REST_API_URL'),
  token: findEnv('UPSTASH_REDIS_REST_TOKEN') || findEnv('KV_REST_API_TOKEN'),
});
const TYPES = ['insightful', 'relatable', 'mindblown', 'inspiring'];

function counts(data) {
  const out = {};
  TYPES.forEach((t) => { out[t] = Number((data && data[t]) || 0); });
  return out;
}

export async function GET(request, { params }) {
  try {
    const key = `reactions:${params.slug}`;
    const data = await redis.hgetall(key);
    return Response.json(counts(data));
  } catch (err) {
    console.error('GET /api/reactions error:', err);
    return Response.json({ error: String(err.message || err) }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const body = await request.json().catch(() => ({}));
    if (!TYPES.includes(body.type)) {
      return Response.json({ error: 'invalid type' }, { status: 400 });
    }
    const key = `reactions:${params.slug}`;
    await redis.hincrby(key, body.type, 1);
    const data = await redis.hgetall(key);
    return Response.json(counts(data));
  } catch (err) {
    console.error('POST /api/reactions error:', err);
    return Response.json({ error: String(err.message || err) }, { status: 500 });
  }
}
