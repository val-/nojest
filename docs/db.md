# Описание стуктуры базы данных


![alt text](./db-relationships.png?raw=true)


## Users table
* id
* name
* phone
* email
* email_confirmed
* password_hash
* date_of_birth
* gender

## Languages table
* id
* name

## User languages table
* user_id
* language_id

## Professions table
* id
* name

## User professions table
* user_id
* profession_id

## Orders table
* id
* author_id
* title
* description
* author_price

## Tasks table
* id
* order_id
* contractor_id
* contractor_price

## Messages table
* id
* task_id
* user_id
* date_time
* text

## Order history table
* id
* order_id
* date_time
* status

## Task history table
* id
* task_id
* date_time
* status

## Feedback table
* task_id
* feedback_sender_id
* feedback_recipient_id
* text
