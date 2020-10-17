CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR (80) UNIQUE NOT NULL,
"password" VARCHAR (1000) NOT NULL,
"first_name" VARCHAR (80) NOT NULL,
"last_name" VARCHAR (80) NOT NULL
);

CREATE TABLE "address" (
"id" SERIAL PRIMARY KEY,
"street" VARCHAR (80) NOT NULL,
"city" VARCHAR (80) NOT NULL,
"state" VARCHAR (2) NOT NULL,
"zip" INT NOT NULL,
"user_id" INT
);

CREATE TABLE "pet" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR (80) NOT NULL,
"age" INT NOT NULL,
"size" VARCHAR (30) NOT NULL,
"image_url" VARCHAR (500),
"user_id" INT,
"address_id" INT
);

CREATE TABLE "walk" (
"id" SERIAL PRIMARY KEY,
"time" DATE NOT NULL,
"pet_id" INT,
"address_id" INT
);

CREATE TABLE "grooming" (
"id" SERIAL PRIMARY KEY,
"time" DATE NOT NULL,
"pet_id" INT,
"drop_off_address" VARCHAR (300) DEFAULT '101 Doggo ln Blaine, MN 55449'
);