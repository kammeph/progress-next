import { InferModel } from 'drizzle-orm';
import { decimal, int, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const strengthValuesSchema = mysqlTable(
  'progress_strength_values',
  {
    id: serial('id').primaryKey().autoincrement(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    squatWeight: decimal('squat_weight', { precision: 4, scale: 1 }).notNull(),
    squatReps: int('squat_reps').notNull(),
    squat1RM: decimal('squat_1rm', { precision: 4, scale: 1 }).notNull(),
    benchWeight: decimal('bench_weight', { precision: 4, scale: 1 }).notNull(),
    benchReps: int('bench_reps').notNull(),
    bench1RM: decimal('bench_1rm', { precision: 4, scale: 1 }).notNull(),
    deadliftWeight: decimal('deadlift_weight', { precision: 4, scale: 1 }).notNull(),
    deadliftReps: int('deadlift_reps').notNull(),
    deadlift1RM: decimal('deadlift_1rm', { precision: 4, scale: 1 }).notNull(),
    overheadPressWeight: decimal('overhead_press_weight', { precision: 4, scale: 1 }).notNull(),
    overheadPressReps: int('overhead_press_reps').notNull(),
    overheadPress1RM: decimal('overhead_press_1rm', { precision: 4, scale: 1 }).notNull(),
    total: decimal('total', { precision: 4, scale: 1 }).notNull(),
    safetyFactor: decimal('safety_factor', { precision: 4, scale: 1 }).notNull(),
    roundingFactor: decimal('rounding_factor', { precision: 4, scale: 1 }).notNull(),
  },
  (table) => {
    return {
      userIdIdx: uniqueIndex('strength_values_user_id_idx').on(table.userId),
    };
  }
);

export type StrengthValuesModel = InferModel<typeof strengthValuesSchema>;
