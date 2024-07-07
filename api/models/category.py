from pydantic import BaseModel

class Category(BaseModel):
    id: int
    category: str
    
    class Config:
        orm_mode = True