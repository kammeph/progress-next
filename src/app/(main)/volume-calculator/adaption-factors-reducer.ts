import { Gender, StrengthLevel } from '@/lib/drizzle/schema/adaption-factors';
import {
  calculateHeightAdaptionFactor,
  calculateWeightAdaptionFactor,
  genderAdaptionFactors,
  getUsaplClassification,
} from '@/lib/utils/look-ups';

export type AdaptionFactorsState = {
  id?: number;
  userId?: string;
  gender: Gender;
  weight: string;
  height: string;
  strengthLevel: StrengthLevel;
  genderFactor: number;
  weightFactor: number;
  heightFactor: number;
  strengthLevelFactor: number;
  experienceFactor: number;
  ageFactor: number;
  nutritionFactor: number;
  sleepFactor: number;
  stressFactor: number;
  recoveryFactor: number;
  adaptionFactor: number;
};

export const initialAdaptionFactorsState: AdaptionFactorsState = {
  gender: 'MALE',
  weight: '85',
  height: '183',
  strengthLevel: 'CLASS_2',
  genderFactor: 0,
  weightFactor: 2,
  heightFactor: -1,
  strengthLevelFactor: 0,
  experienceFactor: 1,
  ageFactor: 0,
  nutritionFactor: 0,
  sleepFactor: 0,
  stressFactor: 0,
  recoveryFactor: 0,
  adaptionFactor: 2,
};

export const SET_GENDER = 'set_gender';
export const SET_WEIGHT = 'set_weight';
export const SET_HEIGHT = 'set_height';
export const SET_STRENGTH_LEVEL = 'set_strength_level';
export const SET_EXPERIENCE = 'set_experience';
export const SET_AGE = 'set_age';
export const SET_NUTRITION = 'set_nutrition';
export const SET_SLEEP = 'set_sleep';
export const SET_STRESS = 'set_stress';
export const SET_REGENERATION = 'set_regeneration';

type SetGenderAction = {
  type: typeof SET_GENDER;
  payload: {
    gender: Gender;
    total: number;
  };
};

type SetStrengthLevel = {
  type: typeof SET_STRENGTH_LEVEL;
  payload: {
    total: number;
  };
};

type SetWeightAction = {
  type: typeof SET_WEIGHT;
  payload: {
    weight: string;
    total: number;
  };
};

type SetHeightAction = {
  type: typeof SET_HEIGHT;
  payload: string;
};

export type AdaptionFactorsAction =
  | SetGenderAction
  | SetStrengthLevel
  | SetWeightAction
  | SetHeightAction
  | {
      type:
        | typeof SET_EXPERIENCE
        | typeof SET_AGE
        | typeof SET_NUTRITION
        | typeof SET_SLEEP
        | typeof SET_STRESS
        | typeof SET_REGENERATION;
      payload: number;
    };

function calculateAdaptionFactor(state: AdaptionFactorsState) {
  return (
    state.genderFactor +
    state.weightFactor +
    state.heightFactor +
    state.strengthLevelFactor +
    state.experienceFactor +
    state.ageFactor +
    state.nutritionFactor +
    state.sleepFactor +
    state.stressFactor +
    state.recoveryFactor
  );
}

export function adaptionFactorsReducer(
  state: AdaptionFactorsState,
  action: AdaptionFactorsAction
): AdaptionFactorsState {
  switch (action.type) {
    case SET_GENDER: {
      const weight = Number(state.weight);
      const height = Number(state.height);
      const usaplClass = getUsaplClassification(action.payload.gender, weight, action.payload.total);
      const update = {
        ...state,
        gender: action.payload.gender,
        genderFactor: genderAdaptionFactors[action.payload.gender],
        weightFactor: calculateWeightAdaptionFactor(weight, action.payload.gender),
        heightFactor: calculateHeightAdaptionFactor(height, action.payload.gender),
        strengthLevel: usaplClass?.class ?? 'CLASS_2',
        strengthLevelFactor: usaplClass?.factor || 0,
      };
      const adaptionFactor = calculateAdaptionFactor(update);
      return {
        ...update,
        adaptionFactor,
      };
    }
    case SET_WEIGHT: {
      const weight = Number(action.payload.weight);
      const usaplClass = getUsaplClassification(state.gender, weight, action.payload.total);
      const update = {
        ...state,
        weight: action.payload.weight,
        weightFactor: calculateWeightAdaptionFactor(weight, state.gender),
        strengthLevel: usaplClass?.class ?? 'CLASS_2',
        strengthLevelFactor: usaplClass?.factor || 0,
      };
      const adaptionFactor = calculateAdaptionFactor(update);
      return { ...update, adaptionFactor };
    }
    case SET_HEIGHT: {
      const height = Number(action.payload);
      const update = {
        ...state,
        height: action.payload,
        heightFactor: calculateHeightAdaptionFactor(height, state.gender),
      };
      const adaptionFactor = calculateAdaptionFactor(update);
      return { ...update, adaptionFactor };
    }
    case SET_STRENGTH_LEVEL: {
      const usaplClass = getUsaplClassification(state.gender, Number(state.weight), action.payload.total);
      if (!usaplClass) return state;
      if (usaplClass.class === state.strengthLevel) return state;
      const update = {
        ...state,
        strengthLevel: usaplClass.class,
        strengthLevelFactor: usaplClass.factor,
      };
      const adaptionFactor = calculateAdaptionFactor(update);
      return {
        ...update,
        adaptionFactor,
      };
    }
    case SET_EXPERIENCE: {
      const update = { ...state, experienceFactor: action.payload };
      const adaptionFactor = calculateAdaptionFactor(update);
      return { ...update, adaptionFactor };
    }
    case SET_AGE: {
      const update = { ...state, ageFactor: action.payload };
      const adaptionFactor = calculateAdaptionFactor(update);
      return { ...update, adaptionFactor };
    }
    case SET_NUTRITION: {
      const update = { ...state, nutritionFactor: action.payload };
      const adaptionFactor = calculateAdaptionFactor(update);
      return { ...update, adaptionFactor };
    }
    case SET_SLEEP: {
      const update = { ...state, sleepFactor: action.payload };
      const adaptionFactor = calculateAdaptionFactor(update);
      return { ...update, adaptionFactor };
    }
    case SET_STRESS: {
      const update = { ...state, stressFactor: action.payload };
      const adaptionFactor = calculateAdaptionFactor(update);
      return { ...update, adaptionFactor };
    }
    case SET_REGENERATION: {
      const update = { ...state, recoveryFactor: action.payload };
      const adaptionFactor = calculateAdaptionFactor(update);
      return { ...update, adaptionFactor };
    }
    default:
      return state;
  }
}
