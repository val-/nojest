
# Генерация графической схемы БД
java -jar ~/scripts/db-tools/schemaspy-6.1.0.jar -t pgsql -host localhost -db nojest -o ~/Documents/schemaspy -u nojest -dp ~/scripts/db-tools/ -p nojest -imageformat svg

# Создать образ
sudo docker build -t nojest .

# Запустить контейнер
sudo docker run --rm --name nojest -p 5432:5432 nojest

# Подключиться к базе данных через psql
sudo psql -h localhost -p 5432 -d nojest -U nojest --password
