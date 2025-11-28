'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { RadioAudioContextProvider } from "./contexts/AudioContext";
import { PersistentPlayer } from "./players/persistent-player";
import SideNav from "./ui/dashboard/sidenav";
import clsx from "clsx";
import "./styles/globals.scss"

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
      <title>SDPP Radio</title>
      <body>
        <div className={clsx("container")}>
          <RadioAudioContextProvider testInt={1}>
            <SideNav></SideNav>
          {children}
            <PersistentPlayer></PersistentPlayer>
          </RadioAudioContextProvider>
        </div>
      </body>
    </html>
  );
}
