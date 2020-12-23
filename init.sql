create type nj_gender_type as enum ('MALE', 'FEMALE');

create table nj_user(
    id serial primary key,
    full_name varchar(255),
    phone varchar(30),
    email varchar(255),
    email_confirmed boolean,
    password_hash varchar(255),
    date_of_birth date,
    gender nj_gender_type,
    avatar text
);
