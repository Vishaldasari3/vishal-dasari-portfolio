export const metadata = {
  title: 'Vishal Dasari Portfolio',
};

// This layout only wraps app-router pages. Every real route in this project
// is served as a static HTML file via the rewrites in next.config.js (see
// README.md), so this file intentionally stays minimal — it exists only to
// satisfy Next.js's app-router requirement for a root layout.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
