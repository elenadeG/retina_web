import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "Retina · GAME TV",
  description:
    "Reconstrucción para portfolio de Retina, la plataforma que programa el contenido de las pantallas en tienda. Diseño y front-end de Elena de Gregorio.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        {/*
          DM Sans desde Google Fonts. Alternativa: next/font/google, que descarga
          la fuente en el build y la autoaloja (sin petición a terceros y sin salto
          de maquetación). Requiere red durante el build.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
