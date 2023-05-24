import './globals.css';
import { Anton, Actor } from 'next/font/google';

const actor = Actor({ weight: '400', subsets: ['latin'], variable: '--font-actor' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });

export const metadata = {
  title: 'PROGRESS',
  description: 'Strength trainings app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${actor.variable}`}>{children}</body>
    </html>
  );
}
