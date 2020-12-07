# api-my-concepts


## Mode de uso
```npm install```: comienza por instalar las dependencias necesarias de node js

**variables de entorno**

la aplicacion requiere de variables de entorno para funcionar correctamente puedes proporcionarlas con un archivo .env con la siguiente estructura
```
PORT="puerto a usar por la aplicacion por defecto 3000"
MONGO_USERNAME="usuario de mongodb"
MONGO_PASSWORD="password del usuario de mongodb"
MONGO_PORT="puerto de mongodb"
MONGO_HOST="host de mongodb"
MONGO_DB="nombre de la database"
```

### EndPoints

```
  # route "/"
  te proporciona informacion del API
```
```
  # route api/concepts
  retorna todos los conceptos que tengas almacenados en la database con la siguiente estructura como respuesta:

```