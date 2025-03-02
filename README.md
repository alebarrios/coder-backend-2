# Programación Backend II: Diseño y Arquitectura Backend (comisión 70370)

## Entrega Final - Alejandro Barrios
Instrucciones para ejecutar el proyecto:
* Clonar repositorio: https://github.com/alebarrios/coder-backend-2.git
* Desde la raíz del proyecto, ejecutar comando: ```npm install```
* Dado que la aplicación se conecta a una MongoDB, es necesario crear un archivo llamado ```.env``` en la raíz del proyecto con las siguientes variables:
  * ```MONGO_USERNAME=tu_usuario```
  * ```MONGO_PASSWORD=tu_contraseña```
  * ```MONGO_DBNAME=nombre_de_tu_base_de_datos```
  * ```MONGO_CLUSTER_URL=tu_cluster.mongodb.net```
  * ```PORT=3000 (por default. No cambiar para evitar impacto en callback de Google)```
  * ```PERSISTENCE=MONGO (por default. No modificar)```
* Adicionalmente se deben configurar tres variables más:
  * ```SESSION_SECRET_KEY=clave secreta para jwt```
  * ```GOOGLE_CLIENT_ID=client_id para login/registro con Google```
  * ```GOOGLE_CLIENT_SECRET=clave secreta de Google Cloud```
* Es importante mencionar que esta entrega se basa en lo realizado para el módulo 1 de Backend, por lo tanto se espera que existan las collections products y carts.
* Se utilizan dos colecciones nuevas: users y tickets.
* Para correr el proyecto localmente, ejecutar: ```npm start``` o ```npm run dev```

## Dependencias
* **express**: Web Framework liviano para Node.js.
* **express-handlebars**: Handlebars view engine para Express.js.
* **socket.io**: Framework para utilizar Websockets.
* **mongoose**: Framework para conectar con MongoDB (Base de Datos).
* **mongoose-paginate-v2**: plugin de paginación en mongoose.
* **dotenv**: librería para proteger información sensitiva.
* **bcrypt**: Para hashear contraseñas.
* **connect-mongo**: Para utilizar MongoStore y guardar las sesiones en MongoDB.
* **cookie-parser**: Para leer cookies enviadas por el front-end.
* **express-session**: Para el manejo de sesiones on Express.
* **jsonwebtoken**: Para el uso de jwt.
* **passport**: Para utilizar autenticación con Passport.
* **passport-google-oauth2**: Para utilizar estrategia de autenticación de terceros con Google.
* **passport-jwt**: Para utilizar estrategia de autenticación con jwt.
* **passport-local**: Para utilizar estrategia de autenticación con usuario y contraseña.
* **uuid**: Para generar códigos autogenerados únicos.

## Dependencias (Dev)
* **nodemon**: Para reiniciar web server automáticamente al modificar el código fuente.
* **jest**: Javascript Testing Framework.
* **supertest**: Javascript HTTP Tester.
* **cross-env**: Para ejecutar scripts que utilizan variables de ambiente en diferentes plataformas (Windows, Linux)