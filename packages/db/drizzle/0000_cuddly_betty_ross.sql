CREATE TYPE "public"."status" AS ENUM('Queued', 'Started', 'Failed', 'Deployed');--> statement-breakpoint
CREATE TABLE "deployment_table" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "deployment_table_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer,
	"status" "status",
	"ecs_build_id" varchar
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "project_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"buildCommand" varchar DEFAULT 'npm run build',
	"buildFolder" varchar DEFAULT 'dist' NOT NULL,
	"sourceFolder" varchar DEFAULT './' NOT NULL,
	"branch" varchar DEFAULT 'main' NOT NULL,
	"gitUrl" varchar NOT NULL,
	"gitProvider" varchar DEFAULT 'GITHUB',
	"user_id" text NOT NULL,
	CONSTRAINT "project_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"userId" text PRIMARY KEY NOT NULL
);
