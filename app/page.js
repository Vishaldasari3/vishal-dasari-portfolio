// Not normally reached — the rewrite in next.config.js sends "/" straight to
// public/home.html before Next.js routing gets here. This exists only so the
// app router has at least one page to satisfy the build.
export default function Page() {
  return null;
}
