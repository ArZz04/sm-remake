from pydantic import BaseModel
from typing import Optional
from datetime import date

class Product(BaseModel):
    id: int
    name: str
    price: float
    family_id: int
    format: str
    dots: int
    last_changed: str
    active: int

    class Config:
        orm_mode = True

class ProductUpdate(BaseModel):
    #id: int
    name: str
    price: float
    #family_id: int
    format: str
    dots: int
    #last_changed: str // no es necesario ya que se actualiza automaticamente
    #active: int

    class Config:
        orm_mode = True