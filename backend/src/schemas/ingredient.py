from typing import Optional, List
from pydantic import BaseModel, Field
from .base import BaseSchema
from enum import Enum

class IngredientCategory(str, Enum):
    """食材分类"""
    MEAT = "meat"  # 肉类
    VEGETABLE = "vegetable"  # 蔬菜
    FRUIT = "fruit"  # 水果
    SEAFOOD = "seafood"  # 海鲜
    DAIRY = "dairy"  # 乳制品
    GRAIN = "grain"  # 谷物
    SPICE = "spice"  # 调味料
    OTHER = "other"  # 其他

class StorageMethod(str, Enum):
    """存储方法"""
    ROOM_TEMP = "room_temperature"  # 室温
    REFRIGERATED = "refrigerated"  # 冷藏
    FROZEN = "frozen"  # 冷冻
    DRY = "dry"  # 干燥

class NutritionInfo(BaseModel):
    """营养信息"""
    calories: float = Field(default=0, ge=0, description="卡路里(每100g)")
    protein: float = Field(default=0, ge=0, description="蛋白质(g)")
    fat: float = Field(default=0, ge=0, description="脂肪(g)")
    carbohydrates: float = Field(default=0, ge=0, description="碳水化合物(g)")
    fiber: float = Field(default=0, ge=0, description="膳食纤维(g)")

class IngredientCreate(BaseModel):
    """食材创建模型"""
    name: str = Field(..., min_length=1, max_length=100)
    category: IngredientCategory
    storage_method: StorageMethod
    shelf_life_days: int = Field(..., gt=0, description="保质期(天)")
    nutrition: Optional[NutritionInfo] = None
    description: Optional[str] = Field(None, max_length=500)
    tips: Optional[str] = Field(None, max_length=500)
    seasonal_months: List[int] = Field(default_factory=list, description="当季月份")

class IngredientUpdate(BaseModel):
    """食材更新模型"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    category: Optional[IngredientCategory] = None
    storage_method: Optional[StorageMethod] = None
    shelf_life_days: Optional[int] = Field(None, gt=0)
    nutrition: Optional[NutritionInfo] = None
    description: Optional[str] = Field(None, max_length=500)
    tips: Optional[str] = Field(None, max_length=500)
    seasonal_months: Optional[List[int]] = None

class Ingredient(BaseSchema):
    """食材模型"""
    name: str
    category: IngredientCategory
    storage_method: StorageMethod
    shelf_life_days: int
    nutrition: NutritionInfo
    description: Optional[str] = None
    tips: Optional[str] = None
    seasonal_months: List[int] 