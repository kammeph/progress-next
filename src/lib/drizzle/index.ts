import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator';
import { adaptionFactorsSchema } from './schema/adaption-factors';
import { exerciseSchemas } from './schema/exercises';
import { userSchemas } from './schema/users';
import { strengthValuesSchema } from './schema/strength-values';

export const schema = {
  adaptionFactorsSchema,
  ...exerciseSchemas,
  strengthValuesSchema,
  ...userSchemas,
};

// create the connection
const connection = connect({
  host: process.env['DATABASE_HOST'],
  username: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD'],
});

export const db = drizzle(connection, { schema });

export async function runMigrations() {
  return await migrate(db, { migrationsFolder: './drizzle' });
}
