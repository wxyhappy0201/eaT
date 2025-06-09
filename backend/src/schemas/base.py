from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class BaseSchema(BaseModel):
    id: Optional[str] = None
    created: Optional[datetime] = None
    updated: Optional[datetime] = None

    class Config:
        from_attributes = True 