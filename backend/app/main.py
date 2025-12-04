import sys
from pathlib import Path

# Allow running this file directly by adding the parent directory to sys.path
if __name__ == "__main__":
    sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API}/openapi.json"
)

# Set all CORS enabled origins
# Set all CORS enabled origins
origins = [str(origin) for origin in settings.BACKEND_CORS_ORIGINS]
# Add default development origins if not specified
if not origins:
    origins = ["http://localhost:5173", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to QuanLyKhoaHoc API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Import and include routers here
from app.api.v1.api import api_router
app.include_router(api_router, prefix=settings.API)

if __name__ == "__main__":
    import uvicorn
    # Use the port from settings, fallback to 8000
    port = getattr(settings, "BACKEND_PORT", 8000)
    host = getattr(settings, "BACKEND_HOST", "127.0.0.1")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
