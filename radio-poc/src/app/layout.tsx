'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RadioAudioContextProvider } from "./contexts/AudioContext";
import { PersistentPlayer } from "./players/persistent-player";
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RadioAudioContextProvider testInt={1}>

          <PersistentPlayer></PersistentPlayer>
        {children}
        </RadioAudioContextProvider>
      </body>
    </html>
  );
}
