
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, families, categories


app = FastAPI(
    title="Obrador SM API", 
    description="Esta APIRest esta disenada para la obtencion y actualizacion de datos, especialmente precios de productos de OBRADOR SANTA MARIA", 
    version="0.1.0", 
    swagger_ui_parameters={ 
        "syntaxHighlight.theme": "obsidian",
        #"defaultModelsExpandDepth": -1 # Para que no se muestren los modelos por defecto
        } 
    )

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api")
app.include_router(families.router, prefix="/api")
app.include_router(categories.router, prefix="/api")

@app.get("/api")
def read_root():
    return {"Hello": "World"}

# uvicorn main:app --reload