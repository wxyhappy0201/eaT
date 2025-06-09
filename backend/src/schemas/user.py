from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from .base import BaseSchema

class UserPreferences(BaseModel):
    """用户饮食偏好"""
    cuisine_types: List[str] = Field(default_factory=list, description="喜欢的菜系")
    allergies: List[str] = Field(default_factory=list, description="过敏食材")
    dietary_restrictions: List[str] = Field(default_factory=list, description="饮食限制")
    spiciness_level: int = Field(default=2, ge=0, le=4, description="接受的辣度等级(0-4)")
    preferred_cooking_time: int = Field(default=30, ge=0, description="期望的烹饪时间(分钟)")

class UserCreate(BaseModel):
    """用户创建模型"""
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    preferences: Optional[UserPreferences] = None

class UserUpdate(BaseModel):
    """用户更新模型"""
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    preferences: Optional[UserPreferences] = None

class UserInDB(BaseSchema):
    """数据库中的用户模型"""
    username: str
    email: EmailStr
    preferences: UserPreferences
    is_active: bool = True
    is_verified: bool = False

class User(BaseSchema):
    """用户响应模型"""
    username: str
    email: EmailStr
    preferences: UserPreferences
    is_active: bool
    is_verified: bool 