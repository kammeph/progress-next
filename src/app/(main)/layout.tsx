import NavMenu from '@/components/nav-menu';
import Image from 'next/image';
import { logout } from './_actions';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='flex flex-row bg-black items-stretch p-2'>
        <NavMenu logout={logout} />
        <Image
          className='mx-auto w-auto h-auto'
          priority={true}
          width={140}
          height={100}
          sizes='(max-width: 768px) 80px, (min-width: 769px) 140px'
          src='/kk_logo.png'
          alt='Kilo für Kilo Logo'
        />
      </header>
      <main>{children}</main>
    </>
  );
}
