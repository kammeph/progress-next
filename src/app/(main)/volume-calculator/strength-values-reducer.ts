import { calculate1RM } from '@/lib/utils/look-ups';
import { useReducer } from 'react';

export type StrengthValuesState = {
  id?: number;
  userId?: string;
  squatWeight: string;
  squatReps: number;
  squat1RM: string;
  benchWeight: string;
  benchReps: number;
  bench1RM: string;
  deadliftWeight: string;
  deadliftReps: number;
  deadlift1RM: string;
  overheadPressWeight: string;
  overheadPressReps: number;
  overheadPress1RM: string;
  total: string;
  safetyFactor: string;
  roundingFactor: string;
};

export const initialStrengthValuesState: StrengthValuesState = {
  squatWeight: '200',
  squatReps: 1,
  squat1RM: '200',
  benchWeight: '150',
  benchReps: 1,
  bench1RM: '150',
  deadliftWeight: '250',
  deadliftReps: 1,
  deadlift1RM: '250',
  overheadPressWeight: '80',
  overheadPressReps: 1,
  overheadPress1RM: '80',
  total: '600',
  safetyFactor: '100',
  roundingFactor: '2.5',
};

export const SET_SQUAT_WEIGHT = 'set_squat_weight';
export const SET_SQUAT_REPS = 'set_squat_reps';
export const SET_BENCH_WEIGHT = 'set_bench_weight';
export const SET_BENCH_REPS = 'set_bench_reps';
export const SET_DEADLIFT_WEIGHT = 'set_deadlift_weight';
export const SET_DEADLIFT_REPS = 'set_deadlift_reps';
export const SET_OVERHEAD_PRESS_WEIGHT = 'set_overhead_press_weight';
export const SET_OVERHEAD_PRESS_REPS = 'set_overhead_press_reps';
export const SET_SAFETY_FACTOR = 'set_safety_factor';
export const SET_ROUNDING_FACTOR = 'set_rounding_factor';

export type StrengthValuesAction = {
  type:
    | typeof SET_SQUAT_WEIGHT
    | typeof SET_SQUAT_REPS
    | typeof SET_BENCH_WEIGHT
    | typeof SET_BENCH_REPS
    | typeof SET_DEADLIFT_WEIGHT
    | typeof SET_DEADLIFT_REPS
    | typeof SET_OVERHEAD_PRESS_WEIGHT
    | typeof SET_OVERHEAD_PRESS_REPS
    | typeof SET_SAFETY_FACTOR
    | typeof SET_ROUNDING_FACTOR;
  payload: string;
};

export function strengthValuesReducer(state: StrengthValuesState, action: StrengthValuesAction): StrengthValuesState {
  switch (action.type) {
    case SET_SQUAT_WEIGHT: {
      const weight = Number(action.payload);
      const reps = state.squatReps;
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(state.roundingFactor);
      const squat1RMEstimated = calculate1RM(weight, reps);
      const squat1RM = Math.round((squat1RMEstimated * safetyFactor) / 100 / roundingFactor) * roundingFactor;
      const total = squat1RM + Number(state.bench1RM) + Number(state.deadlift1RM);
      return {
        ...state,
        squatWeight: weight.toString(),
        squat1RM: squat1RM.toString(),
        total: total.toString(),
      };
    }
    case SET_SQUAT_REPS: {
      const weight = Number(state.squatWeight);
      const reps = parseInt(action.payload || '0');
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(state.roundingFactor);
      const squat1RMEstimated = calculate1RM(weight, reps);
      const squat1RM = Math.round((squat1RMEstimated * safetyFactor) / 100 / roundingFactor) * roundingFactor;
      const total = squat1RM + Number(state.bench1RM) + Number(state.deadlift1RM);
      return {
        ...state,
        squatReps: reps,
        squat1RM: squat1RM.toString(),
        total: total.toString(),
      };
    }
    case SET_BENCH_WEIGHT: {
      const weight = Number(action.payload);
      const reps = state.benchReps;
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(state.roundingFactor);
      const bench1RMEstimated = calculate1RM(weight, reps);
      const bench1RM = Math.round((bench1RMEstimated * safetyFactor) / 100 / roundingFactor) * roundingFactor;
      const total = Number(state.squat1RM) + bench1RM + Number(state.deadlift1RM);
      return {
        ...state,
        benchWeight: weight.toString(),
        bench1RM: bench1RM.toString(),
        total: total.toString(),
      };
    }
    case SET_BENCH_REPS: {
      const weight = Number(state.benchWeight);
      const reps = parseInt(action.payload || '0');
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(state.roundingFactor);
      const bench1RMEstimated = calculate1RM(weight, reps);
      const bench1RM = Math.round((bench1RMEstimated * safetyFactor) / 100 / roundingFactor) * roundingFactor;
      const total = Number(state.squat1RM) + bench1RM + Number(state.deadlift1RM);
      return {
        ...state,
        benchReps: reps,
        bench1RM: bench1RM.toString(),
        total: total.toString(),
      };
    }
    case SET_DEADLIFT_WEIGHT: {
      const weight = Number(action.payload);
      const reps = state.deadliftReps;
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(state.roundingFactor);
      const deadlift1RMEstimated = calculate1RM(weight, reps);
      const deadlift1RM = Math.round((deadlift1RMEstimated * safetyFactor) / 100 / roundingFactor) * roundingFactor;
      const total = Number(state.squat1RM) + Number(state.bench1RM) + deadlift1RM;
      return {
        ...state,
        deadliftWeight: weight.toString(),
        deadlift1RM: deadlift1RM.toString(),
        total: total.toString(),
      };
    }
    case SET_DEADLIFT_REPS: {
      const weight = Number(state.deadliftWeight);
      const reps = parseInt(action.payload || '0');
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(state.roundingFactor);
      const deadlift1RMEstimated = calculate1RM(weight, reps);
      const deadlift1RM = Math.round((deadlift1RMEstimated * safetyFactor) / 100 / roundingFactor) * roundingFactor;
      const total = Number(state.squat1RM) + Number(state.bench1RM) + deadlift1RM;
      return {
        ...state,
        deadliftReps: reps,
        deadlift1RM: deadlift1RM.toString(),
        total: total.toString(),
      };
    }
    case SET_OVERHEAD_PRESS_WEIGHT: {
      const weight = Number(action.payload);
      const reps = state.overheadPressReps;
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(state.roundingFactor);
      const overheadPress1RMEstimated = calculate1RM(weight, reps);
      const overheadPress1RM =
        Math.round((overheadPress1RMEstimated * safetyFactor) / 100 / roundingFactor) * roundingFactor;
      return {
        ...state,
        overheadPressWeight: weight.toString(),
        overheadPress1RM: overheadPress1RM.toString(),
      };
    }
    case SET_OVERHEAD_PRESS_REPS: {
      const weight = Number(state.overheadPressWeight);
      const reps = parseInt(action.payload || '0');
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(state.roundingFactor);
      const overheadPress1RMEstimated = calculate1RM(weight, reps);
      const overheadPress1RM =
        Math.round((overheadPress1RMEstimated * safetyFactor) / 100 / roundingFactor) * roundingFactor;
      return {
        ...state,
        overheadPressReps: reps,
        overheadPress1RM: overheadPress1RM.toString(),
      };
    }
    case SET_SAFETY_FACTOR: {
      const safetyFactor = Number(action.payload);
      const roundingFactor = Number(state.roundingFactor);
      const squat1RM =
        Math.round((calculate1RM(Number(state.squatWeight), state.squatReps) * safetyFactor) / 100 / roundingFactor) *
        roundingFactor;
      const bench1RM =
        Math.round((calculate1RM(Number(state.benchWeight), state.benchReps) * safetyFactor) / 100 / roundingFactor) *
        roundingFactor;
      const deadlift1RM =
        Math.round(
          (calculate1RM(Number(state.deadliftWeight), state.deadliftReps) * safetyFactor) / 100 / roundingFactor
        ) * roundingFactor;
      const overheadPress1RM =
        Math.round(
          (calculate1RM(Number(state.overheadPressWeight), state.overheadPressReps) * safetyFactor) /
            100 /
            roundingFactor
        ) * roundingFactor;
      const total = squat1RM + bench1RM + deadlift1RM;
      return {
        ...state,
        safetyFactor: action.payload,
        squat1RM: squat1RM.toString(),
        bench1RM: bench1RM.toString(),
        deadlift1RM: deadlift1RM.toString(),
        overheadPress1RM: overheadPress1RM.toString(),
        total: total.toString(),
      };
    }
    case SET_ROUNDING_FACTOR: {
      const safetyFactor = Number(state.safetyFactor);
      const roundingFactor = Number(action.payload);
      const squat1RM =
        Math.round((calculate1RM(Number(state.squatWeight), state.squatReps) * safetyFactor) / 100 / roundingFactor) *
        roundingFactor;
      const bench1RM =
        Math.round((calculate1RM(Number(state.benchWeight), state.benchReps) * safetyFactor) / 100 / roundingFactor) *
        roundingFactor;
      const deadlift1RM =
        Math.round(
          (calculate1RM(Number(state.deadliftWeight), state.deadliftReps) * safetyFactor) / 100 / roundingFactor
        ) * roundingFactor;
      const overheadPress1RM =
        Math.round(
          (calculate1RM(Number(state.overheadPressWeight), state.overheadPressReps) * safetyFactor) /
            100 /
            roundingFactor
        ) * roundingFactor;
      const total = squat1RM + bench1RM + deadlift1RM;
      return {
        ...state,
        safetyFactor: action.payload,
        squat1RM: squat1RM.toString(),
        bench1RM: bench1RM.toString(),
        deadlift1RM: deadlift1RM.toString(),
        overheadPress1RM: overheadPress1RM.toString(),
        total: total.toString(),
      };
    }
    default: {
      return state;
    }
  }
}
