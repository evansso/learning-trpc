
import {
  boolean,
  index,
  json,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const user = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .notNull(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => {
    return {
      emailIdx: index("user_email_idx").on(table.email),
    };
  }
);

export const chat = pgTable(
    "chat",
    {
      id: text("id")
        .primaryKey()
        .notNull(),
      userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
      title: text("title").default("(New Chat)"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => {
      return {
        userIdIdx: index("chats_userId_idx").on(table.userId),
      };
    }
  );