import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  fullName: text('full_name'),
  gmail: text('gmail'),
});

export const sessionTable = sqliteTable("user_session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull()
});

export const keyTable = sqliteTable('user_key', {
  id: text("id").notNull().primaryKey(),  // google:userId
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  hashedPassword: text('hashed_password')
})
