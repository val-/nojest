# Описание стуктуры базы данных

## Users table
* id
* name
* phone
* email
* email_confirmed
* password_hash
* date_of_birth
* gender
* country
* city
* education_level

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
* status
* author_price

## Tasks table
* id
* order_id
* contractor_id
* status
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


