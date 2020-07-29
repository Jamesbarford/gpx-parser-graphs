CREATE TABLE IF NOT EXISTS "public"."users" (
    "user_id" VARCHAR(100) NOT NULL PRIMARY KEY,
    "user_name" VARCHAR(100) NOT NULL,
    "user_email" VARCHAR(100) NOT NULL,
    "distance_formatting" bpchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."activities" (
    "user_id" VARCHAR (100) NOT NULL,
    "activity_id" VARCHAR(100) NOT NULL,
    "activity_date" VARCHAR(100) NOT NULL,
    "activity_type" VARCHAR(20) NOT NULL,
    "activity_name" VARCHAR(100) NOT NULL,
    PRIMARY KEY ("user_id", "activity_id")
);

CREATE TABLE IF NOT EXISTS "public"."activity_data" (
    "user_id" VARCHAR(100) NOT NULL,
    "activity_id" VARCHAR(100) NOT NULL,
    "activity_date" VARCHAR(100) NOT NULL,
    "activity_type" VARCHAR(20) NOT NULL,
    "speed" NUMERIC NOT NULL,
    "distance" NUMERIC NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,
    "lat" NUMERIC NOT NULL,
    "lon" NUMERIC NOT NULL,
    "heart_rate" NUMERIC,
    "cadence" NUMERIC
);

