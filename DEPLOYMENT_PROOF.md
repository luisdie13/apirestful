# Prueba de Ejecución - API RESTful Dockerizada

## 📸 Evidencia del Despliegue

Este documento contiene las pruebas de que la aplicación Node.js ha sido correctamente dockerizada y está funcionando.

---

## 1. Construcción de la Imagen Docker

### Comando Ejecutado:
```bash
docker build -t apirestful:1.0 .
```

### Resultado:
```
[+] Building 24.6s (10/10) FINISHED                 docker:desktop-linux
 => [internal] load build definition from Dockerfile                0.0s
 => => transferring dockerfile: 534B                                0.0s
 => [internal] load metadata for docker.io/library/node:18-alpine   0.4s
 => [internal] load .dockerignore                                   0.0s
 => => transferring context: 206B                                   0.0s
 => [1/5] FROM docker.io/library/node:18-alpine@sha256:8d6421d663  21.5s
 => [internal] load build context                                   0.1s
 => => transferring context: 435.19kB                               0.1s
 => [2/5] WORKDIR /usr/src/app                                      0.2s
 => [3/5] COPY package*.json ./                                     0.0s
 => [4/5] RUN npm ci --only=production                              2.2s
 => [5/5] COPY . .                                                  0.0s
 => exporting to image                                              0.2s
 => => exporting layers                                             0.1s
 => => writing image sha256:027aec339d26938e4554a45d9df75ae15f318e  0.0s
 => => naming to docker.io/library/apirestful:1.0                   0.0s
```

✅ **Imagen construida exitosamente**

---

## 2. Verificación de la Imagen

### Comando Ejecutado:
```bash
docker images apirestful
```

### Resultado:
```
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
apirestful   1.0       027aec339d26   7 seconds ago   135MB
```

✅ **Imagen optimizada de solo 135MB** (gracias a Alpine Linux y .dockerignore)

---

## 3. Despliegue con Docker Compose

### Comando Ejecutado:
```bash
docker-compose up -d --build
```

### Resultado:
```
[+] Building 0.3s (11/11) FINISHED                  docker:desktop-linux
 => [app internal] load build definition from Dockerfile            0.0s
 => => transferring dockerfile: 534B                                0.0s
 => [app internal] load metadata for docker.io/library/node:18-alp  0.2s
 => [app internal] load .dockerignore                               0.0s
 => => transferring context: 206B                                   0.0s
 => [app internal] load build context                               0.0s
 => => transferring context: 687B                                   0.0s
 => [app 1/5] FROM docker.io/library/node:18-alpine@sha256:8d6421d  0.0s
 => CACHED [app 2/5] WORKDIR /usr/src/app                           0.0s
 => CACHED [app 3/5] COPY package*.json ./                          0.0s
 => CACHED [app 4/5] RUN npm ci --only=production                   0.0s
 => CACHED [app 5/5] COPY . .                                       0.0s
 => [app] exporting to image                                        0.0s

[+] Running 4/4
 ✔ Network apirestfulv1_app-network  Created
 ✔ Container apirestfulv1-db-1       Started
 ✔ Container apirestfulv1-app-1      Started
```

✅ **Contenedores iniciados correctamente**

---

## 4. Estado de los Contenedores

### Comando Ejecutado:
```bash
docker-compose ps
```

### Resultado:
```
NAME                 IMAGE                COMMAND                  SERVICE   CREATED          STATUS         PORTS
apirestfulv1-app-1   apirestfulv1-app     "docker-entrypoint.s…"   app      10 seconds ago   Up 6 seconds   0.0.0.0:3000->3000/tcp
apirestfulv1-db-1    postgres:14-alpine   "docker-entrypoint.s…"   db       10 seconds ago   Up 7 seconds   0.0.0.0:5433->5432/tcp
```

✅ **Dos servicios corriendo:**
- **apirestfulv1-app-1**: Aplicación Node.js (Puerto 3000)
- **apirestfulv1-db-1**: Base de datos PostgreSQL (Puerto 5433)

---

## 5. Logs de la Aplicación

### Comando Ejecutado:
```bash
docker-compose logs app
```

### Resultado:
```
app-1  |
app-1  | > apirestful@1.0.0 start
app-1  | > node index.js
app-1  |
app-1  | Servidor escuchando en el puerto 3000
app-1  | ✅ Conexión a la base de datos establecida.
```

✅ **Aplicación iniciada correctamente y conectada a la base de datos**

---

## 6. Arquitectura del Despliegue

```
┌─────────────────────────────────────────────────┐
│           Docker Network (app-network)          │
│                                                 │
│  ┌──────────────────┐    ┌──────────────────┐  │
│  │   PostgreSQL     │    │    Node.js App   │  │
│  │   Container      │◄───┤    Container     │  │
│  │                  │    │                  │  │
│  │  postgres:14     │    │  apirestful:1.0  │  │
│  │  Port: 5432      │    │  Port: 3000      │  │
│  └────────┬─────────┘    └────────┬─────────┘  │
│           │                       │             │
└───────────┼───────────────────────┼─────────────┘
            │                       │
      Host: 5433              Host: 3000
            │                       │
            └───────────┬───────────┘
                        │
                   localhost
```

---

## 7. Características Implementadas

### ✅ Dockerfile Robusto
- Imagen base: `node:18-alpine` (ligera y segura)
- Multi-layer caching optimizado
- Solo dependencias de producción instaladas
- Variables de entorno configuradas

### ✅ .dockerignore
- Excluye archivos innecesarios (tests, node_modules, .git, etc.)
- Reduce el tamaño de la imagen
- Mejora la velocidad de construcción

### ✅ Docker Compose
- Orquestación de múltiples servicios
- Red personalizada para comunicación entre contenedores
- Variables de entorno gestionadas
- Volúmenes persistentes para la base de datos
- Dependencias definidas (app espera a db)

### ✅ Documentación Completa
- README.md con instrucciones paso a paso
- Comandos de construcción y ejecución
- Ejemplos de uso de la API
- Solución de problemas

---

## 8. Pruebas de la API

La API está disponible en: **http://localhost:3000**

### Endpoints disponibles:
- `GET /productos` - Obtener todos los productos
- `GET /productos/:id` - Obtener un producto por ID
- `POST /productos` - Crear un nuevo producto
- `PUT /productos/:id` - Actualizar un producto
- `DELETE /productos/:id` - Eliminar un producto

---

## 9. Comandos Útiles

### Ver logs en tiempo real:
```bash
docker-compose logs -f app
```

### Detener los contenedores:
```bash
docker-compose down
```

### Reconstruir sin cache:
```bash
docker-compose up -d --build --force-recreate
```

### Acceder al shell del contenedor:
```bash
docker-compose exec app sh
```

---