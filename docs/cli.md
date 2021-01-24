
# Генерация графической схемы БД
java -jar ~/scripts/db-tools/schemaspy-6.1.0.jar -t pgsql -host localhost -db nojest -o ~/Documents/schemaspy -u nojest -dp ~/scripts/db-tools/ -p nojest -imageformat svg

# Создать образ
sudo docker build -t nojest .

# Запустить контейнер
sudo docker run --rm --name nojest -p 5432:5432 nojest

#sudo docker build -t nojest . ; sudo docker run --rm --name nojest -p 5432:5432 nojest;

# Открыть bash терминал в контейнере
docker exec -it nojest bash
# Подключиться к базе данных через psql
psql -h localhost -p 5432 -d nojest -U nojest --password

# Сделать дамп данных
sudo docker exec -t nojest pg_dumpall -c -U nojest > dump_nojest.sql

# Накатить дамп на базу
cat dump_nojest.sql | sudo docker exec -i nojest psql -U nojest