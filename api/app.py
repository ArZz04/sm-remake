
from fastapi import FastAPI
from routers import products

app = FastAPI(
    title="Obrador SM API", 
    description="Esta APIRest esta disenada para la obtencion y actualizacion de datos, especialmente precios de productos de OBRADOR SANTA MARIA", 
    version="0.1.0", 
    swagger_ui_parameters={ 
        "syntaxHighlight.theme": "obsidian",
        #"defaultModelsExpandDepth": -1 # Para que no se muestren los modelos por defecto
        } 
    )

app.include_router(products.router, prefix="/api")

@app.get("/api")
def read_root():
    return {"Hello": "World"}

# uvicorn main:app --reload