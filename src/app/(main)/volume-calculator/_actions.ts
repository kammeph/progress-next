'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { AdaptionFactorsState } from './adaption-factors-reducer';
import { db } from '@/lib/drizzle';
import { adaptionFactorsSchema } from '@/lib/drizzle/schema/adaption-factors';
import { eq } from 'drizzle-orm';
import { StrengthValuesState } from './strength-values-reducer';
import { strengthValuesSchema } from '@/lib/drizzle/schema/strength-values';

export async function handleAdaptionFactorsUpdate(state: AdaptionFactorsState) {
  const userId = cookies().get('userId')?.value;
  if (!userId) return;
  if (!state.id) {
    await db
      .insert(adaptionFactorsSchema)
      .values({ userId, ...state })
      .onDuplicateKeyUpdate({ set: state });
  } else {
    await db.update(adaptionFactorsSchema).set(state).where(eq(adaptionFactorsSchema.id, state.id));
  }
  revalidatePath('/volume-calculator');
}

export async function handleStrengthValuesUpdate(state: StrengthValuesState) {
  const userId = cookies().get('userId')?.value;
  if (!userId) return;
  if (!state.id) {
    await db
      .insert(strengthValuesSchema)
      .values({ userId, ...state })
      .onDuplicateKeyUpdate({ set: state });
  } else {
    await db.update(strengthValuesSchema).set(state).where(eq(strengthValuesSchema.id, state.id));
  }
}
