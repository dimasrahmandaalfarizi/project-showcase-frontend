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
  title: "Dimas Rahmanda",
  description: "Fullstack & Backend Developer passionate about IoT and IT Solutions.",
  keywords: "Dimas, Rahmanda, Backend Developer, Fullstack Developer, IoT, Node.js, React Native, TypeScript, Portfolio, UPN Veteran Jawa Timur",
  authors: [{ name: "Dimas Rahmanda Al Farizi" }],
  creator: "Dimas Rahmanda Al Farizi",
  publisher: "Dimas Rahmanda Al Farizi",
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
    title: "Dimas Rahmanda",
    description: "Fullstack & Backend Developer passionate about IoT and IT Solutions.",
    url: "https://github.com/dimasrahmandaalfarizi",
    siteName: "Dimas Rahmanda",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dimas Rahmanda",
    description: "Fullstack & Backend Developer passionate about IoT and IT Solutions.",
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
