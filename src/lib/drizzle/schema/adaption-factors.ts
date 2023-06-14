import { InferModel } from 'drizzle-orm';
import { decimal, int, mysqlEnum, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const Genders = ['MALE', 'FEMALE'] as const;

export type Gender = (typeof Genders)[number];

export const StrengthLevels = ['ELITE', 'MASTER', 'CLASS_1', 'CLASS_2', 'CLASS_3', 'CLASS_4', 'CLASS_5'] as const;

export type StrengthLevel = (typeof StrengthLevels)[number];

export const adaptionFactorsSchema = mysqlTable(
  'progress_adaption_factors',
  {
    id: serial('id').primaryKey().autoincrement(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    gender: mysqlEnum('gender', Genders).notNull(),
    weight: decimal('weight', { precision: 4, scale: 1 }).notNull(),
    height: decimal('height', { precision: 4, scale: 1 }).notNull(),
    strengthLevel: mysqlEnum('strength_level', StrengthLevels).notNull(),
    genderFactor: int('gender_factor').notNull(),
    weightFactor: int('weight_factor').notNull(),
    heightFactor: int('height_factor').notNull(),
    strengthLevelFactor: int('strength_level_factor').notNull(),
    experienceFactor: int('experience_factor').notNull(),
    ageFactor: int('age_factor').notNull(),
    nutritionFactor: int('nutrition_factor').notNull(),
    sleepFactor: int('sleep_factor').notNull(),
    stressFactor: int('stress_factor').notNull(),
    recoveryFactor: int('recovery_factor').notNull(),
    adaptionFactor: int('adaption_factor').notNull(),
  },
  (table) => {
    return {
      userIdIdx: uniqueIndex('adaption_factors_user_id_idx').on(table.userId),
    };
  }
);

export type AdaptionFactorsModel = InferModel<typeof adaptionFactorsSchema>;
