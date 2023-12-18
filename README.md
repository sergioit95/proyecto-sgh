# Aplicación para gestionar la redacción de un pequeño periódico o revista
Proyecto Fin de Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma.
Realizado por Sergio García Herrera en Diciembre de 2023.

# Índice

1. Descripción de mi proyecto 
2. Funcionalidad
3. Despliegue
4. Posibles Mejoras de la aplicación
5. Problemas encontrados
6. Conclusión

# 1. Descripción de mi proyecto   
Es una aplicación web desarrollada con Angular en la parte de la interacción de usuario (front-end),  y con SpringBoot y MySQL para la parte que hace gestión del servidor y la base de datos.
El principal objetivo de esta aplicación web es que una pequeña revista de redacción de articulos pueda gestionar su periodico o revista. Por ejemplo permitiendo la creación, modificación y eliminación de artículos, y que estos se reflejen en la home del sitio web creados por los redactores. También gestionar los redactores que haya o entren en la empresa, mediante el panel de administración, permitiendo al administrador crear redactores y eliminarlos. 


# 2. Funcionalidad
La funcionalidad de mi proyecto se centra en lo siguiente:

- **Panel de administración**: La persona que en la empresa le otorguen el cargo de administrador podra crear administradores y redactores, y también tiene el permiso de eliminarlos, por ejemplo si algun redactor se va de la empresa. 
(Esta parte he intentado añadirle tambien un login y un registro con Spring Security pero me he quedado a medias porque no he llegado a la solución a tiempo).

- **Panel de redacción**: El trabajador que le hayan otorgado redactor podrá crear, modificar y eliminar articulos.

- **Visualización de los artículos generados**: Una vez que el redactor crea el articulo este se añade directamente a la home de la pagina en formato tarjeta. (He tenido problemas con las imagenes y no se muestran, pero se guardan en la base de datos).

- **Implementación técnica**: La aplicacion es implementada con Spring Boot e integra CORS para manejar solicitudes secuenciales de recursos cruzados para el procesamiento de bases de datos (MySQL) y Spring Security para el procesamiento de autenticación, (aunque está ultima implementación no la he podido realizar con éxito).

- **Aumento del flujo del trabajo**: Esta aplicación creo que puede aumentar el flujo de trabajo en una redactora (si hubiera implementado todas las mejoras que tenia pensadas).


# 3. Despliegue
## MySQL en Local y Tomcat
Para manejar los datos en el frontend de la API Rest de este proyecto, hay que hacer uso de una base de datos y un framework que se pueda comunicar con ella (yo he utilizado Spring Boot y MySQL).

**BackEnd**
Yo he creado este script en MySQL que crea la base de datos, la borra si ya existe en el gestor de base de datos, crea las tablas Articulo, Redactor y Administrador y genero las relaciones que tienen entre Administrador y Redactor, y Articulo y Redactor.

- Script:
	DROP DATABASE IF EXISTS sgh_noticias;

	CREATE DATABASE sgh_noticias;

	USE sgh_noticias;

	CREATE TABLE administrador (
	  id INT NOT NULL AUTO_INCREMENT,
	  nombre VARCHAR(75) NOT NULL,
	  apellidos VARCHAR(150) NOT NULL,
	  email VARCHAR(100) NOT NULL,
	  password VARCHAR(30) NOT NULL,
	  PRIMARY KEY (id)
	);

	CREATE TABLE redactor (
	  id INT NOT NULL AUTO_INCREMENT,
	  nombre VARCHAR(75) NOT NULL,
	  apellidos VARCHAR(150) NOT NULL,
	  email VARCHAR(100) NOT NULL,
	  password VARCHAR(30) NOT NULL,
	  administrador_id INT,
	  PRIMARY KEY (id),
	  FOREIGN KEY (administrador_id) REFERENCES administrador (id)
	);

	CREATE TABLE articulo (
	  id INT NOT NULL AUTO_INCREMENT,
	  titulo VARCHAR(100) NOT NULL,
	  contenido TEXT NOT NULL,
	  fecha_publicacion DATE NOT NULL,
	  redactor_id INT NOT NULL,
	  imagen BLOB NOT NULL,
	  PRIMARY KEY (id),
	  FOREIGN KEY (redactor_id) REFERENCES redactor (id)
	);

	ALTER TABLE articulo MODIFY imagen MEDIUMBLOB;

## FrontEnd
Hay que tener instalado Node.js para hacer uso de Angular. Una vez instalado se podra crear el proyecto con ng start (nombre_del_proyecto). Una vez creado podremos crear componentes con ng g c nombre_del_componente y para crear los servicios ng g s nombre_del_servicio. Una vez tenemos los componentes, los servicios que se comunican con la API que tenemos en SpringBoot podremos iniciar el proyecto con ng s -o.

## 4. Posibles Mejoras de la aplicación
Estas son las mejoras que me gustaría hacer en un futuro: 
- Añadir el Login y Registro.
- Arreglar el problema de visualización de las imagenes en las tarjetas de los artículos.
- Añadir otra entidad Usuario que mediante inicio de sesión pueda ver artículos y añadirlos a una sección de artículos favoritos.
- Poder cambiar la contraseña del usuario, administrador o redactor por si se ha equivocado.
- Validar los formularios de registro e inicio de sesión. 

## 5. Problemas encontrados
Me he encontrado con los siguientes problemas:
- Intente hacer de primeras el backend con Node.js y Express pero no tenia mucho conocimiento y preferí usar SpringBoot.
- Problemas con las rutas y los CORS, para comunicarse Angular con Springboot correctamente.
- Problemas no solucionados aún con el Inicio y Registro de Usuarios.

## 6. Conclusión
En conclusión, me llevo una gran experiencia realizando este proyecto, porque creía que no podría ser capaz de hacer funcionar una aplicación full stack que puediese comunicarse el front-end con el back-end correctamente. Me ha servido mucho este proyecto para ver que soy capaz de investigar por mi cuenta y filtrar bien la información que hay en internet para luego implementarla en mis aplicaciones.
