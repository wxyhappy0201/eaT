from typing import Optional, List, Dict
from pydantic import BaseModel, Field, HttpUrl
from .base import BaseSchema
from enum import Enum

class DifficultyLevel(str, Enum):
    """难度等级"""
    EASY = "easy"  # 简单
    MEDIUM = "medium"  # 中等
    HARD = "hard"  # 困难

class CuisineType(str, Enum):
    """菜系类型"""
    CHINESE = "chinese"  # 中餐
    SICHUAN = "sichuan"  # 川菜
    CANTONESE = "cantonese"  # 粤菜
    JAPANESE = "japanese"  # 日料
    KOREAN = "korean"  # 韩餐
    WESTERN = "western"  # 西餐
    OTHER = "other"  # 其他

class RecipeIngredient(BaseModel):
    """食谱中的食材"""
    ingredient_id: str
    amount: float
    unit: str
    notes: Optional[str] = None

class CookingStep(BaseModel):
    """烹饪步骤"""
    order: int
    description: str
    image_url: Optional[HttpUrl] = None
    duration_minutes: Optional[int] = None
    tips: Optional[str] = None

class RecipeCreate(BaseModel):
    """食谱创建模型"""
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., max_length=500)
    cuisine_type: CuisineType
    difficulty: DifficultyLevel
    prep_time: int = Field(..., gt=0, description="准备时间(分钟)")
    cooking_time: int = Field(..., gt=0, description="烹饪时间(分钟)")
    servings: int = Field(..., gt=0, description="份量")
    ingredients: List[RecipeIngredient]
    steps: List[CookingStep]
    tags: List[str] = Field(default_factory=list)
    image_url: Optional[HttpUrl] = None
    video_url: Optional[HttpUrl] = None
    tips: Optional[str] = None
    calories_per_serving: Optional[float] = Field(None, ge=0)

class RecipeUpdate(BaseModel):
    """食谱更新模型"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    cuisine_type: Optional[CuisineType] = None
    difficulty: Optional[DifficultyLevel] = None
    prep_time: Optional[int] = Field(None, gt=0)
    cooking_time: Optional[int] = Field(None, gt=0)
    servings: Optional[int] = Field(None, gt=0)
    ingredients: Optional[List[RecipeIngredient]] = None
    steps: Optional[List[CookingStep]] = None
    tags: Optional[List[str]] = None
    image_url: Optional[HttpUrl] = None
    video_url: Optional[HttpUrl] = None
    tips: Optional[str] = None
    calories_per_serving: Optional[float] = Field(None, ge=0)

class Recipe(BaseSchema):
    """食谱模型"""
    name: str
    description: str
    cuisine_type: CuisineType
    difficulty: DifficultyLevel
    prep_time: int
    cooking_time: int
    servings: int
    ingredients: List[RecipeIngredient]
    steps: List[CookingStep]
    tags: List[str]
    image_url: Optional[HttpUrl] = None
    video_url: Optional[HttpUrl] = None
    tips: Optional[str] = None
    calories_per_serving: Optional[float] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    reviews_count: int = 0 