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

const SET_KEY = 'hidden_posts';

export async function GET() {
  try {
    const hidden = await redis.smembers(SET_KEY);
    return Response.json({ hidden: hidden || [] });
  } catch (err) {
    console.error('GET /api/posts-visibility error:', err);
    return Response.json({ hidden: [] });
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (body.secret !== process.env.ADMIN_SECRET) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }
    if (!body.slug) return Response.json({ error: 'missing slug' }, { status: 400 });
    if (body.hidden) {
      await redis.sadd(SET_KEY, body.slug);
    } else {
      await redis.srem(SET_KEY, body.slug);
    }
    const hidden = await redis.smembers(SET_KEY);
    return Response.json({ hidden: hidden || [] });
  } catch (err) {
    console.error('POST /api/posts-visibility error:', err);
    return Response.json({ error: String(err.message || err) }, { status: 500 });
  }
}
