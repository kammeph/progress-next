import "~/styles/globals.css";

import { type Metadata } from "next";
import { Abel, Anton } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const abel = Abel({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-abel",
  display: "swap",
});

console.log(abel.className, anton.className);

export const metadata: Metadata = {
  title: "PROGRESS",
  description: "Application for planning and tracking strength training",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${abel.variable} ${anton.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
