'use client';

import { Exercise } from '@/lib/drizzle/schema/exercises';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRef, useTransition } from 'react';

export default function DeleteButton({
  id,
  name,
  deleteItem,
}: {
  id: string;
  name: string;
  deleteItem: (id: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [_, startTransition] = useTransition();

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>
        <TrashIcon className='text-red-500 w-6 mx-2' />
      </button>
      <dialog ref={dialogRef} className='card'>
        <h1 className='text-center mb-4'>
          <p>Are you sure you want to delete</p>
          <b>{name}</b>?
        </h1>
        <div className='flex justify-between'>
          <button className='btn' onClick={() => dialogRef.current?.close()}>
            Cancel
          </button>
          <button
            className='btn-warn'
            onClick={() => {
              startTransition(() => {
                deleteItem(id);
              });
              dialogRef.current?.close();
            }}
          >
            Delete
          </button>
        </div>
      </dialog>
    </>
  );
}
