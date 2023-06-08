import bcrypt from 'bcrypt';
import Image from 'next/image';
import Link from 'next/link';
import SignupForm from './signup-form';
import { redirect } from 'next/navigation';
import { db } from '@/lib/drizzle';
import { users } from '@/lib/drizzle/schema/users';

export default function SignupPage() {
  async function signup(username: string, password: string) {
    'use server';
    if (!username || !password) throw new Error('Invalid username or password');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await db.insert(users).values({ username, password: hash });
    redirect('/login');
  }

  return (
    <div className='flex h-full justify-center items-center'>
      <div className='card max-w-sm m-5 w-full'>
        {/* <Image
          className='mx-auto w-auto h-auto'
          priority={true}
          width={192}
          height={120}
          src='/kk_logo_black.png'
          alt='Kilo für Kilo Logo'
        /> */}
        <h1 className='text-center font-anton text-3xl mb-8'>Sign Up</h1>
        <SignupForm signup={signup} />
        <div className='flex gap-2 justify-center'>
          <span>Already have an account?</span>
          <Link className='font-anton' href='/login'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
