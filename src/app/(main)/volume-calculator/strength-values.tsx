'use client';

import { calculate1RM } from '@/lib/utils/look-ups';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useCallback, useContext, useEffect, useState } from 'react';
import { VolumeCalculatorContext } from './volume-calculator-context';

export default function StrengthValues() {
  const [squatWeight, setSquatWeight] = useState(200);
  const [squatReps, setSquatReps] = useState(1);
  const [benchWeight, setBenchWeight] = useState(150);
  const [benchReps, setBenchReps] = useState(1);
  const [deadliftWeight, setDeadliftWeight] = useState(250);
  const [deadliftReps, setDeadliftReps] = useState(1);
  const [overheadPressWeight, setOverheadPressWeight] = useState(80);
  const [overheadPressReps, setOverheadPressReps] = useState(1);
  const [safetyFactor, setSafetyFactor] = useState(100);
  const [roundingFactor, setRoundingFactor] = useState(2.5);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const squat1RM = useCallback(() => calculate1RM(squatWeight, squatReps), [squatWeight, squatReps]);
  const squat1RMSafety = useCallback(() => squat1RM() * (safetyFactor / 100), [squat1RM, safetyFactor]);
  const bench1RM = useCallback(() => calculate1RM(benchWeight, benchReps), [benchWeight, benchReps]);
  const bench1RMSafety = useCallback(() => bench1RM() * (safetyFactor / 100), [bench1RM, safetyFactor]);
  const deadlift1RM = useCallback(() => calculate1RM(deadliftWeight, deadliftReps), [deadliftWeight, deadliftReps]);
  const deadlift1RMSafety = useCallback(() => deadlift1RM() * (safetyFactor / 100), [deadlift1RM, safetyFactor]);
  const overheadPress1RM = useCallback(
    () => calculate1RM(overheadPressWeight, overheadPressReps),
    [overheadPressWeight, overheadPressReps]
  );
  const overheadPress1RMSafety = useCallback(
    () => overheadPress1RM() * (safetyFactor / 100),
    [overheadPress1RM, safetyFactor]
  );
  const total = useCallback(
    () => squat1RM() + bench1RM() + deadlift1RM() + overheadPress1RM(),
    [squat1RM, bench1RM, deadlift1RM, overheadPress1RM]
  );
  const totalSafety = useCallback(
    () =>
      Math.round(
        (squat1RMSafety() + bench1RMSafety() + deadlift1RMSafety() + overheadPress1RMSafety()) / roundingFactor
      ) * roundingFactor,
    [squat1RMSafety, bench1RMSafety, deadlift1RMSafety, overheadPress1RMSafety, roundingFactor]
  );
  const { setTotal } = useContext(VolumeCalculatorContext);

  useEffect(() => setTotal(totalSafety()), [setTotal, totalSafety]);

  return (
    <details
      className='flex flex-col p-2 gap-2 border-b border-b-slate-400'
      onToggle={() => setDetailsOpen((state) => !state)}
    >
      <summary className='flex list-none py-2 cursor-pointer'>
        <span className='font-anton flex-grow'>
          Total: est {total().toFixed(1)} | safety {totalSafety().toFixed(1)}
        </span>
        {detailsOpen ? <ChevronUpIcon className='w-6' /> : <ChevronDownIcon className='w-6' />}
      </summary>
      <label className='mb-2'>
        <span>
          1RM Squat: est {squat1RM().toFixed(1)} | safety {squat1RMSafety().toFixed(1)}
        </span>
        <div className='grid grid-cols-2 gap-2'>
          <input
            type='tel'
            name='squatWeight'
            value={squatWeight}
            onChange={(e) => setSquatWeight(Number(e.target.value))}
            className='input'
          />
          <input
            type='tel'
            name='squatReps'
            value={squatReps}
            onChange={(e) => setSquatReps(Number(e.target.value))}
            className='input'
          />
        </div>
      </label>
      <label className='mb-2'>
        <span>
          1RM Bench: est {bench1RM().toFixed(1)} | safety {bench1RMSafety().toFixed(1)}
        </span>
        <div className='grid grid-cols-2 gap-2'>
          <input
            type='tel'
            name='benchWeight'
            value={benchWeight}
            onChange={(e) => setBenchWeight(Number(e.target.value))}
            className='input'
          />
          <input
            type='tel'
            name='benchReps'
            value={benchReps}
            onChange={(e) => setBenchReps(Number(e.target.value))}
            className='input'
          />
        </div>
      </label>
      <label className='mb-2'>
        <span>
          1RM Deadlift: est {deadlift1RM().toFixed(1)} | safety {deadlift1RMSafety().toFixed(1)}
        </span>
        <div className='grid grid-cols-2 gap-2'>
          <input
            type='tel'
            name='deadliftWeight'
            value={deadliftWeight}
            onChange={(e) => setDeadliftWeight(Number(e.target.value))}
            className='input'
          />
          <input
            type='tel'
            name='deadliftReps'
            value={deadliftReps}
            onChange={(e) => setDeadliftReps(Number(e.target.value))}
            className='input'
          />
        </div>
      </label>
      <label className='mb-2'>
        <span>
          1Rm Overhead Press: est {overheadPress1RM().toFixed(1)} | safety {overheadPress1RMSafety().toFixed(1)}
        </span>
        <div className='grid grid-cols-2 gap-2'>
          <input
            type='tel'
            name='overheadPressWeight'
            value={overheadPressWeight}
            onChange={(e) => setOverheadPressWeight(Number(e.target.value))}
            className='input'
          />
          <input
            type='tel'
            name='overheadPressReps'
            value={overheadPressReps}
            onChange={(e) => setOverheadPressReps(Number(e.target.value))}
            className='input'
          />
        </div>
      </label>
      <div className='grid grid-cols-2 gap-2'>
        <label className='flex flex-col'>
          Safety Factor
          <select className='input' value={safetyFactor} onChange={(e) => setSafetyFactor(Number(e.target.value))}>
            <option value={100}>100%</option>
            <option value={97.5}>97.5%</option>
            <option value={95}>95%</option>
            <option value={92.5}>92.5%</option>
            <option value={90}>90%</option>
          </select>
        </label>
        <label className='flex flex-col'>
          Rounding Factor
          <select className='input' value={roundingFactor} onChange={(e) => setRoundingFactor(Number(e.target.value))}>
            <option value={1}>1kg</option>
            <option value={1.25}>1.25kg</option>
            <option value={1.5}>1.5kg</option>
            <option value={2}>2kg</option>
            <option value={2.5}>2.5kg</option>
            <option value={3}>3kg</option>
            <option value={3.5}>3.5kg</option>
            <option value={4}>4kg</option>
            <option value={5}>5kg</option>
          </select>
        </label>
      </div>
    </details>
  );
}
