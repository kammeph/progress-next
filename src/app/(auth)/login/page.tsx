import bcrypt from 'bcrypt';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './login-form';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/drizzle';
import { cookies } from 'next/headers';

export default function LoginPage() {
  async function login(username: string, password: string) {
    'use server';
    if (!username || !password) throw new Error('Invalid username or password');

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
      with: {
        roles: true,
      },
    });

    if (!user) throw new Error('User not found');
    if (!password || !bcrypt.compareSync(password, user.password)) throw new Error('Invalid password');
    if (!user.canLogin) throw new Error('User has no permission to login');

    // @ts-ignore
    cookies().set({
      name: 'userId',
      value: user.id,
      httpOnly: true,
      secure: true,
      path: '/',
    });
    revalidatePath('/profile');
    redirect('/profile');
  }

  return (
    <div className='flex h-full justify-center items-center'>
      <div className='card max-w-sm m-5 w-full'>
        <Image
          className='mx-auto w-auto h-auto'
          priority={true}
          width={192}
          height={120}
          src='/kk_logo_black.png'
          alt='Kilo für Kilo Logo'
        />
        <LoginForm login={login} />
        <div className='flex gap-2 justify-center'>
          <span>You don&apos;t have an account?</span>
          <Link className='font-anton' href='/signup'>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
