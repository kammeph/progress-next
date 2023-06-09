'use client';

import { useContext, useState } from 'react';
import { VolumeCalculatorContext } from './volume-calculator-context';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { volumeGuidelines } from '@/lib/utils/look-ups';

const cycleTypes = ['HYPERTROPHY', 'STRENGTH', 'PEAKING'] as const;
const mainLifts = ['SQUAT', 'BENCH', 'DEADLIFT'] as const;

export default function VolumeRecommendations() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { adaptionFactor } = useContext(VolumeCalculatorContext);
  return (
    <details
      className='flex flex-col p-2 gap-2 border-b border-b-slate-400'
      onToggle={() => setDetailsOpen((state) => !state)}
    >
      <summary className='flex list-none py-2 cursor-pointer'>
        <span className='font-anton flex-grow'>Volume Recommendations</span>
        {detailsOpen ? <ChevronUpIcon className='w-6' /> : <ChevronDownIcon className='w-6' />}
      </summary>
      {cycleTypes.map((cycleType) => (
        <div
          key={cycleType}
          className='grid grid-cols-9 grid-rows-5 m-2 justify-center content-center border-2 border-solid border-black'
        >
          <p className='col-span-9 text-center bg-red-600 border border-solid border-white text-white'>
            Volume recommendations for {cycleType}
          </p>
          <p className='col-span-2 bg-black text-white border border-solid border-white text-center'>Exercise</p>
          <p className='col-span-2 bg-black text-white border border-solid border-white text-center'>MEV</p>
          <p className='bg-black text-white border border-solid border-white'></p>
          <p className='col-span-2 bg-black text-white border border-solid border-white text-center'>MRV</p>
          <p className='col-span-2 bg-black text-white border border-solid border-white text-center'>Median</p>
          {mainLifts.map((mainLift) => (
            <>
              <p className='col-span-2 bg-blue-100 border border-solid border-white text-center'>{mainLift}</p>
              <p className='col-span-2 text-center'>{volumeGuidelines[cycleType][mainLift].mev + adaptionFactor}</p>
              <p className='text-center'>-</p>
              <p className='col-span-2 text-center'>{volumeGuidelines[cycleType][mainLift].mrv + adaptionFactor}</p>
              <p className='col-span-2 bg-red-600 border border-solid border-white text-center text-white'>
                {(volumeGuidelines[cycleType][mainLift].mev +
                  adaptionFactor +
                  volumeGuidelines[cycleType][mainLift].mrv +
                  adaptionFactor) /
                  2}
              </p>
            </>
          ))}
        </div>
      ))}
    </details>
  );
}
