# Starmink Store API & Frontend


- **Backend**: API REST en Node.js + Express + Sequelize + MySQL.
- **Frontend**: React (Vite) para listar, crear, editar y eliminar productos.

---

## 1. Requisitos

- Node.js 18+ (recomendado LTS)
- npm (incluido con Node)
- MySQL en local (por ejemplo `localhost:3306`)

---

## 2. Configuración del backend (API)

El backend vive en la raíz del proyecto:

```bash
APIrest-starminkstore/
  app.js
  bin/www
  controllers/
  db/
  routes/
  package.json
  ...
```

### 2.1. Configurar base de datos

Editar `db/config/database.json` y asegurarse de que coincide con tu entorno de MySQL. Ejemplo:

```json
{
  "development": {
    "username": "root",
    "password": "tu_password",
    "database": "starmink_store_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Crear la base de datos vacía en MySQL (nombre debe coincidir con `database`):

```sql
CREATE DATABASE starmink_store_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2.2. Instalar dependencias del backend

Desde la raíz del proyecto:

```bash
npm install
```

Esto instala Express, Sequelize, sequelize-cli, MySQL2, etc.

### 2.3. Ejecutar migraciones y seeders

Asegúrate de que el archivo `.sequelizerc` apunte a las carpetas dentro de `db/` (ya viene configurado).

Desde la raíz:

```bash
# Crear tablas
npx sequelize db:migrate

# (Opcional) poblar la tabla products con datos de ejemplo
npx sequelize db:seed:all
```

### 2.4. Levantar el servidor backend

```bash
npm run dev
```

Esto levanta el servidor Express con Nodemon en:

- `http://localhost:3000`

#### Endpoints principales

Todos bajo `/products`:

- `GET /products` → Lista de productos.
  - Respuesta: `{ message, count, data: [ ...productos ] }`
- `GET /products/last` → Último producto creado.
- `GET /products/:id` → Detalle de un producto.
- `POST /products` → Crear producto.
  - Body JSON: `{ "name", "description", "price" }`
- `PUT /products/:id` → Actualizar producto (parcial o total).
- `DELETE /products/:id` → Eliminar producto.

La API usa CORS global (`app.use(cors())`) para permitir peticiones desde el frontend de Vite.

---

## 3. Configuración del frontend (Vite + React)

El frontend vive en la carpeta `front/`:

```bash
APIrest-starminkstore/
  front/
    index.html
    vite.config.js
    src/
      main.jsx
      App.jsx
      App.css
```

### 3.1. Instalar dependencias del frontend

Desde la carpeta `front/`:

```bash
cd front
npm install
```

### 3.2. Levantar el servidor de desarrollo del frontend

Con el backend corriendo en `http://localhost:3000`, en otra terminal:

```bash
cd front
npm run dev
```

Vite se levanta normalmente en:

- `http://localhost:5173`

### 3.3. Qué hace el frontend

La SPA minimalista en `src/App.jsx` permite:

- Ver todos los productos consumiendo `GET http://localhost:3000/products`.
- Crear un producto nuevo (`POST /products`).
- Editar un producto existente (`PUT /products/:id`).
- Eliminar un producto (`DELETE /products/:id`).

La interfaz es muy sencilla:

- Formulario con campos `Nombre`, `Descripción`, `Precio`.
- Botón para crear o guardar cambios.
- Lista de productos con botones **Editar** y **Borrar**.
- Estilo oscuro con acentos rosados inspirado en merchandising K‑Pop.

---

## 4. Scripts útiles

Desde la raíz del proyecto (backend):

```bash
npm run dev        # Levanta la API con nodemon
npm start          # (si está configurado) Levanta la API sin nodemon
```

Desde la carpeta `front/` (frontend):

```bash
npm run dev        # Modo desarrollo Vite
npm run build      # Build de producción
npm run preview    # Previsualizar build
```

---

## 5. Flujo típico para clonar y correr el proyecto

1. Clonar el repo:
   ```bash
   git clone <url-del-repo>
   cd APIrest-starminkstore
   ```
2. Instalar dependencias de backend:
   ```bash
   npm install
   ```
3. Configurar `db/config/database.json` y crear la base de datos en MySQL.
4. Correr migraciones (y opcionalmente seeders):
   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```
5. Levantar la API:
   ```bash
   npm run dev
   ```
6. En otra terminal, instalar y levantar el frontend:
   ```bash
   cd front
   npm install
   npm run dev
   ```
7. Abrir el navegador en `http://localhost:5173` para usar el panel visual, o usar Postman para probar la API directamente en `http://localhost:3000`.

---

## 6. Notas adicionales

- `node_modules/` está ignorado en `.gitignore`, tanto en la raíz como dentro de `front/` (si se utiliza un patrón como `**/node_modules`).
- Si el puerto 3000 ya está en uso, asegúrate de cerrar instancias previas de la API antes de correr `npm run dev`.
- Para cambiar la URL base del backend en el frontend, actualiza la constante `API_URL` en `front/src/App.jsx`.
