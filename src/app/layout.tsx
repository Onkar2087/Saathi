import type { Metadata, Viewport } from "next";
import { AppStateProvider } from "@/components/AppState";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saathi — practice phone apps safely",
  description: "A patient AI companion that helps older adults practice everyday apps where nothing can go wrong.",
  appleWebApp: { capable: true, title: "Saathi", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#15803d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-amber-50">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
