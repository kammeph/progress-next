'use client';

import {
  genderAdaptionFactors,
  heightAdaptionFactors,
  usaplClassification,
  weightAdaptionFactors,
} from '@/lib/utils/look-ups';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { VolumeCalculatorContext } from './volume-calculator-context';

type AdoptionFactorsState = {
  gender: 'MALE' | 'FEMALE';
  weight: number;
  height: number;
  strengthLevel: 'ELITE' | 'MASTER' | 'CLASS_1' | 'CLASS_2' | 'CLASS_3' | 'CLASS_4' | 'CLASS_5';
  genderFactor: number;
  weightFactor: number;
  heightFactor: number;
  strengthLevelFactor: number;
  experienceFactor: number;
  ageFactor: number;
  nutritionFactor: number;
  sleepFactor: number;
  stressFactor: number;
  regenerationFactor: number;
};

const SET_GENDER = 'set_gender';
const SET_WEIGHT = 'set_weight';
const SET_HEIGHT = 'set_height';
const SET_STRENGTH_LEVEL = 'set_strength_level';
const SET_EXPERIENCE = 'set_experience';
const SET_AGE = 'set_age';
const SET_NUTRITION = 'set_nutrition';
const SET_SLEEP = 'set_sleep';
const SET_STRESS = 'set_stress';
const SET_REGENERATION = 'set_regeneration';

type SetGenderAction = {
  type: typeof SET_GENDER;
  gender: 'MALE' | 'FEMALE';
};

type SetStrengthLevel = {
  type: typeof SET_STRENGTH_LEVEL;
  strengthLevel: 'ELITE' | 'MASTER' | 'CLASS_1' | 'CLASS_2' | 'CLASS_3' | 'CLASS_4' | 'CLASS_5';
  strengthLevelFactor: number;
};

function adoptionFactorsReducer(
  state: AdoptionFactorsState,
  action:
    | SetGenderAction
    | SetStrengthLevel
    | {
        type:
          | typeof SET_WEIGHT
          | typeof SET_HEIGHT
          | typeof SET_EXPERIENCE
          | typeof SET_AGE
          | typeof SET_NUTRITION
          | typeof SET_SLEEP
          | typeof SET_STRESS
          | typeof SET_REGENERATION;
        value: number;
      }
): AdoptionFactorsState {
  switch (action.type) {
    case SET_GENDER:
      return {
        ...state,
        gender: action.gender,
        genderFactor: genderAdaptionFactors[action.gender],
        weightFactor:
          weightAdaptionFactors[action.gender].find(
            (f) => (f.min === null || f.min <= state.weight) && (f.max === null || f.max > state.weight)
          )?.factor || 0,
        heightFactor:
          heightAdaptionFactors[action.gender].find(
            (f) => (f.min === null || f.min <= state.height) && (f.max === null || f.max > state.height)
          )?.factor || 0,
      };
    case SET_WEIGHT:
      return {
        ...state,
        weight: action.value,
        weightFactor:
          weightAdaptionFactors[state.gender].find(
            (f) => (f.min === null || f.min <= action.value) && (f.max === null || f.max > action.value)
          )?.factor || 0,
      };
    case SET_HEIGHT:
      return {
        ...state,
        height: action.value,
        heightFactor:
          heightAdaptionFactors[state.gender].find(
            (f) => (f.min === null || f.min <= action.value) && (f.max === null || f.max > action.value)
          )?.factor || 0,
      };
    case SET_STRENGTH_LEVEL:
      return {
        ...state,
        strengthLevel: action.strengthLevel,
        strengthLevelFactor: action.strengthLevelFactor,
      };
    case SET_EXPERIENCE:
      return { ...state, experienceFactor: action.value };
    case SET_AGE:
      return { ...state, ageFactor: action.value };
    case SET_NUTRITION:
      return { ...state, nutritionFactor: action.value };
    case SET_SLEEP:
      return { ...state, sleepFactor: action.value };
    case SET_STRESS:
      return { ...state, stressFactor: action.value };
    case SET_REGENERATION:
      return { ...state, regenerationFactor: action.value };
    default:
      return state;
  }
}

export default function AdoptionFactors() {
  const [state, dispatch] = useReducer(adoptionFactorsReducer, {
    gender: 'MALE',
    weight: 85,
    height: 183,
    strengthLevel: 'CLASS_5',
    genderFactor: 0,
    weightFactor: 2,
    heightFactor: -1,
    strengthLevelFactor: 0,
    experienceFactor: 1,
    ageFactor: 0,
    nutritionFactor: 0,
    sleepFactor: 0,
    stressFactor: 0,
    regenerationFactor: 0,
  });
  const totalFactor = useCallback(
    () =>
      state.genderFactor +
      state.weightFactor +
      state.heightFactor +
      state.experienceFactor +
      state.ageFactor +
      state.nutritionFactor +
      state.sleepFactor +
      state.stressFactor +
      state.regenerationFactor,
    [state]
  );
  const { total, setAdaptionFactor } = useContext(VolumeCalculatorContext);
  useEffect(() => {
    const usaplClass = usaplClassification[state.gender]?.find(
      (c) => (c.min === null || c.min <= state.weight) && (c.max === null || c.max > state.weight) && c.total <= total
    );
    if (usaplClass) {
      dispatch({
        type: SET_STRENGTH_LEVEL,
        strengthLevel: usaplClass.class as
          | 'ELITE'
          | 'MASTER'
          | 'CLASS_1'
          | 'CLASS_2'
          | 'CLASS_3'
          | 'CLASS_4'
          | 'CLASS_5',
        strengthLevelFactor: usaplClass.factor,
      });
    }
  }, [total, state.gender, state.weight]);

  useEffect(() => setAdaptionFactor(totalFactor()), [totalFactor, setAdaptionFactor]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <details
      className='flex flex-col p-2 gap-2 border-b border-b-slate-400'
      onToggle={() => setDetailsOpen((state) => !state)}
    >
      <summary className='flex list-none py-2 cursor-pointer'>
        <span className='font-anton flex-grow'>Adoption Factor: {totalFactor()}</span>
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
            onChange={(e) => dispatch({ type: SET_GENDER, gender: e.target.value as 'MALE' | 'FEMALE' })}
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
              type='tel'
              name='weight'
              placeholder='Weight'
              value={state.weight}
              onChange={(e) => dispatch({ type: SET_WEIGHT, value: Number(e.target.value) })}
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
              type='tel'
              name='height'
              placeholder='Height'
              value={state.height}
              onChange={(e) => dispatch({ type: SET_HEIGHT, value: Number(e.target.value) })}
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
            onChange={(e) => dispatch({ type: SET_EXPERIENCE, value: Number(e.target.value) })}
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
            onChange={(e) => dispatch({ type: SET_AGE, value: Number(e.target.value) })}
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
            onChange={(e) => dispatch({ type: SET_NUTRITION, value: Number(e.target.value) })}
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
            onChange={(e) => dispatch({ type: SET_SLEEP, value: Number(e.target.value) })}
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
            onChange={(e) => dispatch({ type: SET_STRESS, value: Number(e.target.value) })}
          >
            <option value={1}>Low</option>
            <option value={0}>Average</option>
            <option value={-3}>High</option>
          </select>
          <span className='px-4'>{state.stressFactor}</span>
        </div>
      </label>

      <label>
        Regeneration
        <div className='flex items-center'>
          <select
            className='input flex-grow'
            name='regeneration'
            placeholder='Regeneration'
            value={state.regenerationFactor}
            onChange={(e) => dispatch({ type: SET_REGENERATION, value: Number(e.target.value) })}
          >
            <option value={-2}>Bad</option>
            <option value={-1}>Below average</option>
            <option value={0}>Average</option>
            <option value={1}>Good</option>
            <option value={2}>Perfect</option>
          </select>
          <span className='px-4'>{state.regenerationFactor}</span>
        </div>
      </label>
    </details>
  );
}
