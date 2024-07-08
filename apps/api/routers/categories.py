
from fastapi import APIRouter, HTTPException, status
from db.DB_conn import session, Product, Family, Category
from sqlalchemy.orm.exc import NoResultFound

from datetime import datetime as date

from models.category import Category as categoryModel

router = APIRouter(prefix="/categories",
                   tags=["/categories"],
                   responses={status.HTTP_404_NOT_FOUND: {"message": "Not Found"}})

@router.get("/all", response_model=list[categoryModel])
async def get_families():
    try:
        
        result = session.query(Category).all()
        
        return result
    except NoResultFound as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")