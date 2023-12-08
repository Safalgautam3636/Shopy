import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkClientProvider } from "@/components/providers/clerk-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopy",
  description: "Your destination for second hand goods",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="shopy-theme">
            <AuthProvider>
              <Navbar />
              <div className="mt-24">{children}</div>
            </AuthProvider>
          </ThemeProvider>
        </ClerkClientProvider>
      </body>
    </html>
  );
}
