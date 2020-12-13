create type gender_type as enum ('MALE', 'FEMALE');
create type order_status_type as enum ('OPENED', 'CLOSED');
create type task_status_type as enum ('REQUEST', 'WORK', 'DONE', 'CANCELLED');

create table "user"(
    id serial primary key,
    name varchar(255),
    phone varchar(30),
    email varchar(255),
    email_confirmed boolean,
    password_hash varchar(255),
    date_of_birth date,
    gender gender_type
);

create table "language"(
    id serial primary key,
    name varchar(30)
);

create table "user_language"(
    user_id integer references "user"(id),
    language_id integer references "language"(id),
    primary key(user_id, language_id)
);

create table "profession"(
    id serial primary key,
    name varchar(255)
);

create table "user_profession"(
    user_id integer references "user"(id),
    profession_id integer references "profession"(id),
    primary key(user_id, profession_id)
);

create table "order"(
    id serial primary key,
    author_id  integer references "user"(id),
    title varchar(255),
    description text,
    author_price integer
);

create table "task"(
    id serial primary key,
    order_id integer references "order"(id),
    contractor_id integer references "user"(id),
    contractor_price integer
);

create table "message"(
    id serial primary key,
    task_id integer references "task"(id),
    user_id integer references "user"(id),
    date_time timestamp,
    text text
);

create table "order_history"(
    id serial primary key,
    order_id integer references "order"(id),
    date_time timestamp,
    status order_status_type
);

create table "task_history"(
    id serial primary key,
    task_id integer references "task"(id),
    date_time timestamp,
    status task_status_type
);

create table "feedback"(
    task_id integer references "task"(id),
    feedback_sender_id integer references "user"(id),
    feedback_recipient_id integer references "user"(id),
    text text,
    primary key(task_id, feedback_sender_id, feedback_recipient_id)
);

