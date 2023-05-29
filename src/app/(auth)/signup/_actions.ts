'use server';

import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function signup(username: string, password: string) {
  if (!username || !password) throw new Error('Invalid username or password');
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  await prisma.user.create({
    data: {
      username,
      password: hash
    }
  });
  redirect('/login');
}
