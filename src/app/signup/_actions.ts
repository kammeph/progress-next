'use server';

import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db/db';
import { redirect } from 'next/navigation';

export async function signup(username: string, password: string) {
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
