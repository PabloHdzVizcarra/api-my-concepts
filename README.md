# api-my-concepts

# Descripcion
La API soporta las mas comunes operaciones CRUD, cuenta con validacion para los endpoints he incluye test basicos que aseguran su funcionalidad y facilitan la modificacion y el refactor que deseen agregar

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
  # route GET "/"
  te proporciona informacion del API
```
```
  # route GET api/concepts
  retorna todos los conceptos que tengas almacenados en la database en forma de un array de objetos con la siguiente estructura como respuesta:

  [
  {
    "_id": "5fcdbd6ebbebd093efdda66f",
    "title": "Docker",
    "subtitle": "contenedores donde estuvieron toda mi vida",
    "description": "A fun programming language",
    "createdAt": "2020-12-07T05:28:14.089Z",
    "updatedAt": "2020-12-07T05:28:14.089Z",
    "__v": 0
  },
  {
    "_id": "5fcdc1b4e0016394694cd20e",
    "title": "github",
    "subtitle": "donde almacenar repositorios",
    "description": "github es un sitio web donde puedes alamcenar de manera gratuita",
    "createdAt": "2020-12-07T05:46:28.478Z",
    "updatedAt": "2020-12-07T05:46:28.478Z",
    "__v": 0
  }
]
```
```
  # route POST api/concept
  para poder almacenar almacenar los datos en la database debe mandar un request en json con la siguiente estrcutura de body

  {
    "title": "ubuntu",
    "subtitle": "distribucion linux",
    "description": "se podria decir que es la mejor distribucion linux para un recien llegado a este mundo"
  }

  el endpoint te retornara:

  {
    "message": "the ubuntu document was successfully saved in the database",
    "data": {
        "_id": "5fcdc326e0016394694cd20f",
        "title": "ubuntu",
        "subtitle": "distribucion linux",
        "description": "se podria decir que es la mejor distribucion linux para un recien llegado a este mundo",
        "createdAt": "2020-12-07T05:52:38.476Z",
        "updatedAt": "2020-12-07T05:52:38.476Z",
        "__v": 0
    }
  }

  ADVERTENCIA: para el post se tienen reglas de validacion, los campos no pueden ir vacios en caso de mandarlos vacios retornara un mensaje de error indicando el campo que se envio vacio
```

```
  # endpoint DELETE /api/concept/:name

  asegurate de mandar como query el nombre del concepto que deseas eliminar tal y como lo guardaste en el database mayusculas | minusculas incluidas,
  si el request tiene exito retornara un mensaje indicando que todo salio correctamente

  {
    "success": "was successfully removed from the database"
  }

```

```
  endpoint: PATCH /api/concept/:name
  puedes modificar un documento en su totalidad incuyendo el nombre/title
  debes mandar como query en el request el nombre del documento a actualizar
  el body del request debe ser un json que incluya los datos a modificar
  {
    "title": "ubuntu",
    "subtitle": "distribucion linux",
    "description": "se podria decir que es la mejor distribucion linux para un recien llegado a este mundo"
  }

  el endpoint respondera con un formato similar al siguiente:
  {
    "message": "ubuntu document updated successfully",
    "document": {
        "_id": "5fcdc1b4e0016394694cd20e",
        "title": "xubuntu",
        "subtitle": "distribucion de linux",
        "description": "distribucion basada en ubuntu, pero con el escritorio XFCE",
        "createdAt": "2020-12-07T05:46:28.478Z",
        "updatedAt": "2020-12-07T06:18:27.965Z",
        "__v": 0
    }
  }

```