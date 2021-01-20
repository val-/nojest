create type nj_gender_type as enum ('MALE', 'FEMALE', 'NONE');

create table nj_user(
    id serial primary key,
    full_name varchar(255),
    phone_number varchar(30),
    email varchar(255) not null unique,
    email_confirmed boolean,
    email_confirm_token varchar(64),
    password_hash varchar(64) not null,
    date_of_birth date,
    gender nj_gender_type,
    country varchar(4),
    city varchar(4),
    avatar text
);

COPY public.nj_user (id, full_name, phone_number, email, email_confirmed, email_confirm_token, password_hash, date_of_birth, gender, country, city, avatar) FROM stdin;
1	Valentin Agafonov	+7 916 024 49 13	webkoder@ya.ru	t	62ca8482a24d4441305b5dbdf0611131b72c4b56efe9a52048e8f95c6e8669d8	$2b$10$x.irtGeG4l48pBv1m4ugLuSmW1H.EZ6DB3dsJ7yyQRi.sd3PmxL9C	1988-08-29	MALE	RU	LED	\N
\.

COPY public.nj_user (id, full_name, phone_number, email, email_confirmed, email_confirm_token, password_hash, date_of_birth, gender, country, city, avatar) FROM stdin;
2	Vladimir Lenin	+7 495 888 44 22	lenin@ya.ru	t	62ca8482a24d4441305b5dbdf0611131b72c4b56efe9a52048e8f95c6e8669d8	$2b$10$x.irtGeG4l48pBv1m4ugLuSmW1H.EZ6DB3dsJ7yyQRi.sd3PmxL9C	1895-08-29	MALE	RU	LED	\N
\.
