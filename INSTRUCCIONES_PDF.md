# Instrucciones para Crear el PDF de Entrega

## 📄 Objetivo
Crear un PDF con imágenes de la construcción, ejecución y despliegue de la API RESTful dockerizada.

---

## Método 1: Usar Visual Studio Code (Recomendado)

### Instalar Extensión Markdown PDF

1. Abre Visual Studio Code
2. Ve a Extensions (Ctrl+Shift+X)
3. Busca "Markdown PDF" por yzane
4. Instala la extensión

### Generar el PDF

1. Abre el archivo `GUIA_DESPLIEGUE.md` en VS Code
2. Presiona `Ctrl+Shift+P` para abrir la paleta de comandos
3. Escribe "Markdown PDF: Export (pdf)"
4. Presiona Enter
5. El PDF se generará automáticamente en la misma carpeta

---

## Método 2: Usar un Editor en Línea

### Opción A: StackEdit
1. Ve a https://stackedit.io/
2. Click en "Start writing"
3. Copia y pega el contenido de `GUIA_DESPLIEGUE.md`
4. Click en el ícono de menú (☰) arriba a la derecha
5. Selecciona "Export to disk" → "As PDF"

### Opción B: Dillinger
1. Ve a https://dillinger.io/
2. Copia y pega el contenido de `GUIA_DESPLIEGUE.md`
3. Click en "Export As" → "PDF"

---

## Método 3: Usar Pandoc (Línea de Comandos)

### Instalar Pandoc
```bash
# Windows (con Chocolatey)
choco install pandoc

# O descargar desde: https://pandoc.org/installing.html
```

### Convertir a PDF
```bash
pandoc GUIA_DESPLIEGUE.md -o GUIA_DESPLIEGUE.pdf --pdf-engine=wkhtmltopdf
```

---

## 📸 Capturas de Pantalla Requeridas

Para completar el PDF, debes incluir capturas de pantalla de:

### 1. Construcción de la Imagen Docker
- Comando: `docker build -t apirestful:1.0 .`
- Captura: Output completo del build
- Ubicación en el PDF: Sección 2

### 2. Verificación de Imágenes
- Comando: `docker images apirestful`
- Captura: Lista de imágenes Docker
- Ubicación en el PDF: Sección 2

### 3. Ejecución con Docker Compose
- Comando: `docker-compose up -d --build`
- Captura: Output del comando
- Ubicación en el PDF: Sección 3

### 4. Estado de Contenedores
- Comando: `docker-compose ps`
- Captura: Contenedores corriendo
- Ubicación en el PDF: Sección 3

### 5. Logs de la Aplicación
- Comando: `docker-compose logs app`
- Captura: Logs mostrando la conexión exitosa
- Ubicación en el PDF: Sección 3

### 6. Prueba de la API (Navegador)
- URL: `http://localhost:3000/productos`
- Captura: Respuesta JSON en el navegador
- Ubicación en el PDF: Sección 5

### 7. Prueba con cURL
- Comando: `curl http://localhost:3000/productos`
- Captura: Output del comando
- Ubicación en el PDF: Sección 5

### 8. Despliegue en Play With Docker (IMPORTANTE)

#### Paso 1: Login en Play With Docker
- URL: https://labs.play-with-docker.com
- Captura: Pantalla de inicio

#### Paso 2: Nueva Instancia
- Captura: Terminal con instancia creada

#### Paso 3: Clonar Repositorio
```bash
git clone https://github.com/luisdie13/apirestful.git
cd apirestful
```
- Captura: Output del git clone

#### Paso 4: Crear .env
```bash
cat > .env << EOF
DB_USER=postgres
DB_PASSWORD=mysecretpassword
DB_DATABASE=apirestful
DB_HOST=db
DB_PORT=5432
PORT=3000
NODE_ENV=production
EOF
```
- Captura: Confirmación de creación del archivo

#### Paso 5: Docker Compose Up
```bash
docker-compose up -d --build
```
- Captura: Build y contenedores iniciados

#### Paso 6: Verificar Contenedores
```bash
docker-compose ps
```
- Captura: Contenedores corriendo

#### Paso 7: Logs
```bash
docker-compose logs app
```
- Captura: Logs mostrando "Servidor escuchando..."

#### Paso 8: Probar API en Play With Docker
```bash
curl http://localhost:3000/productos
```
- Captura: Respuesta JSON

#### Paso 9: URL Pública (si disponible)
- Captura: Botón "3000" en la interfaz de PWD
- Captura: API funcionando desde URL pública

---

## 📋 Estructura Sugerida del PDF Final

### Portada
- Título: "API RESTful con Docker - Despliegue y Documentación"
- Nombre del estudiante
- Curso: Node.js Avanzado
- Fecha
- Link del repositorio GitHub

### Índice
1. Información del Proyecto
2. Construcción de Imagen Docker
3. Ejecución Local
4. Despliegue en Play With Docker
5. Pruebas de Funcionalidad
6. Conclusiones

### Sección 1: Información del Proyecto
- Descripción breve
- Tecnologías utilizadas
- Estructura del proyecto
- Link a GitHub

### Sección 2: Construcción de Imagen Docker
- Contenido del Dockerfile
- **CAPTURA 1**: Comando docker build
- **CAPTURA 2**: Verificación de imagen creada
- Explicación breve

### Sección 3: Ejecución Local
- Contenido del docker-compose.yml
- **CAPTURA 3**: docker-compose up
- **CAPTURA 4**: docker-compose ps
- **CAPTURA 5**: Logs de la aplicación

### Sección 4: Despliegue en Play With Docker
- **CAPTURA 6**: Login en PWD
- **CAPTURA 7**: Nueva instancia
- **CAPTURA 8**: Git clone
- **CAPTURA 9**: Docker compose up en PWD
- **CAPTURA 10**: Contenedores corriendo en PWD
- **CAPTURA 11**: Logs en PWD
- **CAPTURA 12**: Prueba de API en PWD

### Sección 5: Pruebas de Funcionalidad
- **CAPTURA 13**: GET /productos en navegador
- **CAPTURA 14**: GET /productos con curl
- **CAPTURA 15**: POST /productos (crear producto)
- **CAPTURA 16**: PUT /productos/:id (actualizar)
- **CAPTURA 17**: DELETE /productos/:id (eliminar)

### Sección 6: Conclusiones
- Resumen del trabajo realizado
- Aprendizajes obtenidos
- Dificultades encontradas y soluciones

---

## 🎨 Consejos para las Capturas

1. **Usar herramientas de captura**: 
   - Windows: Snipping Tool o Win+Shift+S
   - Lightshot (https://app.prntscr.com/)
   - ShareX (https://getsharex.com/)

2. **Calidad de las capturas**:
   - Pantalla completa o ventana específica
   - Asegúrate de que el texto sea legible
   - Incluye la barra de comandos/URL cuando sea relevante

3. **Organización**:
   - Crea una carpeta `screenshots/` en tu proyecto
   - Nombra las imágenes de forma descriptiva:
     - `01-docker-build.png`
     - `02-docker-images.png`
     - `03-docker-compose-up.png`
     - etc.

4. **Anotaciones** (opcional):
   - Usa flechas o resaltados para señalar partes importantes
   - Herramientas: Greenshot, Snagit, o el editor de Windows

---

## 📤 Proceso de Entrega al GES

### 1. Verificar Repositorio GitHub
- Asegúrate de que todo esté actualizado en GitHub
- Verifica que el README.md sea claro
- Comprueba que el Dockerfile y docker-compose.yml estén presentes

### 2. Crear el PDF
- Usa uno de los métodos anteriores
- Incluye TODAS las capturas de pantalla
- Verifica que el PDF sea legible
- Tamaño recomendado: No más de 20MB

### 3. Subir al GES
- **Link de GitHub**: https://github.com/luisdie13/apirestful.git
- **Archivo PDF**: GUIA_DESPLIEGUE.pdf (con todas las capturas)

### 4. Verificación Final
- [ ] Link de GitHub funciona
- [ ] PDF se puede abrir correctamente
- [ ] Todas las capturas están incluidas y son legibles
- [ ] Dockerfile está en el repositorio
- [ ] docker-compose.yml está en el repositorio
- [ ] README.md tiene instrucciones claras

---

## ⚡ Comando Rápido para Capturas en Play With Docker

Puedes ejecutar todos los comandos de una vez y capturar cada paso:

```bash
#!/bin/bash
echo "=== CLONANDO REPOSITORIO ==="
git clone https://github.com/luisdie13/apirestful.git
cd apirestful

echo "=== CREANDO ARCHIVO .ENV ==="
cat > .env << EOF
DB_USER=postgres
DB_PASSWORD=mysecretpassword
DB_DATABASE=apirestful
DB_HOST=db
DB_PORT=5432
PORT=3000
NODE_ENV=production
EOF

echo "=== INICIANDO DOCKER COMPOSE ==="
docker-compose up -d --build

echo "=== ESPERANDO 10 SEGUNDOS ==="
sleep 10

echo "=== VERIFICANDO CONTENEDORES ==="
docker-compose ps

echo "=== VERIFICANDO LOGS ==="
docker-compose logs app

echo "=== PROBANDO API - GET /productos ==="
curl http://localhost:3000/productos

echo "=== PROBANDO API - POST /productos ==="
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Laptop Gaming","precio":1200.00,"descripcion":"Laptop de alto rendimiento"}'

echo "=== PROBANDO API - GET /productos (actualizado) ==="
curl http://localhost:3000/productos

echo "=== DESPLIEGUE COMPLETADO ==="
```

---

## 📧 Información de Contacto

Si tienes dudas, consulta:
- Documentación del proyecto en el README.md
- GitHub: https://github.com/luisdie13/apirestful.git

---

**¡Éxito con tu entrega!** 🚀
