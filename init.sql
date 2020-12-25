create type nj_gender_type as enum ('MALE', 'FEMALE');

create table nj_user(
    id serial primary key,
    full_name varchar(255),
    phone varchar(30),
    email varchar(255) not null unique,
    email_confirmed boolean,
    email_confirm_token varchar(64),
    password_hash varchar(64) not null,
    date_of_birth date,
    gender nj_gender_type,
    avatar text
);
