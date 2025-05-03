ALTER TABLE "project" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_name_unique" UNIQUE("name");