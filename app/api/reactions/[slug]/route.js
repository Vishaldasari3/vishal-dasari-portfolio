import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const TYPES = ['insightful', 'relatable', 'mindblown'];

function counts(data) {
  const out = {};
  TYPES.forEach((t) => { out[t] = Number((data && data[t]) || 0); });
  return out;
}

export async function GET(request, { params }) {
  const key = `reactions:${params.slug}`;
  const data = await redis.hgetall(key);
  return Response.json(counts(data));
}

export async function POST(request, { params }) {
  const body = await request.json().catch(() => ({}));
  if (!TYPES.includes(body.type)) {
    return Response.json({ error: 'invalid type' }, { status: 400 });
  }
  const key = `reactions:${params.slug}`;
  await redis.hincrby(key, body.type, 1);
  const data = await redis.hgetall(key);
  return Response.json(counts(data));
}
