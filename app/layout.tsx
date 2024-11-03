import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "MaginateAI",
  description: "Transform your imagination into art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={"bg-bodyColor text-white"}>
        <Navbar />
        <div className="md:max-w-screen-2xl mx-auto md:px-20 mb-20">
          {children}
          <Analytics />
        </div>
        <Footer />
      </body>
    </html>
  );
}
