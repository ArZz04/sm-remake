from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Family(BaseModel):
    id: int
    name: str
    category_id : int
    last_changed: Optional[datetime]  
    
    class Config:
        orm_mode = True