import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";

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
      <body className={"bg-bodyColor text-white"}>
        <Navbar></Navbar>
        <div className="md:max-w-screen-2xl mx-auto md:px-20">{children}</div>
      </body>
    </html>
  );
}
