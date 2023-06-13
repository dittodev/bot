CREATE TABLE IF NOT EXISTS "guilds" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"member_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"discord_id" text PRIMARY KEY NOT NULL,
	"created_at" date,
	"username" text
);
