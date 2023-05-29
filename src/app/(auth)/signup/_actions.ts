'use server';

import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { db } from '@/lib/drizzle';
import { users } from '@/lib/drizzle/schema/users';

export async function signup(username: string, password: string) {
  if (!username || !password) throw new Error('Invalid username or password');
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  await db.insert(users).values({ username, password: hash });
  redirect('/login');
}
