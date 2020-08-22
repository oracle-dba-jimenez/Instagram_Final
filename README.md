# Datos generales del proyecto final
	
	Proyecto Final Instagram
	"InstaFamily"
	
	Por: Ing. Miguel Angel Jiménez Solano (MD).

	Instituto Tecnológico de Las Américas "ITLA".
	"Diplomado en programación web en Javascript" (2020-T-2) Junio-Agosto del 2020 [DPWJ-T-2-MESCYT-G1].
	Método del curso: Online.
	Profesor/Facilitador:	Lic. Abel Albuez Sánchez.
	
	Auspiciado por y con la colabaración del Ministerio de Educación Superior, Ciencia y Tecnología "MESCYT" del gobierno de la República Dominicana.


# INSTAFAMILY

Es un clone de la versión web de la famosa red social Instagram para poner en practica los conocimientos aprendidos durante el diplomado. El mismo es parte de los entregables del proyecto final.

## rev. 1.0 "21 de agosto de 2020"

## Funcionalidades Generales

* Registro de nuevos usuarios.
* Login.
* Cerrar sesión.
* Información del perfil del usuario.
  * Listado de publicaciones-post del usuario en sesión.
  * Perfil:
    * Subir nueva foto.
    * Eliminar foto.
    * Cambiar contraseña.
	* Conteo de publicaciones-post.
* Publicaciones-Post.
  * Crear nueva.
  * Editar existente.
  * Eliminación.
  * Visualización.
  * Botón gusta y conteo de los mismos.
* Busqueda de otros perfiles.
* Comentar publicaciones.
* Ver publicaciones en la pantalla inicial.


## Herramientas utilizadas

* [Firebase Authentication](https://firebase.google.com/docs/auth).

* [Firebase Database](https://firebase.google.com/docs/database).

* [Firebase Cloud Storage](https://firebase.google.com/docs/storage).

* [Bootstrap CSS] (https://getbootstrap.com/).

* [UPKG Global Content Delivery] (https://unpkg.com/).

* [JAVAScript] (https://nodejs.org).

* [Visual Studio Code] (https://code.visualstudio.com/).

## Pasos para configurar proyecto

* Instalar los siguientes productos:
	* Visual Studio Code (https://code.visualstudio.com/).
	* Node JS [JavaScript] (https://nodejs.org/es/).
	* Live Server for Visual Studio Code [Para pruebas en vivo desde Visual Studio Code].
	* En casos de errores dirigirse a: 

	* Configurar cuenta de la base de datos para el proyecto
		* Crear cuenta de gmail.com (https://gmail.com).
		* Crear proyecto [Base de datos Firebase 17.8 o superior] Nombre: "InstaFamily"  (https://firebase.google.com/).
		* Habilitar las opciones de atenticar usuarios de Firebase [Auth via email] (https://console.firebase.google.com/).
		* Crear una base de datos Firebase Storage [asignar a nuestro proyecto para almacenar las imagenes] (https://console.firebase.google.com/).
		* Obtener y actualizar en el archivo de configuración de la base de datos del proyecto [Cambiar datos de Auth de proyecto] (file:\js\init-firebase.js).
		* Descomprimir el proyecto en carpeta destino del computador.
		

///////////////////////////////////////////////////////////////////////////////////////////////

