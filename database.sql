-- Create the five tables below (user, address, pet, walk, grooming) --
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

-- Below will be starter data

-- Run query creates user, username = davidgould; password = 123 --
INSERT INTO "user" ("username", "password", "first_name", "last_name")
VALUES ('davidgould', '$2a$10$8azn12gOR16X7fVQT7zDgO/a2bWoJlZCzLjB3aHEMzSCYjzJG3Zwm', 'David', 'Gould');

INSERT INTO "address" ("street", "city", "state", "zip", "user_id")
VALUES ('999 Paw lane', 'Pawville', 'MN', '55449', 1);

INSERT INTO "pet" ("name", "age", "size", "image_url", "user_id", "address_id")
VALUES ('Shmake', 2, 'Small', 'https://i.imgur.com/JCKyAPl.png', 1, 1);

INSERT INTO "grooming" ("time", "pet_id")
VALUES 
('2020-10-27', 1),
('2020-10-28', 1);

INSERT INTO "walk" ("time", "pet_id", "address_id")
VALUES
('2020-10-29', 1, 1);