import { db } from '@/lib/drizzle';
import ExerciseForm from '../exercise-form';
import { MuscleGroups, exercises, loadFactors } from '@/lib/drizzle/schema/exercises';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default async function ExerciseDetails({ params }: { params: { id: string } }) {
  const exercise = await db.query.exercises.findFirst({
    where: (exercises, { eq }) => eq(exercises.id, params.id),
    with: {
      loadFactors: true,
    },
  });

  async function submitExerciseAction(data: FormData) {
    'use server';
    const exerciseId = data.get('id') as string;
    const updateExercise = db
      .update(exercises)
      .set({
        name: data.get('name') as string,
        conversionFactor: data.get('conversionFactor')?.toString() || null,
      })
      .where(eq(exercises.id, exerciseId))
      .prepare();
    const updateLoadFactors = [];
    for (const muscleGroup of MuscleGroups) {
      updateLoadFactors.push(
        db
          .update(loadFactors)
          .set({ value: data.get(muscleGroup)?.toString() })
          .where(eq(loadFactors.id, data.get(`${muscleGroup}_ID`) as string))
      );
    }
    await Promise.all([updateExercise, ...updateLoadFactors]);
  }

  return (
    <>
      <div className='flex items-center m-4'>
        <Link href='/exercises'>
          <ArrowLeftIcon className='text-black w-6' />
        </Link>
        <h1 className='ml-4 text-xl font-anton'>Edit Exercise</h1>
      </div>
      {exercise ? (
        <ExerciseForm exercise={exercise} submitExerciseAction={submitExerciseAction} />
      ) : (
        <p>Exercise not found</p>
      )}
    </>
  );
}
