FROM library/postgres
ENV POSTGRES_USER nojest
ENV POSTGRES_PASSWORD nojest
ENV POSTGRES_DB nojest
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
