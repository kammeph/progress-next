'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import {
  SET_BENCH_REPS,
  SET_BENCH_WEIGHT,
  SET_DEADLIFT_REPS,
  SET_DEADLIFT_WEIGHT,
  SET_OVERHEAD_PRESS_REPS,
  SET_OVERHEAD_PRESS_WEIGHT,
  SET_ROUNDING_FACTOR,
  SET_SAFETY_FACTOR,
  SET_SQUAT_REPS,
  SET_SQUAT_WEIGHT,
  StrengthValuesState,
  initialStrengthValuesState,
  strengthValuesReducer,
} from './strength-values-reducer';
import { VolumeCalculatorContext } from './volume-calculator-context';
import { StrengthValuesModel } from '@/lib/drizzle/schema/strength-values';

export default function StrengthValues({
  strengthValues,
  updateStrengthValues,
}: {
  strengthValues: StrengthValuesModel;
  updateStrengthValues: (strengthValuesState: StrengthValuesState) => void;
}) {
  const stateLoaded = useRef(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [state, dispatch] = useReducer(strengthValuesReducer, strengthValues ?? initialStrengthValuesState);
  const { setTotal } = useContext(VolumeCalculatorContext);

  useEffect(() => {
    let timer = -1;
    if (stateLoaded.current) {
      timer = window.setTimeout(() => {
        updateStrengthValues(state);
      }, 1000);
    }

    stateLoaded.current = true;

    return () => window.clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    setTotal(Number(state.total));
  }, [state.total]);

  return (
    <details
      className='flex flex-col p-2 gap-2 border-b border-b-slate-400'
      onToggle={() => setDetailsOpen((state) => !state)}
    >
      <summary className='flex list-none py-2 cursor-pointer'>
        <span className='font-anton flex-grow'>Total: {Number(state.total).toFixed(1)}</span>
        {detailsOpen ? <ChevronUpIcon className='w-6' /> : <ChevronDownIcon className='w-6' />}
      </summary>
      <label className='mb-2'>
        <span>1RM Squat:{Number(state.squat1RM).toFixed(1)}</span>
        <div className='grid grid-cols-2 gap-2'>
          <input
            type='number'
            inputMode='numeric'
            name='squatWeight'
            value={Number(state.squatWeight).toString()}
            onChange={(e) => dispatch({ type: SET_SQUAT_WEIGHT, payload: e.target.value })}
            className='input'
          />
          <input
            type='number'
            inputMode='numeric'
            name='squatReps'
            value={Number(state.squatReps).toString()}
            onChange={(e) => dispatch({ type: SET_SQUAT_REPS, payload: e.target.value })}
            className='input'
          />
        </div>
      </label>
      <label className='mb-2'>
        <span>1RM Bench: {Number(state.bench1RM).toFixed(1)}</span>
        <div className='grid grid-cols-2 gap-2'>
          <input
            type='number'
            inputMode='numeric'
            name='benchWeight'
            value={Number(state.benchWeight).toString()}
            onChange={(e) => dispatch({ type: SET_BENCH_WEIGHT, payload: e.target.value })}
            className='input'
          />
          <input
            type='number'
            inputMode='numeric'
            name='benchReps'
            value={Number(state.benchReps).toString()}
            onChange={(e) => dispatch({ type: SET_BENCH_REPS, payload: e.target.value })}
            className='input'
          />
        </div>
      </label>
      <label className='mb-2'>
        <span>1RM Deadlift: {Number(state.deadlift1RM).toFixed(1)}</span>
        <div className='grid grid-cols-2 gap-2'>
          <input
            type='number'
            inputMode='numeric'
            name='deadliftWeight'
            value={Number(state.deadliftWeight).toString()}
            onChange={(e) => dispatch({ type: SET_DEADLIFT_WEIGHT, payload: e.target.value })}
            className='input'
          />
          <input
            type='number'
            inputMode='numeric'
            name='deadliftReps'
            value={Number(state.deadliftReps).toString()}
            onChange={(e) => dispatch({ type: SET_DEADLIFT_REPS, payload: e.target.value })}
            className='input'
          />
        </div>
      </label>
      <label className='mb-2'>
        <span>1Rm Overhead Press: {Number(state.overheadPress1RM).toFixed(1)}</span>
        <div className='grid grid-cols-2 gap-2'>
          <input
            type='number'
            inputMode='numeric'
            name='overheadPressWeight'
            value={Number(state.overheadPressWeight).toString()}
            onChange={(e) => dispatch({ type: SET_OVERHEAD_PRESS_WEIGHT, payload: e.target.value })}
            className='input'
          />
          <input
            type='number'
            inputMode='numeric'
            name='overheadPressReps'
            value={Number(state.overheadPressReps).toString()}
            onChange={(e) => dispatch({ type: SET_OVERHEAD_PRESS_REPS, payload: e.target.value })}
            className='input'
          />
        </div>
      </label>
      <div className='grid grid-cols-2 gap-2'>
        <label className='flex flex-col'>
          Safety Factor
          <select
            className='input'
            value={state.safetyFactor}
            onChange={(e) => dispatch({ type: SET_SAFETY_FACTOR, payload: e.target.value })}
          >
            <option value={100}>100%</option>
            <option value={97.5}>97.5%</option>
            <option value={95}>95%</option>
            <option value={92.5}>92.5%</option>
            <option value={90}>90%</option>
          </select>
        </label>
        <label className='flex flex-col'>
          Rounding Factor
          <select
            className='input'
            value={state.roundingFactor}
            onChange={(e) => dispatch({ type: SET_ROUNDING_FACTOR, payload: e.target.value })}
          >
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
