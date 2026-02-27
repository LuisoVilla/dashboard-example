import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wealthup",
  description: "Wealthup dashboard demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {\n  try {\n    const key = 'wealthup:theme';\n    const stored = localStorage.getItem(key);\n    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;\n    const theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');\n    if (theme === 'dark') document.documentElement.classList.add('dark');\n    else document.documentElement.classList.remove('dark');\n  } catch {}\n})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
