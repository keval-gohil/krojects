import { Geist, Geist_Mono, Jost } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KROJECTS",
  description: "Projects by Keval Gohil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jost.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
