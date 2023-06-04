import { Exercise, MuscleGroups, exercises, loadFactors } from '@/lib/drizzle/schema/exercises';
import ExerciseForm from '../../exercise-form';
import { db } from '@/lib/drizzle';
import { v4 as uuid } from 'uuid';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { eq, sql } from 'drizzle-orm';

export default function AddExercise({ params }: { params: { groupId: string } }) {
  const newExericseId = uuid();
  const newExercise: Exercise = {
    id: newExericseId,
    exerciseGroupId: params.groupId,
    name: '',
    index: 0,
    loadFactors: MuscleGroups.map((muscleGroup) => {
      return {
        exerciseId: newExericseId,
        muscleGroup: muscleGroup,
        value: '0.0',
      };
    }),
  };

  async function addExerciseAction(data: FormData) {
    'use server';
    const exerciseGroupId = data.get('exerciseGroupId') as string;
    if (!exerciseGroupId) throw new Error('No exercise group id provided');

    await db.transaction(async (tx) => {
      const result = await tx
        .select({ maxIndex: sql<number>`max(${exercises.index})` })
        .from(exercises)
        .where(eq(exercises.exerciseGroupId, exerciseGroupId));

      const exerciseId = data.get('id') as string;
      await tx.insert(exercises).values({
        id: exerciseId,
        name: data.get('name') as string,
        index: (result[0].maxIndex ?? 0) + 1,
        conversionFactor: data.get('conversionFactor')?.toString() || undefined,
        exerciseGroupId: exerciseGroupId,
      });

      await tx.insert(loadFactors).values(
        MuscleGroups.map((muscleGroup) => ({
          exerciseId,
          muscleGroup,
          value: data.get(muscleGroup)?.toString() ?? '0.0',
        }))
      );
    });
  }

  return (
    <>
      <div className='flex items-center m-4'>
        <Link href='/exercises'>
          <ArrowLeftIcon className='text-black w-6' />
        </Link>
        <h1 className='ml-4 text-xl font-anton'>Add Exercise</h1>
      </div>
      <ExerciseForm exercise={newExercise} submitExerciseAction={addExerciseAction} />
    </>
  );
}
