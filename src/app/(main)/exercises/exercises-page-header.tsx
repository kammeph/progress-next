'use client';

import { useState } from 'react';
import ExerciseGroupForm from './exercise-group';
import { addExerciseGroup } from './_actions';

export default function ExercisesPageHeader({ maxIndex }: { maxIndex: number }) {
  const [showAddInput, setShowAddInput] = useState(false);
  return (
    <div className='w-full'>
      <div className='flex w-full justifiy-between items-center'>
        <h1 className='m-4 text-xl font-anton flex-grow'>Exercises</h1>
        {showAddInput ? (
          <>
            <button onClick={() => setShowAddInput(false)} className='btn mr-4'>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setShowAddInput(true)} className='btn mr-4'>
            Add new group
          </button>
        )}
      </div>
      {showAddInput ? (
        <div className='p-2'>
          <ExerciseGroupForm submit={async (groupName) => await addExerciseGroup(groupName, maxIndex + 1)} />
        </div>
      ) : null}
    </div>
  );
}
