CREATE TABLE nj_session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
	expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE nj_session ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON nj_session(expire);

CREATE TABLE nj_language(
    code varchar(2) PRIMARY KEY,
    title varchar(30)
);

INSERT INTO nj_language (code, title) VALUES ('RU', 'Russian');
INSERT INTO nj_language (code, title) VALUES ('EN', 'English');

CREATE TYPE nj_order_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE nj_task_status AS ENUM (
    'JUST_VIEWED',
    'REQUESTED',
    'REJECTED_BY_CONTRACTOR',
    'REJECTED_BY_CUSTOMER',
    'ASSIGNED',
    'RESOLVED',
    'DISPUTE',
    'CANCELLED',
    'DONE'
);

CREATE TYPE nj_gender_type AS ENUM ('MALE', 'FEMALE', 'NONE');

CREATE TABLE nj_user(
    id SERIAL PRIMARY KEY,
    full_name varchar(255),
    phone_number varchar(30),
    email varchar(255) NOT NULL UNIQUE,
    email_confirmed boolean,
    email_confirm_token varchar(64),
    password_hash varchar(64) NOT NULL,
    date_of_birth date,
    gender nj_gender_type,
    country varchar(4),
    city varchar(4),
    is_customer boolean,
    is_contractor boolean,
    avatar text
);

CREATE TABLE nj_order(
    id SERIAL PRIMARY KEY,
    author_id integer REFERENCES nj_user(id),
    title varchar(255),
    platform varchar(8),
    language_code varchar(2) REFERENCES nj_language(code),
    description text,
    expected_price integer,
    deadline timestamp,
    status nj_order_status
);

CREATE TABLE nj_task(
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES nj_order(id),
    contractor_id integer REFERENCES nj_user(id),
    contractor_price integer
);

CREATE TABLE nj_task_history(
    id SERIAL PRIMARY KEY,
    task_id integer REFERENCES nj_task(id),
    date_time timestamp,
    status nj_task_status
);

CREATE TABLE nj_message(
    id SERIAL PRIMARY KEY,
    task_id integer REFERENCES nj_task(id),
    date_time timestamp,
    author_id integer REFERENCES nj_user(id),
    letter text
);

