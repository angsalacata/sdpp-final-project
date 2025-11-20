'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AudioContext } from "./contexts/AudioContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
console.log("LOOK")
console.log(AudioContext)
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
        <AudioContext.Provider value={{isPlaying: true}}>
        {children}
        </AudioContext.Provider>
      </body>
    </html>
  );
}
