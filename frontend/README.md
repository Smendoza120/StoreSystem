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
```