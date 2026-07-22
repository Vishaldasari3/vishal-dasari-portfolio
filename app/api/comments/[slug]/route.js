import { sql } from '@vercel/postgres';

export async function GET(request, { params }) {
  try {
    const { rows } = await sql`
      SELECT id, name, text, created_at FROM comments
      WHERE slug = ${params.slug} AND approved = true
      ORDER BY created_at ASC
    `;
    return Response.json(rows);
  } catch (err) {
    console.error('GET /api/comments error:', err);
    return Response.json({ error: String(err.message || err) }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const body = await request.json().catch(() => ({}));
    // honeypot: bots fill this hidden field, humans never see it
    if (body.hp) return Response.json({ ok: true });

    const name = (body.name || '').toString().trim().slice(0, 60);
    const text = (body.text || '').toString().trim().slice(0, 1000);
    if (!name || !text) {
      return Response.json({ error: 'missing fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO comments (slug, name, text, approved, created_at)
      VALUES (${params.slug}, ${name}, ${text}, false, now())
    `;
    return Response.json({ ok: true, pending: true });
  } catch (err) {
    console.error('POST /api/comments error:', err);
    return Response.json({ error: String(err.message || err) }, { status: 500 });
  }
}
