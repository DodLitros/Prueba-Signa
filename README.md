# Prueba Técnica - CRUD Registros de Marca (Flask + PostgreSQL + React)

Proyecto base listo para ejecutar el CRUD solicitado.

## 🛠️ Tecnologías utilizadas
   Backend: Flask, SQLAlchemy, PostgreSQL, Docker

   Frontend: React, Vite, Framer Motion (animaciones), CSS vanilla. 

   Infraestructura: Docker Compose (para entorno local)

## Requisitos
- Python 3.10+
- Node 18+
- Docker 

## Backend (Flask)
1. Levantar base de datos con Docker:
   ```bash
   docker compose up -d
   ```
2. Crear entorno y correr API:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env  # o establece las variables de entorno equivalentes
   python app.py
   ```
   API disponible en `http://localhost:5000/api`.

### Endpoints
- `GET    /api/brands` → listar
- `GET    /api/brands/:id` → detalle
- `POST   /api/brands` → crear (`{ name, owner }`)
- `PUT    /api/brands/:id` → actualizar (`{ name, owner }`)
- `DELETE /api/brands/:id` → eliminar

## Frontend (React + Vite)
1. Instalar y arrancar:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```