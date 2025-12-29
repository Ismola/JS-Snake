FROM nginx:alpine

# Copiar archivos del proyecto al directorio de nginx
COPY . /usr/share/nginx/html

# Dar permisos correctos
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
