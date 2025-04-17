import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  event_type: text("event_type").notNull(),
  event_category: text("event_category").notNull(),
  event_action: text("event_action").notNull(),
  event_label: text("event_label"),
  visitor_id: text("visitor_id"),
  page_path: text("page_path"),
  referrer: text("referrer"),
  additional_data: json("additional_data"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics)
  .omit({ id: true, created_at: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
