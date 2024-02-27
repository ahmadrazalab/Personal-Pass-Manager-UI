FROM noscopev6/ubuntu-php-todo:latest

RUN rm -rf /var/www/html/*
COPY . /var/www/html

RUN apt update -y 
RUN apt install nodejs -y 
RUN apt install npm -y 
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

RUN cd /var/www/html && mv .env.example .env
RUN cd /var/www/html && npm i 

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
# Start Nginx and PHP-FPM
CMD service nginx start && service php8.0-fpm start && tail -f /dev/null
