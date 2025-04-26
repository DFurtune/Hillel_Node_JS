FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=hotel_booking
ENV MYSQL_USER=hotel_user
ENV MYSQL_PASSWORD=hotel_password

COPY init.sql /docker-entrypoint-initdb.d/