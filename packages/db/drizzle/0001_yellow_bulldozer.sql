CREATE TYPE "public"."status" AS ENUM('Queued', 'Started', 'Failed', 'Deployed');--> statement-breakpoint
ALTER TABLE "deployment_table" ADD COLUMN "status" "status";--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "buildCommand" varchar DEFAULT 'npm run build';--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "buildFolder" varchar DEFAULT 'dist' NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "sourceFolder" varchar DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "branch" varchar DEFAULT 'main' NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "gitUrl" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "gitProvider" varchar DEFAULT 'GITHUB';