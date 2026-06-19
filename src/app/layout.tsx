import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ToastProvider } from "@/components/feedback/ToastProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "KostMeal AI",
  description: "Meal planner hemat dan sehat untuk anak kos Indonesia.",
  icons: {
    icon: "/assets/logo-mark.svg",
    shortcut: "/assets/logo-mark.svg",
    apple: "/assets/logo-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className={`${geist.variable} antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
