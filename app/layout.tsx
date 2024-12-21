import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContextProvider from "@/context/Context";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "Mammothzy",
  description: "Nextjs sass application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <Toaster />
        <ContextProvider>
          {children}
        </ContextProvider>
        <Footer />
      </body>
    </html>
  );
}
