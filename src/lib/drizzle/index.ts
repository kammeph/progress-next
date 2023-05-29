import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator';
import { userRoles, userRolesRelations, users, usersRelations } from './schema/users';

export const schema = {
  users,
  userRoles,
  usersRelations,
  userRolesRelations
};

// create the connection
const connection = connect({
  host: process.env['DATABASE_HOST'],
  username: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD']
});

export const db = drizzle(connection, { schema });

export async function runMigrations() {
  return await migrate(db, { migrationsFolder: './drizzle' });
}
