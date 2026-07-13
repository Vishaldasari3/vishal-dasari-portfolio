import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Serves the pre-built static page from /public as a full HTML document.
// This project ships each page as complete, self-contained HTML (styles,
// scripts, and images already inlined) rather than as React components —
// see README.md for why, and for how to convert a page to real JSX if you
// want to edit it as idiomatic React/Next.js.
export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'experience.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
