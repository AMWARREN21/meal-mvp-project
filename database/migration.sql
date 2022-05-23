DROP DATABASE IF EXISTS meal_tracker;

CREATE DATABASE meal_tracker;

\c meal_tracker;

CREATE TABLE meals (
    meal_id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    ingredients varchar(255),
    prep_time int
);