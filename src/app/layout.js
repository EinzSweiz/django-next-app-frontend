import localFont from "next/font/local";
import { AuthProvider } from "@/components/authProvider";
import { ThemeProvider } from "@/components/themeProvider";
import "./globals.css";
import { cn } from "@/lib/utils";
import BaseLayout from "@/components/layout/BaseLayout";

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

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      > 
        <ThemeProvider         
        attribute="class"
        defaultTheme="system">
        <AuthProvider>
          <BaseLayout className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-muted/40">
          {children}
          </BaseLayout>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
