'use client'; // Indicamos que este componente usa funcionalidades del lado del cliente (ej. onClick)


import type { Metadata } from "next";
import { Geist, Geist_Mono, Sunflower } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import ProjectNavbar from "@/components/ProjectNavBar";




// Configuración de la fuente
const sunflower = Sunflower({
  variable: '--font-sunflower',  // Variable CSS opcional para usar en Tailwind,
  subsets: ['latin'],
  weight:['300','500','700']
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isProjectDetail = pathname.startsWith('/projects/') && pathname.split('/').length === 3;

  return (
    <html lang="en">
      <body
        className={sunflower.variable}>
          {!isProjectDetail && <Navbar />}
          <main>{children}</main>
      </body>
    </html>
  );
}
