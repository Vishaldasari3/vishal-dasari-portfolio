import { sql } from '@vercel/postgres';

if (!process.env.POSTGRES_URL && process.env.vd_portfolio_POSTGRES_URL) {
  process.env.POSTGRES_URL = process.env.vd_portfolio_POSTGRES_URL;
}

function unauthorized() {
  return Response.json({ error: 'unauthorized' }, { status: 401 });
}

export async function GET(request) {
  const url = new URL(request.url);
  if (url.searchParams.get('secret') !== process.env.ADMIN_SECRET) return unauthorized();
  const { rows } = await sql`
    SELECT id, slug, name, text, created_at FROM comments
    WHERE approved = false
    ORDER BY created_at ASC
  `;
  return Response.json(rows);
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  if (body.secret !== process.env.ADMIN_SECRET) return unauthorized();
  const { id, action } = body;
  if (action === 'approve') {
    await sql`UPDATE comments SET approved = true WHERE id = ${id}`;
  } else if (action === 'reject') {
    await sql`DELETE FROM comments WHERE id = ${id}`;
  } else {
    return Response.json({ error: 'invalid action' }, { status: 400 });
  }
  return Response.json({ ok: true });
}
