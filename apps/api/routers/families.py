
from fastapi import APIRouter, HTTPException, status
from db.DB_conn import session, Product, Family
from sqlalchemy.orm.exc import NoResultFound

from datetime import datetime as date

from models.family import Family as FamilyModel

router = APIRouter(prefix="/families",
                   tags=["/families"],
                   responses={status.HTTP_404_NOT_FOUND: {"message": "Not Found"}})

@router.get("/all", response_model=list[FamilyModel])
async def get_families():
    try:
        result = session.query(Family).all()

        for family in result:
            if family.last_changed:
                family.last_changed = date.strptime(family.last_changed, "%Y-%m-%d %H:%M:%S")
                
        return result
    except NoResultFound as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")