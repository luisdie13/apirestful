#!/bin/bash
# Script de Despliegue Automatizado para Play With Docker
# API RESTful con Node.js y Docker
# Autor: Luis Diego

echo "=========================================="
echo "  API RESTful - Despliegue Automatizado  "
echo "=========================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== PASO 1: CLONANDO REPOSITORIO ===${NC}"
git clone https://github.com/luisdie13/apirestful.git
cd apirestful
echo -e "${GREEN}✓ Repositorio clonado${NC}"
echo ""

echo -e "${BLUE}=== PASO 2: CREANDO ARCHIVO .ENV ===${NC}"
cat > .env << EOF
DB_USER=postgres
DB_PASSWORD=mysecretpassword
DB_DATABASE=apirestful
DB_HOST=db
DB_PORT=5432
PORT=3000
NODE_ENV=production
EOF
echo -e "${GREEN}✓ Archivo .env creado${NC}"
cat .env
echo ""

echo -e "${BLUE}=== PASO 3: VERIFICANDO ARCHIVOS DOCKER ===${NC}"
ls -la Dockerfile docker-compose.yml
echo -e "${GREEN}✓ Archivos Docker encontrados${NC}"
echo ""

echo -e "${BLUE}=== PASO 4: INICIANDO DOCKER COMPOSE ===${NC}"
docker-compose up -d --build
echo -e "${GREEN}✓ Docker Compose iniciado${NC}"
echo ""

echo -e "${YELLOW}Esperando 15 segundos para que los servicios se inicialicen...${NC}"
sleep 15
echo ""

echo -e "${BLUE}=== PASO 5: VERIFICANDO CONTENEDORES ===${NC}"
docker-compose ps
echo ""

echo -e "${BLUE}=== PASO 6: VERIFICANDO LOGS DE LA APLICACIÓN ===${NC}"
docker-compose logs app
echo ""

echo -e "${BLUE}=== PASO 7: PROBANDO API - GET /productos ===${NC}"
curl -s http://localhost:3000/productos | json_pp 2>/dev/null || curl http://localhost:3000/productos
echo ""
echo ""

echo -e "${BLUE}=== PASO 8: PROBANDO API - POST /productos ===${NC}"
curl -s -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Laptop Gaming","precio":1200.00,"descripcion":"Laptop de alto rendimiento"}' | json_pp 2>/dev/null || \
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Laptop Gaming","precio":1200.00,"descripcion":"Laptop de alto rendimiento"}'
echo ""
echo ""

echo -e "${BLUE}=== PASO 9: PROBANDO API - GET /productos (actualizado) ===${NC}"
curl -s http://localhost:3000/productos | json_pp 2>/dev/null || curl http://localhost:3000/productos
echo ""
echo ""

echo -e "${BLUE}=== PASO 10: INFORMACIÓN DEL SISTEMA ===${NC}"
echo "Docker Version:"
docker --version
echo ""
echo "Docker Compose Version:"
docker-compose --version
echo ""

echo -e "${GREEN}=========================================="
echo "  ✓ DESPLIEGUE COMPLETADO EXITOSAMENTE  "
echo "==========================================${NC}"
echo ""
echo "La API está corriendo en: http://localhost:3000"
echo ""
echo "Endpoints disponibles:"
echo "  - GET    /productos       (Obtener todos los productos)"
echo "  - GET    /productos/:id   (Obtener un producto)"
echo "  - POST   /productos       (Crear un producto)"
echo "  - PUT    /productos/:id   (Actualizar un producto)"
echo "  - DELETE /productos/:id   (Eliminar un producto)"
echo ""
echo "Para ver logs en tiempo real:"
echo "  docker-compose logs -f app"
echo ""
echo "Para detener los servicios:"
echo "  docker-compose down"
echo ""
