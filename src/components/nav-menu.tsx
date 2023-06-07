'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useTransition } from 'react';

export default function NavMenu({ logout }: { logout: () => Promise<void> }) {
  const [_, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen((open) => !open);
  }

  function handleLogout() {
    startTransition(() => logout());
  }

  useEffect(() => {
    const onClick = (event: Event) => {
      if (!menuRef.current?.contains(event.target as Node) && open) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [menuRef, open]);

  return (
    <div ref={menuRef}>
      <button className='bg-black text-white p-4 group h-full' onClick={handleOpen}>
        <span
          className={`block h-1 w-8 rad relative rounded-3xl bg-white 
          before:block before:h-1 before:rounded-3xl before:bg-white before:bottom-2 before:absolute 
          before:translate-y-0 before:transition before:duration-300 before:ease-in-out 
           ${
             open
               ? `before:translate-x-3 before:rotate-45 before:w-3/4`
               : 'before:translate-x-0 before:rotate-0 before:w-full'
           }
          after:block after:h-1 after:rounded-3xl after:bg-white after:top-2 after:absolute 
          after:translate-y-0 after:transition after:duration-300 after:ease-in-out 
           ${
             open
               ? `after:translate-x-3 after:-rotate-45 after:w-3/4`
               : 'after:translate-x-0 after:rotate-0 after:w-full'
           }`}
        ></span>
      </button>
      <nav
        className={`absolute p-4 gap-2 text-xl flex flex-col font-anton uppercase w-full text-white bg-black transition-transform origin-right duration-300 ease-in-out scale-y-100 right-0 ${
          open ? 'scale-x-100' : 'scale-x-0'
        }`}
        onClick={handleOpen}
      >
        <Link href='/volume-calculator'>Volume Calculator</Link>
        <Link href='/exercises'>Exercises</Link>
        <Link href='/profile'>Profile</Link>
        <span className='cursor-pointer' onClick={handleLogout}>
          Logout
        </span>
      </nav>
    </div>
  );
}
