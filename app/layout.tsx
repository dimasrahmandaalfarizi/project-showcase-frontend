import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Priyoga Listyo Ananda - Portfolio",
  description: "Fullstack & Backend Developer, IT Solution enthusiast from UPN Veteran Jawa Timur.",
  keywords: "Priyoga, Nanda, Fullstack Developer, Backend Developer, React Developer, Next.js, TypeScript, Portfolio, UPN Veteran Jawa Timur",
  authors: [{ name: "Priyoga Listyo Ananda" }],
  creator: "Priyoga Listyo Ananda",
  publisher: "Priyoga Listyo Ananda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Priyoga Listyo Ananda - Portfolio",
    description: "Fullstack Developer & IT Solution enthusiast from UPN Veteran Jawa Timur.",
    url: "https://nanda-psi.vercel.app",
    siteName: "Priyoga's Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyoga Listyo Ananda - Portfolio",
    description: "Fullstack Developer & IT Solution enthusiast from UPN Veteran Jawa Timur.",
  },
  verification: {},
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
