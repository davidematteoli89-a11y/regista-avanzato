import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regista Avanzato",
  description: "Piattaforma calcistica editoriale e statistica.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
