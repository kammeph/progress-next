import { InferModel, relations, sql } from 'drizzle-orm';
import { decimal, index, int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const MuscleGroups = [
  'SQUAT',
  'BENCH',
  'DEADLIFT',
  'QUADS',
  'GLUTES',
  'HAMSTRINGS',
  'CHEST',
  'BACK',
  'SHOULDER',
  'BICEPS',
  'TRICEPS',
  'CORE',
] as const;

export const loadFactors = mysqlTable(
  'progress_load_factors',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),
    exerciseId: varchar('exercise_id', { length: 36 }).notNull(),
    value: decimal('value', { precision: 2, scale: 1 }).notNull(),
    muscleGroup: mysqlEnum('muscle_group', MuscleGroups).notNull(),
  },
  (table) => {
    return {
      exerciseIdIdx: index('load_factors_exercise_id_idx').on(table.exerciseId),
    };
  }
);

export type LoadFactor = InferModel<typeof loadFactors, 'insert'>;

export const loadFactorsRelations = relations(loadFactors, ({ one }) => ({
  exercise: one(exercises, {
    fields: [loadFactors.exerciseId],
    references: [exercises.id],
  }),
}));

export const exercises = mysqlTable(
  'progress_exercises',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),
    exerciseGroupId: varchar('exercise_group_id', { length: 36 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    index: int('index').notNull(),
    conversionFactor: decimal('conversion_factor', { precision: 4, scale: 1 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      exerciseGroupIdIdx: index('exercises_exercise_group_id_idx').on(table.exerciseGroupId),
    };
  }
);

export type Exercise = InferModel<typeof exercises, 'insert'> & {
  loadFactors?: LoadFactor[];
};

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  exerciseGroup: one(exerciseGroups, {
    fields: [exercises.exerciseGroupId],
    references: [exerciseGroups.id],
  }),
  loadFactors: many(loadFactors),
}));

export const exerciseGroups = mysqlTable('progress_exercise_groups', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),
  name: varchar('name', { length: 255 }).notNull(),
  index: int('index').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export type ExerciseGroup = InferModel<typeof exerciseGroups> & { exercises?: InferModel<typeof exercises>[] };

export const exerciseGroupsRelations = relations(exerciseGroups, ({ many }) => ({
  exercises: many(exercises),
}));

export const exerciseSchemas = {
  loadFactors,
  loadFactorsRelations,
  exercises,
  exercisesRelations,
  exerciseGroups,
  exerciseGroupsRelations,
};
