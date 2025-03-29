from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import video


# =============== init app : ===============
app = FastAPI()

# ========= middelwares : ===================

# Définir les origines autorisées (Remplace par l'URL de ton frontend)
origins = [
    "http://localhost:5173",  # React en local
    "http://127.0.0.1:3000",
    "https://ton-site.com",  # Si tu déploies
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Autorise ces domaines
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autorise tous les headers
)

# ================== routers : =================
app.include_router(video.router)





