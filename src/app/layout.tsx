import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import PHProvider from "@/components/posthog/PHProvider";
import PostHogPageView from "@/components/posthog/PostHogPageView";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BMO SaaS Starter",
  description: "A SaaS starter by Brian Morrison II (@brianmmdev)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <PHProvider>
          <body className={inter.className}>
            <PostHogPageView />
            <Navbar />
            <div className="flex justify-center md:mx-0 m-2">
              <div className="flex flex-col w-full max-w-[960px] px-2">
                {children}
              </div>
            </div>
          </body>
          <Toaster />
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
