
java -jar ~/scripts/db-tools/schemaspy-6.1.0.jar -t pgsql -host localhost -db nojest -o ~/Documents/schemaspy -u nojest -dp ~/scripts/db-tools/ -p nojest -imageformat svg

# Переклчиться на роль postgres
sudo -i -u postgres

# Создать пользователя nojest
create user "nojest";

# Задать пароль пользователя nojest
alter user nojest with password 'nojest';

# Создать базу данных
create database "nojest";

# Подключиться к базе данных через psql
sudo psql -h localhost -d nojest -U nojest
