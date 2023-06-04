'use server';

import { db } from '@/lib/drizzle';
import { exerciseGroups, exercises, loadFactors } from '@/lib/drizzle/schema/exercises';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deleteExercise(id: string) {
  await db.delete(exercises).where(eq(exercises.id, id));
  await db.delete(loadFactors).where(eq(loadFactors.exerciseId, id));
  revalidatePath('/exercises');
}

export async function updateExerciseGroup(id: string, name: string) {
  await db.update(exerciseGroups).set({ name }).where(eq(exerciseGroups.id, id));
  revalidatePath('/exercises');
}

export async function addExerciseGroup(name: string, index: number) {
  await db.insert(exerciseGroups).values({ name, index });
  revalidatePath('/');
}

export async function deleteExerciseGroup(id: string) {
  await db.delete(exerciseGroups).where(eq(exerciseGroups.id, id));
  revalidatePath('/exercises');
}
