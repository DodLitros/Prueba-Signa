# Prueba Técnica - CRUD Registros de Marca (Flask + PostgreSQL + React)

Proyecto base listo para ejecutar el CRUD solicitado.

## Requisitos
- Python 3.10+
- Node 18+
- Docker (opcional, recomendado para levantar PostgreSQL)

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
- `POST   /api/brands` → crear (`{ name, description }`)
- `PUT    /api/brands/:id` → actualizar (`{ name, description }`)
- `DELETE /api/brands/:id` → eliminar

## Frontend (React + Vite)
1. Instalar y arrancar:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   UI en `http://localhost:5173`. Configura `VITE_API_URL` si tu backend no es `http://localhost:5000/api`.

## Despliegue sugerido
- **Backend:** Render/Railway/Heroku. Expón `/api`.
- **DB:** Neon/Render/Railway PostgreSQL.
- **Frontend:** Vercel/Netlify (definir `VITE_API_URL` como variable de entorno).

## Licencia
Uso libre para fines de la prueba.
