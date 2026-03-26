// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "@/src/style/globals.css";
// import { Header } from '@/src/components/header/header'
// Fonts

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

const nunito = Nunito({
   subsets: ["latin"],
   weight: ["400", "600", "700"],
});

// Metadata
export const metadata: Metadata = {
   metadataBase: new URL('http://localhost:3000'), 
   title: "QueueFlow+",
   description: "A queue management system built with Next.js and TypeScript.",
   icons: {
      icon: "/QueueFlow+.png",
      shortcut: "/favicon.ico",
   },
openGraph: {
      title: "QueueFlow+",
      description: "A queue management system built with Next.js and TypeScript.",
      images: ["/QueueFlow+.png"],
   },
};

import Header from "@/src/components/header/oooo"
export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" className="nunito_17b64af0-module__sFn_YG__className h-full">
         <body className="h-full">
            <Header />
            {children}
         </body>
      </html>
   );
}


