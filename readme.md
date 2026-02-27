# BITACORA DEL PROYECTO

# HERRAMIENTAS BACK

gestor: mysql- maria db

express: framework node js => gestionar APIS usando protocolo http

node js: js standalone - instalado en mi pc --> en consola: node -v
nodemon : plugin para usar en desarrollo - no se USA en produccion
mysql2: gestionar las interacciones con la bd - orm (sequelize)
cors: plugin para la gestion de CORS
env: variables globales del proyecto (credenciales, rutas)

# HERRAMIENTAS FRONT

CSS: Framework Bootstrap
BUNDLER : Vite --(webpack)
vanilla js

## PASO A PASO BACKEND

- Iniciar el proyecto con node js - npm init
- instalar los paquetes requeridos : npm install nodemon mysql2 cors env express
- configurar el control de versiones del codigo: crear el .gitignore
- iniciar el seguimiento del repositorio: git init, git add .
- creamos el repo en la nube: github
- conectamos el repo de la nube con el repo local:
  git remote add origin https://github.com/WalterArias/inter_3064749.git
- hacemos la primer actualizacion local y remota:
  local: git commit . -m "inicio del proyecto"
  remota: git push -u origin master
- revision del package.json: verificar las dependencias
- modificamos el package para ejecucion del proyecto:
  "start": "node index.js",  este es modo produccion/despliegue
  "dev": "nodemon index.js", este es modo desarrollo o development

## codificacion del proyecto

- crear el archivo principal: index.js
- configurar los plugins : nodemon, cors, hacer la primer prueba
  npm run dev (modo desarrollador) npm start(modo produccion)

## creacion del modulo conexion a la base de datos

- importamos la libreria mysql2 y hacemos la conexion de acuerdo al ejemplo

## codificacion del modulo ciudadano


## IMPLEMENTACION DE ARQUITECTURA POR CAPAS (N-TIER)
CONTROLLER : Controlador del modulo, maneja la logica de peticiones y respuestas
ROUTES: Se encarga de construir los endpoints o rutas de la api, en ella podemos inyectar los middlewares
MODELS: Se encarga de la interaccion(consultas) con el SGBD, implementa la logica del negocio; 
CAPAS DE SOPORTE:
MIDDLEWARE: CAPA INTERMEDIA ENTRE EL CLIENTE Y LA API (ejemplo validar token, validar ip por cors)
HELPERS: Ayudas, ayudantes, clases o funciones reusables del sistema, por ejemplo un sistema de errores