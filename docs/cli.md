
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
sudo docker exec -t nojest pg_dumpall -c -U nojest > dump.sql

# Накатить дамп на базу
cat dump_nojest.sql | sudo docker exec -i nojest psql -U nojest

# Сделать дамп данных сложно
sudo docker exec -t nojest pg_dump -U nojest -d nojest -t nj_user > dump/nj_user.sql;
sudo docker exec -t nojest pg_dump -U nojest -d nojest -t nj_order > dump/nj_order.sql;
sudo docker exec -t nojest pg_dump -U nojest -d nojest -t nj_task > dump/nj_task.sql;
sudo docker exec -t nojest pg_dump -U nojest -d nojest -t nj_task_history > dump/nj_task_history.sql;
sudo docker exec -t nojest pg_dump -U nojest -d nojest -t nj_message > dump/nj_message.sql;

# Накатить дамп на базу
cat dump/*.sql | sudo docker exec -i nojest psql -U nojest