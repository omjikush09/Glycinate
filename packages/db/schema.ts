import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
export const userRelation = relations(userTable, ({ many }) => ({
	projects: many(projectTable),
}));

export const projectTable = pgTable("project", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar(),
	buildCommand: varchar().default("npm run build"),
	buildFolder: varchar().default("dist").notNull(),
	sourceFolder: varchar().default("").notNull(),
	branch: varchar().notNull().default("main"),
	gitUrl: varchar().notNull(),
	gitProvider: varchar().default("GITHUB"),
	userId: integer("user_id"),
});

export const projectRelation = relations(projectTable, ({ one, many }) => ({
	user: one(userTable, {
		fields: [projectTable.userId],
		references: [userTable.id],
	}),
	deployment: many(deployMentTable),
}));

export const deployEnum = pgEnum("status", [
	"Queued",
	"Started",
	"Failed",
	"Deployed",
]);

export const deployMentTable = pgTable("deployment_table", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	projectId: integer("project_id"),
	status: deployEnum(),
});

export const deploymentRelation = relations(deployMentTable, ({ one }) => ({
	projects: one(projectTable, {
		fields: [deployMentTable.projectId],
		references: [projectTable.id],
	}),
}));
