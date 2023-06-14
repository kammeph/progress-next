'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import {
  AdaptionFactorsState,
  SET_AGE,
  SET_EXPERIENCE,
  SET_GENDER,
  SET_HEIGHT,
  SET_NUTRITION,
  SET_REGENERATION,
  SET_SLEEP,
  SET_STRENGTH_LEVEL,
  SET_STRESS,
  SET_WEIGHT,
  adaptionFactorsReducer,
  initialAdaptionFactorsState,
} from './adaption-factors-reducer';
import { AdaptionFactorsModel, Gender } from '@/lib/drizzle/schema/adaption-factors';
import { VolumeCalculatorContext } from './volume-calculator-context';

export default function AdaptionFactors({
  adaptionFactors,
  updateAdaptionFactors,
}: {
  adaptionFactors: AdaptionFactorsModel;
  updateAdaptionFactors: (adaptionFactorsState: AdaptionFactorsState) => void;
}) {
  const stateLoaded = useRef(false);
  const totalLoaded = useRef(false);

  const [state, dispatch] = useReducer(adaptionFactorsReducer, adaptionFactors ?? initialAdaptionFactorsState);
  const { total, setAdaptionFactor } = useContext(VolumeCalculatorContext);

  useEffect(() => {
    let timer = -1;
    if (totalLoaded.current) {
      timer = window.setTimeout(() => {
        dispatch({
          type: SET_STRENGTH_LEVEL,
          payload: {
            total,
          },
        });
      }, 1000);
    }

    totalLoaded.current = true;

    return () => window.clearTimeout(timer);
  }, [total]);

  useEffect(() => {
    let timer = -1;
    if (stateLoaded.current) {
      timer = window.setTimeout(() => {
        updateAdaptionFactors(state);
      }, 1000);
    }

    stateLoaded.current = true;

    return () => window.clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    setAdaptionFactor(state.adaptionFactor);
  }, [state.adaptionFactor]);

  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <details
      className='flex flex-col p-2 gap-2 border-b border-b-slate-400'
      onToggle={() => setDetailsOpen((state) => !state)}
    >
      <summary className='flex list-none py-2 cursor-pointer'>
        <span className='font-anton flex-grow'>Adaption Factor: {state.adaptionFactor}</span>
        {detailsOpen ? <ChevronUpIcon className='w-6' /> : <ChevronDownIcon className='w-6' />}
      </summary>
      <label>
        Gender
        <div className='flex items-center'>
          <select
            className='input flex-grow'
            name='gender'
            placeholder='Gender'
            value={state.gender}
            onChange={(e) => {
              dispatch({
                type: SET_GENDER,
                payload: {
                  gender: e.target.value as Gender,
                  total,
                },
              });
            }}
          >
            <option value={'MALE'}>Male</option>
            <option value={'FEMALE'}>Female</option>
          </select>
          <span className='px-4'>{state.genderFactor}</span>
        </div>
      </label>

      <label>
        Weight
        <div className='flex items-center'>
          <div className='flex input flex-grow'>
            <input
              className='flex-grow outline-none'
              type='number'
              name='weight'
              placeholder='Weight'
              inputMode='numeric'
              value={Number(state.weight).toString()}
              onChange={(e) => {
                dispatch({ type: SET_WEIGHT, payload: { weight: e.target.value, total } });
              }}
            />
            <span>kg</span>
          </div>
          <span className='px-4'>{state.weightFactor}</span>
        </div>
      </label>

      <label>
        Height
        <div className='flex items-center'>
          <div className='flex input flex-grow'>
            <input
              className='flex-grow outline-none'
              type='number'
              name='height'
              placeholder='Height'
              inputMode='numeric'
              value={Number(state.height).toString()}
              onChange={(e) => dispatch({ type: SET_HEIGHT, payload: e.target.value })}
            />
            <span>cm</span>
          </div>
          <span className='px-4'>{state.heightFactor}</span>
        </div>
      </label>

      <label>
        Strength Level
        <div className='flex items-center'>
          <select
            className='input flex-grow pointer-events-none readonly-select'
            name='experience'
            placeholder='Experience'
            value={state.strengthLevel}
            onChange={() => {}}
          >
            <option value={'ELITE'}>Elite</option>
            <option value={'MASTER'}>Master</option>
            <option value={'CLASS_1'}>Class 1</option>
            <option value={'CLASS_2'}>Class 2</option>
            <option value={'CLASS_3'}>Class 3</option>
            <option value={'CLASS_4'}>Class 4</option>
            <option value={'CLASS_5'}>Class 5</option>
          </select>
          <span className='px-4'>{state.strengthLevelFactor}</span>
        </div>
      </label>

      <label>
        Experience
        <div className='flex items-center'>
          <select
            className='input flex-grow'
            name='experience'
            placeholder='Experience'
            value={state.experienceFactor}
            onChange={(e) => dispatch({ type: SET_EXPERIENCE, payload: Number(e.target.value) })}
          >
            <option value={1}>Beginner</option>
            <option value={0}>Intermediate</option>
            <option value={-1}>Advanced</option>
            <option value={-3}>Expert</option>
          </select>
          <span className='px-4'>{state.experienceFactor}</span>
        </div>
      </label>

      <label>
        Age
        <div className='flex items-center'>
          <select
            className='input flex-grow'
            name='age'
            placeholder='Age'
            value={state.ageFactor}
            onChange={(e) => dispatch({ type: SET_AGE, payload: Number(e.target.value) })}
          >
            <option value={2}>10er</option>
            <option value={1}>20er</option>
            <option value={0}>30er</option>
            <option value={-2}>40er</option>
            <option value={-4}>50er</option>
          </select>
          <span className='px-4'>{state.ageFactor}</span>
        </div>
      </label>

      <label>
        Nutrition
        <div className='flex items-center'>
          <select
            className='input flex-grow'
            name='nutrition'
            placeholder='Nutrition'
            value={state.nutritionFactor}
            onChange={(e) => dispatch({ type: SET_NUTRITION, payload: Number(e.target.value) })}
          >
            <option value={-3}>Bad</option>
            <option value={0}>Average</option>
            <option value={1}>Good</option>
          </select>
          <span className='px-4'>{state.nutritionFactor}</span>
        </div>
      </label>

      <label>
        Sleep
        <div className='flex items-center'>
          <select
            className='input flex-grow'
            name='sleep'
            placeholder='Sleep'
            value={state.sleepFactor}
            onChange={(e) => dispatch({ type: SET_SLEEP, payload: Number(e.target.value) })}
          >
            <option value={-3}>Bad</option>
            <option value={0}>Average</option>
            <option value={1}>Good</option>
          </select>
          <span className='px-4'>{state.sleepFactor}</span>
        </div>
      </label>

      <label>
        Stress
        <div className='flex items-center'>
          <select
            className='input flex-grow'
            name='stress'
            placeholder='stress'
            value={state.stressFactor}
            onChange={(e) => dispatch({ type: SET_STRESS, payload: Number(e.target.value) })}
          >
            <option value={1}>Low</option>
            <option value={0}>Average</option>
            <option value={-3}>High</option>
          </select>
          <span className='px-4'>{state.stressFactor}</span>
        </div>
      </label>

      <label>
        Recovery
        <div className='flex items-center'>
          <select
            className='input flex-grow'
            name='regeneration'
            placeholder='Regeneration'
            value={state.recoveryFactor}
            onChange={(e) => dispatch({ type: SET_REGENERATION, payload: Number(e.target.value) })}
          >
            <option value={-2}>Bad</option>
            <option value={-1}>Below average</option>
            <option value={0}>Average</option>
            <option value={1}>Good</option>
            <option value={2}>Perfect</option>
          </select>
          <span className='px-4'>{state.recoveryFactor}</span>
        </div>
      </label>
    </details>
  );
}
