set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public.users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"createdAt" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.locations" (
	"locationId" serial NOT NULL,
	"location" TEXT,
	"time" TEXT,
	"address" TEXT,
	"notes" TEXT,
	"phoneNumber" TEXT,
	"itineraryId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "locations_pk" PRIMARY KEY ("locationId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.itineraries" (
	"itineraryId" serial NOT NULL,
	"eventId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "itineraries_pk" PRIMARY KEY ("itineraryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.events" (
	"eventId" serial NOT NULL,
	"userId" integer NOT NULL,
	"seatgeekEventId" integer NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "locations" ADD CONSTRAINT "locations_fk0" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("itineraryId");
ALTER TABLE "locations" ADD CONSTRAINT "locations_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_fk0" FOREIGN KEY ("eventId") REFERENCES "events"("eventId");
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
