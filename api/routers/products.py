from fastapi import APIRouter, HTTPException, status
from db.DB_conn import session, Product, Family
from sqlalchemy.orm.exc import NoResultFound

from datetime import datetime as date

from models.product import Product as ProductModel
from models.product import ProductUpdate as ProductUpdateModel

router = APIRouter(prefix="/products",
                   tags=["/products"],
                   responses={status.HTTP_404_NOT_FOUND: {"message": "Not Found"}})


# -----------------------------------| GETTERS |--------------------------------------------

@router.get('/all', response_model=list[ProductModel]) 
async def get_productos():
    try:
        # Ejemplo de consulta
        result = session.query(Product).all()

        return result
    except NoResultFound as e: 
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")
    
@router.get('/family/{family_id}', response_model=list[ProductModel])
async def get_product_filtered_by_family(family_id: int):
    try:

        result = session.query(Product).filter(Product.family_id == family_id).all()

        if not result:
            raise HTTPException(status_code=404, detail="Familia no encontrada")

        for family in result:
            if family.last_changed:
                family.last_changed = date.strptime(family.last_changed, "%Y-%m-%d %H:%M:%S")
                
        return result
    except NoResultFound as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")
    
@router.get('/category/{category_id}', response_model=list[ProductModel])
async def get_product_filtered_by_category(category_id: int):
    try:

        result = session.query(Product).filter(Product.category_id == category_id).all()

        if not result:
            raise HTTPException(status_code=404, detail="Categoria no encontrada")

        return result
    except NoResultFound as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.get('/byid/{product_id}', response_model=ProductModel)
async def get_product_by_id(product_id: int):
    try:
        result = session.query(Product).filter(Product.id == product_id).one()

        if not result:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        return result
    except NoResultFound as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.get('/search/{product_name}')
async def search_product_filtered(product_name: str):
    try:

        results = session.query(Product).filter(Product.name.like( f"%{product_name}%")).all()

        if not results:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        return results 
    except NoResultFound as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.get('/recent', response_model=list[ProductModel])
async def get_recent_products():
    try:
        # Ejemplo de consulta
        result = session.query(Product).order_by(Product.last_changed.desc()).limit(5).all()

        return result
    except NoResultFound as e: 
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

# -----------------------------------| POSTS |--------------------------------------------

@router.post('/update/{product_id}', response_model=ProductUpdateModel)
async def update_product(product_id: int, product: ProductUpdateModel):
    try:
        product_to_update = session.query(Product).filter(Product.id == product_id).one()

        product_to_update.name = product.name
        product_to_update.price = product.price
        product_to_update.format = product.format
        product_to_update.dots = product.dots

        # Obtener la fecha y hora actual y convertirla a cadena
        current_time = date.now().strftime("%Y-%m-%d %H:%M:%S")

        product_to_update.last_changed = current_time

        session.commit()
        session.refresh(product_to_update)

        return ProductModel.from_orm(product_to_update)
    except NoResultFound as e:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")