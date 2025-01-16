import "~/styles/globals.css";

import { type Metadata } from "next";
import { Abel, Anton } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { type LangParam } from "~/server/i18n";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LangParam;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${abel.variable} ${anton.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
