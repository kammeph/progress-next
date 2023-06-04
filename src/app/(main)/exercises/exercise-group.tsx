'use client';

import DeleteButton from '@/components/delete-button';
import { ExerciseGroup } from '@/lib/drizzle/schema/exercises';
import { CheckIcon, ChevronRightIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';
import { deleteExercise, deleteExerciseGroup, updateExerciseGroup } from './_actions';

export function ExerciseGroup({ group }: { group: ExerciseGroup }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <div className='flex justify-stretch items-center p-2 gap-2 border-b border-b-slate-400'>
          <ExerciseGroupForm
            initialName={group.name}
            submit={async (groupName) => {
              if (groupName !== group.name) await updateExerciseGroup(group.id, groupName);
              setEditMode(false);
            }}
          />
          {!group.exercises?.length && group?.id ? (
            <DeleteButton id={group.id} name={group.name} deleteItem={(id) => deleteExerciseGroup(id)} />
          ) : null}
        </div>
      ) : (
        <details key={group.id} className='border-b border-b-slate-400 p-2'>
          <summary className='flex items-center font-anton list-none cursor-pointer py-2'>
            <p className='flex-grow'>{group.name}</p>
            <Link className='mx-2' href={`/exercises/add/${group.id}`}>
              <PlusIcon className='text-black w-6' />
            </Link>
            <button>
              <PencilIcon className='text-black w-6 mx-2' onClick={() => setEditMode(true)} />
            </button>
          </summary>
          <ul>
            {group.exercises?.map((exercise) => (
              <li key={exercise.id} className='flex items-center border-b border-b-slate-400 last:border-b-0 py-2'>
                <Link className='flex flex-grow justify-between items-center mr-2' href={`/exercises/${exercise.id}`}>
                  <p>{exercise.name}</p>
                  <ChevronRightIcon className='text-black w-6' />
                </Link>
                <DeleteButton id={exercise.id} name={exercise.name} deleteItem={deleteExercise} />
              </li>
            ))}
          </ul>
        </details>
      )}
    </>
  );
}

export default function ExerciseGroupForm({
  initialName,
  submit,
}: {
  initialName?: string;
  submit: (groupName: string) => void;
}) {
  const [groupName, setGroupName] = useState(initialName || '');
  return (
    <form className='flex items-center w-full'>
      <input
        autoFocus
        className='input w-full flex-grow'
        placeholder='Group name'
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button
        className='text-black w-6 ml-4 disabled:text-stone-300'
        disabled={!groupName}
        onClick={() => submit(groupName)}
      >
        <CheckIcon />
      </button>
    </form>
  );
}
