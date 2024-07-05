from pydantic import BaseModel
from typing import Optional
from datetime import date

class Family(BaseModel):
    id: int
    name: str
    last_changed: Optional[date]  
    
    class Config:
        orm_mode = True