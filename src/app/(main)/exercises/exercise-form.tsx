'use client';

import { Exercise, LoadFactor } from '@/lib/drizzle/schema/exercises';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ExerciseForm({
  exercise,
  submitExerciseAction,
}: {
  exercise: Exercise;
  submitExerciseAction: (data: FormData) => any;
}) {
  const router = useRouter();
  return (
    <form
      className='flex flex-col p-2 gap-3'
      action={(data) => {
        submitExerciseAction(data);
        router.refresh();
        router.push('/exercises');
      }}
    >
      <input type='hidden' name='id' value={exercise?.id} />
      <input type='hidden' name='exerciseGroupId' value={exercise?.exerciseGroupId} />
      <input className='input' name='name' type='text' placeholder='Name' defaultValue={exercise?.name} />
      <div className='flex justify-between input'>
        <input
          className='w-full'
          name='conversionFactor'
          type='number'
          placeholder='Conversion factor'
          min={0}
          max={100}
          defaultValue={exercise.conversionFactor ? Number(exercise.conversionFactor) : undefined}
        />
        <span>%</span>
      </div>
      {exercise?.loadFactors
        ? exercise.loadFactors.map((loadFactor) => (
            <LoadFactorInput key={loadFactor.muscleGroup} loadFactor={loadFactor} />
          ))
        : null}
      <button type='submit' className='btn'>
        Save
      </button>
    </form>
  );
}

function LoadFactorInput({ loadFactor }: { loadFactor: LoadFactor }) {
  const [value, setValue] = useState(loadFactor.value);
  return (
    <label className='flex flex-col items-start'>
      <p>{`${loadFactor.muscleGroup} (${value})`}</p>
      <input type='hidden' name={`${loadFactor.muscleGroup}_ID`} value={loadFactor.id} />
      <input
        className='w-full accent-black'
        type='range'
        name={loadFactor.muscleGroup}
        max={1}
        min={0}
        step={0.1}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </label>
  );
}
