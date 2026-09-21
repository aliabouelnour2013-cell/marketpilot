import "./globals.css";

export const metadata = {
  title: "MarketPilot",
  description: "AI-assisted market research and paper trading dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}