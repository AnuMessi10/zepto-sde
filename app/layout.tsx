import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Zepto - Anurag&apos;s SDE Task</title>
      <body>{children}</body>
    </html>
  );
}
