# PAUTAS
En este taller grupal trabajaremos en una aplicación CRUD, capaz de conectarse con un servidor y realizar modificaciones en una base de datos.

Para ello, haremos uso de un mock server, o servidor simulado, que nos permitirá crear rápidamente los recursos backend necesarios y concentrarnos en el trabajo en cliente. 

## RECURSOS
Antes de empezar, debemos configurar el servidor. 
Les dejamos una guía para crearlo con el servicio de MockApi, que es muy sencillo de utilizar, pero pueden crearlo con cualquier otro servicio (postman, stoplight, mocky, etc.):

Entran a https://mockapi.io/ y se registran (debe hacerlo solamente un integrante del subgrupo).

Una vez registrados crean un nuevo proyecto de nombre crud, dejando los otros campos en blanco. 

Ya tenemos disponible la url con la que trabajaremos, y que tendrá el formato https://SECRET.mockapi.io/

Crearemos un nuevo recurso de nombre users para la entidad usuario, con la que trabajará nuestro sitio. Para ello borraremos los atributos por defecto (excepto ID) y crearemos dos, name y lastname, ambos del tipo string.

Por último, generaremos 5 registros iniciales para trabajar con ellos. Para esto alcanzará con arrastrar sobre la barra con el nombre del recurso (users).

Los endpoints a los que realizar las solicitudes serán:

Listar: GET https://SECRET.mockapi.io/users
Devuelve un json con una lista que contiene todos los registros.

Obtener 1: GET https://SECRET.mockapi.io/users/:id
Recibe un id en la url y devuelve un json con el registro cuyo id haya sido solicitado.

Agregar: POST https://SECRET.mockapi.io/users
Recibe un json con un objeto con los atributos name y lastname, (en el body) lo agrega a la base de datos (asignándole un id) y devuelve un json con el registro creado.

Modificar: PUT https://SECRET.mockapi.io/users/:id
Recibe un id en la url y un json con un objeto con los atributos name y lastname, (en el body), modifica con dichos datos el registro cuyo id coincida con el recibido, y devuelve un json con el registro modificado.

Eliminar: DELETE https://SECRET.mockapi.io/users/:id
Recibe un id en la url, elimina el registro cuyo id coincida con el recibido, y devuelve un json con el registro eliminado.

Ahora que tenemos listo nuestro servidor, vamos a trabajar a nivel de cliente. Para ello disponemos de una página web (adjunta) a la que debemos realizar las modificaciones necesarias para comunicarse con nuestro servidor a través de fetch().

## REQUISITOS DE LA PÁGINA

El botón "Buscar" debe mostrar como resultado el registro cuyo id haya sido solicitado.
En caso de dejar vacío el campo del id, debe mostrar cómo resultado la lista de todos los registros.✅

El botón "Agregar" debe enviar al servidor un objeto construido con los valores introducidos por el usuario en los campos nombre y apellido. 
Deberá mostrar como resultado el listado de registros, incluyendo el agregado.

El botón "Modificar" deberá abrir un modal donde se muestren los campos nombre y apellido, ya con los valores cargados coincidentes con el registro cuyo id ingresó el usuario. 
El usuario debe poder modificar dichos valores, y al presionar el botón para guardar los cambios, se debe realizar la consulta adecuada para modificar el registro, cerrar el modal, y mostrar como resultado la lista de registros, con las correspondientes modificaciones.

El botón "Borrar" deberá realizar la consulta para eliminar el registro cuyo id coincida con el ingresado por el usuario, y mostrar como resultado el listado de registros, ya con el mismo eliminado.

Por último, en todos los casos, excepto el de "Buscar", los botones que realizan la consulta deberán permanecer desactivados, mientras alguno de los campos correspondientes se encuentre vacío.
Además, en caso de que la solicitud genere una respuesta con un status no ok, por ejemplo si intentamos borrar, modificar o buscar un registro inexistente, se deberá avisar al usuario por medio de una alerta que algo no salió bien.
 


