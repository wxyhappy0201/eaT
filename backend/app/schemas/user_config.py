from typing import Dict, Optional
from pydantic import BaseModel, Field

class UserConfigBase(BaseModel):
    """用户配置基础模型"""
    is_intelligent_mode: bool = Field(default=False, description="是否启用智能模式")
    meal_scene: Optional[str] = Field(None, description="用餐场景")
    preferences: Optional[Dict] = Field(default={}, description="用户偏好设置")
    nutrition_requirements: Optional[Dict] = Field(default={}, description="营养需求设置")
    settings: Optional[Dict] = Field(default={}, description="其他通用设置")

class UserConfigCreate(UserConfigBase):
    """创建用户配置的请求模型"""
    user_id: int = Field(..., description="用户ID")

class UserConfigUpdate(UserConfigBase):
    """更新用户配置的请求模型"""
    pass

class UserConfigInDB(UserConfigBase):
    """数据库中的用户配置模型"""
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

class UserConfigResponse(UserConfigInDB):
    """用户配置响应模型"""
    pass 