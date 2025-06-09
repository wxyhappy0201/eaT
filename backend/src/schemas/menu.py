from typing import Optional, List, Dict
from pydantic import BaseModel, Field
from datetime import datetime, date
from .base import BaseSchema
from enum import Enum

class MealType(str, Enum):
    """餐食类型"""
    BREAKFAST = "breakfast"  # 早餐
    LUNCH = "lunch"  # 午餐
    DINNER = "dinner"  # 晚餐
    SNACK = "snack"  # 零食

class MenuRecipe(BaseModel):
    """菜单中的食谱"""
    recipe_id: str
    servings: int = Field(default=1, gt=0)
    notes: Optional[str] = None

class DailyMenu(BaseModel):
    """每日菜单"""
    date: date
    meals: Dict[MealType, List[MenuRecipe]]
    notes: Optional[str] = None

class MenuCreate(BaseModel):
    """菜单创建模型"""
    user_id: str
    name: str = Field(..., min_length=1, max_length=100)
    start_date: date
    end_date: date
    daily_menus: List[DailyMenu]
    description: Optional[str] = Field(None, max_length=500)
    tags: List[str] = Field(default_factory=list)

class MenuUpdate(BaseModel):
    """菜单更新模型"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    daily_menus: Optional[List[DailyMenu]] = None
    description: Optional[str] = Field(None, max_length=500)
    tags: Optional[List[str]] = None

class Menu(BaseSchema):
    """菜单模型"""
    user_id: str
    name: str
    start_date: date
    end_date: date
    daily_menus: List[DailyMenu]
    description: Optional[str] = None
    tags: List[str]
    is_template: bool = False
    total_recipes: int = 0
    estimated_cost: Optional[float] = None 