import { relations, sql } from 'drizzle-orm';
import { boolean, index, mysqlEnum, mysqlTable, timestamp, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const UserRoles = ['ADMIN', 'TRAINER', 'TRAINEE'] as const;

export const userRoles = mysqlTable(
  'progress_user_roles',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),
    userId: varchar('user_id', { length: 36 }).notNull(),
    role: mysqlEnum('role', UserRoles).notNull()
  },
  table => {
    return {
      userIdIdx: index('user_roles_user_id_idx').on(table.userId)
    };
  }
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id]
  })
}));

export const users = mysqlTable(
  'progress_users',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),
    username: varchar('username', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    locale: varchar('locale', { length: 10 }),
    canLogin: boolean('can_login').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow()
  },
  table => {
    return {
      usernameIdx: uniqueIndex('users_username_idx').on(table.username)
    };
  }
);

export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles)
}));

export const userSchemas = {
  users,
  userRoles,
  usersRelations,
  userRolesRelations
};
