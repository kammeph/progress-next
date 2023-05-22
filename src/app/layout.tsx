import NavMenu from '@/components/nav-menu';
import './globals.css';
import { Anton, Actor } from 'next/font/google';
import Image from 'next/image';
import { cookies } from 'next/headers';

const actor = Actor({ weight: '400', subsets: ['latin'], variable: '--font-actor' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });

export const metadata = {
  title: 'PROGRESS',
  description: 'Strength trainings app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuthorized = cookies().has('userId');
  return (
    <html lang="en">
      <body className={`${anton.variable} ${actor.variable}`}>
        {isAuthorized ? (
          <header className="flex flex-row bg-black items-stretch">
            <NavMenu></NavMenu>
            <Image
              className="mx-auto w-auto h-auto"
              priority={true}
              width={120}
              height={100}
              src="/kk_logo.png"
              alt="Kilo für Kilo Logo"
            />
          </header>
        ) : null}
        {children}
      </body>
    </html>
  );
}
