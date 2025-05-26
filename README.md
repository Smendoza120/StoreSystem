# 🌐 Backend de StoreSystem (Express.js)

Este repositorio contiene la API RESTful que sirve como backend para el sistema de tienda, gestionando la lógica de negocio, la base de datos y la autenticación.

## ✨ Características

* API RESTful para la gestión de:
    * Usuarios (autenticación, registro, roles)
    * Productos (creación, lectura, actualización, eliminación)
    * Inventario (gestión de stock)
    * Ventas (registro de transacciones)
* Documentación de API con Swagger UI.
* Autenticación basada en tokens (JWT).

## 🛠️ Tecnologías Utilizadas

* **Node.js:** Entorno de ejecución de JavaScript.
* **Express.js:** Framework web para Node.js para construir APIs RESTful.
* **MongoDB:** Base de datos NoSQL (asumiendo que la estás usando, si es otra, modifícalo).
* **Mongoose:** ODM (Object Data Modeling) para MongoDB.
* **JSON Web Tokens (JWT):** Para la autenticación y autorización.
* **Swagger-jsdoc / Swagger-ui-express:** Para la documentación interactiva de la API.
* **Nodemon:** Para el reinicio automático del servidor durante el desarrollo.
* **dotenv:** Para la gestión de variables de entorno.
* **CORS:** Para habilitar la comunicación entre frontend y backend.

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js:** Versión 18 o superior (se recomienda la versión 20.x).
* **npm** o **Yarn** o **pnpm:** Gestor de paquetes de Node.js.
* **MongoDB:** Si lo ejecutas localmente. Si usas un servicio en la nube (como MongoDB Atlas), asegúrate de tener la URL de conexión.

## 🚀 Puesta en Marcha (Desarrollo Local)

Sigue estos pasos para levantar el backend en tu máquina local:

1.  **Clona el repositorio (si aún no lo has hecho):**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO_PRINCIPAL>
    cd <nombre-de-tu-proyecto-principal>/backend
    ```
    (Asegúrate de cambiar `<URL_DE_TU_REPOSITORIO_PRINCIPAL>` y `<nombre-de-tu-proyecto-principal>` por los valores correctos).

2.  **Instala las dependencias:**
    Navega al directorio `backend` y ejecuta tu gestor de paquetes preferido:
    ```bash
    cd backend
    npm install  # o yarn install o pnpm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz de la carpeta `backend` (al mismo nivel que `package.json`).
    Aquí se configuran variables como la URL de la base de datos, el puerto del servidor y la clave secreta para JWT.

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/nombre-de-tu-base-de-datos # O tu URL de MongoDB Atlas
    JWT_SECRET=tu_clave_secreta_super_segura_aqui
    CORS_ORIGIN=http://localhost:5173 # O la URL de tu frontend local
    ```
    **¡Importante!** `JWT_SECRET` debe ser una cadena de texto larga y compleja para asegurar la validez de los tokens. `CORS_ORIGIN` debe coincidir con la URL donde se ejecuta tu frontend. Si tu frontend está desplegado, también deberás añadir esa URL.

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev # o yarn dev o pnpm dev
    ```
    Esto iniciará el servidor Express con Nodemon, y la API estará disponible en `http://localhost:3000`. También generará la documentación de Swagger.

5.  **Accede a la documentación de la API (Swagger UI):**
    Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva de Swagger en:
    `http://localhost:3000/api-docs`

## ⚙️ Build para Producción (si aplica)

Para desplegar tu backend, generalmente no se requiere un "build" explícito como en el frontend, ya que Node.js ejecuta directamente los archivos JavaScript. Sin embargo, para entornos de producción en algunos servicios (como Vercel, si usas serverless functions), puedes necesitar un script específico o configuración.

El script `start` en `package.json` es el que usarías para iniciar el servidor en producción:

```bash
npm start # o yarn start o pnpm start
```

# 🚀 Frontend de StoreSystem (React + Vite)

Este repositorio contiene el código fuente del frontend de nuestra aplicación de sistema de tienda, construido con React y Vite.

## ✨ Características

* Interfaz de usuario moderna y responsiva.
* Integración con el API de backend para la gestión de productos, inventario, ventas y usuarios.
* Desarrollado con React 19, TypeScript y Material-UI para una experiencia de usuario robusta.

## 🛠️ Tecnologías Utilizadas

* **React 19:** Biblioteca de JavaScript para construir interfaces de usuario.
* **Vite:** Herramienta de construcción rápida para proyectos web modernos.
* **TypeScript:** Superset de JavaScript que añade tipado estático.
* **Material-UI:** Biblioteca de componentes React para un diseño consistente y atractivo.
* **Tailwind CSS:** Framework CSS para un desarrollo rápido y flexible.
* **React Router DOM v6:** Para la navegación en el lado del cliente.
* **Axios / Fetch API:** Para las comunicaciones con el backend.

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js:** Versión 18 o superior (se recomienda la versión 20.x).
* **npm** o **Yarn** o **pnpm:** Gestor de paquetes de Node.js.

## 🚀 Puesta en Marcha (Desarrollo Local)

Sigue estos pasos para levantar el proyecto en tu máquina local:

1.  **Clona el repositorio (si aún no lo has hecho):**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO_PRINCIPAL>
    cd <nombre-de-tu-proyecto-principal>/frontend
    ```
    (Asegúrate de cambiar `<URL_DE_TU_REPOSITORIO_PRINCIPAL>` y `<nombre-de-tu-proyecto-principal>` por los valores correctos).

2.  **Instala las dependencias:**
    Navega al directorio `frontend` y ejecuta tu gestor de paquetes preferido:
    ```bash
    cd frontend
    npm install  # o yarn install o pnpm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env.local` en la raíz de la carpeta `frontend` (al mismo nivel que `package.json`).
    Añade la URL base de tu API de backend. Si estás ejecutando el backend localmente, será:
    ```env
    VITE_API_BASE_URL=http://localhost:3000
    ```
    Si tu backend está desplegado en Vercel, usa la URL de Vercel (ejemplo):
    ```env
    VITE_API_BASE_URL=[https://store-system-nu.vercel.app](https://store-system-nu.vercel.app)
    ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev  # o yarn dev o pnpm dev
    ```
    Esto iniciará el servidor de desarrollo de Vite, y la aplicación estará disponible en `http://localhost:5173` (o un puerto similar).

5.  **Abre tu navegador:**
    Visita `http://localhost:5173` para ver la aplicación funcionando.

## ⚙️ Build para Producción

Para crear una versión optimizada para producción:

```bash
npm run build # o yarn build o pnpm build