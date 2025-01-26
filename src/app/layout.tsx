import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/ToggleBtn";
import { Toaster } from "@/components/ui/toaster";
import Cursor from "@/components/cursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "3legant.",
  description: "Listen to the amazing music sound.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable}  ${poppins.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={[
            "light",
            "dark",
            "solarized-theme",
            "vibrant-theme",
            "spotify-theme",
          ]}
        >
          <Cursor />
          {children}
          <Toaster />
          <div className="fixed bottom-8 right-8 z-20">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
