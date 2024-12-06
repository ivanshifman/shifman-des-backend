# Entrega Final Coderhouse - Proyecto de E-commerce

La imagen de Docker del proyecto se encuentra en el siguiente enlace:

- [Imagen de Docker del proyecto](https://hub.docker.com/repository/docker/ivanshifman/ecommerce/general)

- [Link Railwaiy del proyecto](https://shifman-des-backend-production.up.railway.app/)

El proyecto presenta una aplicación de comercio electrónico desarrollada con Node.js, Express.js, MongoDB. 
Permite a los usuarios navegar por productos, agregarlos al carrito, y más.

## Características

- **Actualizaciones en Tiempo Real:** Utilizando Socket.io, la aplicación proporciona actualizaciones en tiempo real para la lista de productos y la gestión del carrito.
- **Gestión de Productos:** Los administradores pueden agregar, actualizar y eliminar productos. La validación de entrada garantiza que solo se acepten datos válidos.
- **Gestión de Carrito:** Los usuarios pueden agregar productos a su carrito, actualizar cantidades y eliminar elementos.
- **Autenticación y Autorización:** Implementado con Passport.js, tanto para autenticación local como JWT, junto con JWT propio para asegurar las rutas.
- **Validaciones:** Utiliza Joi para validar entradas y datos de usuario, garantizando que los datos sean correctos y seguros.
- **Notificaciones:** Integración con Nodemailer para el envío de correos electrónicos y Twilio para el envío de mensajes SMS.
- **Gestión de Entorno:** Uso de Commander para manejar configuraciones de desarrollo y producción.
- **Validación de Teléfonos:** Emplea libphonenumber-js y country-list para validar números de teléfono.
- **Manejo de Cookies:** Uso de CookieParser para guardar tokens de autenticación de manera segura.
- **Manejo de Errores:** El manejo de errores integral garantiza que los usuarios reciban comentarios apropiados por sus acciones.
- **Testing:** El proyecto utiliza **Supertest**, **Mocha** y **Chai** para realizar pruebas automatizadas de las rutas y funcionalidades de la API.
- **Logger:** Implementación de **Winston** para un registro detallado de eventos y errores en el sistema.
- **Seguridad:** Uso de **Helmet** para proteger la aplicación de vulnerabilidades comunes en las aplicaciones web.

## Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB
- **Actualizaciones en Tiempo Real:** Socket.io
- **Autenticación y Autorización:** Passport.js (Local y JWT), JWT propio
- **Validaciones:** Joi
- **Notificaciones:** Nodemailer, Twilio
- **Configuración:** Commander
- **Validación de Teléfonos:** libphonenumber-js, country-list
- **Manejo de Cookies:** CookieParser
- **Testing:** Supertest, Mocha, Chai
- **Logger:** Winston
- **Seguridad:** Helmet

### Autor

- Ivan Ezequiel Shifman

- Visita mi perfil en [LinkedIn](https://ar.linkedin.com/in/iv%C3%A1n-ezequiel-shifman-042b0726a)