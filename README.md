# API RESTful con Node.js y Docker

Este proyecto es una API RESTful desarrollada con Node.js y Express.js, containerizada con Docker para facilitar su despliegue y ejecución en cualquier entorno.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 1.29 o superior)
- Git (opcional, para clonar el repositorio)

## 🚀 Instrucciones de Despliegue

### 1. Clonar el Repositorio (si aplica)

```bash
git clone <url-del-repositorio>
cd APIrestfulv1
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Database Configuration
DB_USER=postgres
DB_PASSWORD=mysecretpassword
DB_DATABASE=apirestful
DB_HOST=localhost
DB_PORT=5433

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 3. Construir y Ejecutar con Docker Compose

Docker Compose construirá automáticamente la imagen y levantará todos los servicios (base de datos y aplicación):

```bash
docker-compose up --build
```

Para ejecutar en segundo plano:

```bash
docker-compose up -d --build
```

### 4. Verificar que los Contenedores Están Corriendo

```bash
docker-compose ps
```

Deberías ver dos servicios corriendo:
- `apirestfulv1-db-1` (PostgreSQL)
- `apirestfulv1-app-1` (Node.js API)

## 🔧 Construcción Manual de la Imagen Docker

Si prefieres construir la imagen manualmente sin usar Docker Compose:

```bash
# Construir la imagen
docker build -t apirestful:1.0 .

# Ejecutar el contenedor
docker run -p 3000:3000 --env-file .env apirestful:1.0
```

## 📡 Probar la API

Una vez que los contenedores estén corriendo, la API estará disponible en:

```
http://localhost:3000
```

### Endpoints Disponibles

Prueba los endpoints con curl o Postman:

```bash
# GET - Obtener todos los productos
curl http://localhost:3000/productos

# GET - Obtener un producto por ID
curl http://localhost:3000/productos/1

# POST - Crear un nuevo producto
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Producto 1","precio":100,"descripcion":"Descripción del producto"}'

# PUT - Actualizar un producto
curl -X PUT http://localhost:3000/productos/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Producto Actualizado","precio":150,"descripcion":"Nueva descripción"}'

# DELETE - Eliminar un producto
curl -X DELETE http://localhost:3000/productos/1
```

## 🛑 Detener los Contenedores

```bash
# Detener los contenedores
docker-compose down

# Detener y eliminar volúmenes (base de datos)
docker-compose down -v
```

## 📁 Estructura del Proyecto

```
APIrestfulv1/
├── src/
│   ├── controllers/     # Controladores de las rutas
│   ├── database/        # Configuración de la base de datos
│   ├── middlewares/     # Middlewares personalizados
│   ├── routes/          # Definición de rutas
│   └── services/        # Lógica de negocio
├── tests/               # Tests unitarios
├── .dockerignore        # Archivos excluidos del build
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore           # Archivos ignorados por Git
├── app.js               # Configuración de Express
├── docker-compose.yml   # Orquestación de contenedores
├── Dockerfile           # Definición de la imagen Docker
├── index.js             # Punto de entrada de la aplicación
├── package.json         # Dependencias del proyecto
└── README.md            # Este archivo
```

## 🐳 Detalles del Dockerfile

El `Dockerfile` incluye:

- **Imagen base**: `node:18-alpine` (ligera y optimizada)
- **Instalación**: Solo dependencias de producción con `npm ci`
- **Puerto expuesto**: 3000
- **Comando de inicio**: `npm start`

### Características de Seguridad y Optimización:

1. **Multi-stage build ready**: Preparado para optimizaciones futuras
2. **.dockerignore**: Excluye archivos innecesarios (node_modules, tests, etc.)
3. **npm ci**: Instalación más rápida y determinista
4. **Alpine Linux**: Imagen base ligera y segura

## 🔍 Logs y Debugging

Ver logs de los contenedores:

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs app
docker-compose logs db

# Seguir los logs en tiempo real
docker-compose logs -f app
```

Acceder al contenedor en ejecución:

```bash
# Acceder al shell del contenedor de la app
docker-compose exec app sh

# Acceder a PostgreSQL
docker-compose exec db psql -U postgres -d apirestful
```

## 🧪 Ejecutar Tests

Los tests no se incluyen en la imagen de producción, pero puedes ejecutarlos localmente:

```bash
npm install
npm test
```

## 📝 Notas Adicionales

- El contenedor de la base de datos expone el puerto 5433 (en lugar de 5432) para evitar conflictos con PostgreSQL instalado localmente.
- Los datos de PostgreSQL se persisten en un volumen Docker llamado `postgres_data`.
- La aplicación Node.js se conecta a la base de datos usando el nombre del servicio `db` como hostname cuando se ejecuta con Docker Compose.
- Para desarrollo local sin Docker, asegúrate de cambiar `DB_HOST` a `localhost` en tu archivo `.env`.

## 🤝 Contribuir

Si deseas contribuir a este proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia ISC.

## ✨ Autor

Desarrollado como parte del curso de Node.js Avanzado.

---

**¡Gracias por usar esta API! Si tienes preguntas o problemas, no dudes en abrir un issue.**
