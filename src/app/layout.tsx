import type { Metadata } from "next";
import localFont from "next/font/local";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Code Highlights",
  description: "A stunning showcase of my work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${
          geistSans.variable
        } ${geistMono.variable} antialiased transition-colors duration-300 bg-white text-black dark:bg-[#0c0c0c] dark:text-white`}
      >
        {/* Theme Toggle Button */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        {/* Main content */}
        {children}
      </body>
    </html>
  );
}
