from sqlalchemy import Column, Integer, String, Boolean, JSON
from .base import Base

class UserConfig(Base):
    """用户配置模型"""
    
    # 用户ID
    user_id = Column(Integer, unique=True, index=True, nullable=False)
    
    # 模式配置
    is_intelligent_mode = Column(Boolean, default=False)
    
    # 场景配置
    meal_scene = Column(String(50))  # 用餐场景：家庭、工作、外出等
    
    # 偏好配置
    preferences = Column(JSON)  # 存储用户的饮食偏好、忌口等
    
    # 营养需求
    nutrition_requirements = Column(JSON)  # 存储营养需求配置
    
    # 其他设置
    settings = Column(JSON)  # 存储其他通用设置 