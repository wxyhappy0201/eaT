from typing import Optional
from sqlalchemy.orm import Session
from app.models.user_config import UserConfig
from app.schemas.user_config import UserConfigCreate, UserConfigUpdate

def get_user_config(db: Session, user_id: int) -> Optional[UserConfig]:
    """获取用户配置"""
    return db.query(UserConfig).filter(UserConfig.user_id == user_id).first()

def create_user_config(db: Session, config: UserConfigCreate) -> UserConfig:
    """创建用户配置"""
    db_config = UserConfig(
        user_id=config.user_id,
        is_intelligent_mode=config.is_intelligent_mode,
        meal_scene=config.meal_scene,
        preferences=config.preferences,
        nutrition_requirements=config.nutrition_requirements,
        settings=config.settings
    )
    db.add(db_config)
    db.commit()
    db.refresh(db_config)
    return db_config

def update_user_config(
    db: Session, 
    user_id: int, 
    config: UserConfigUpdate
) -> Optional[UserConfig]:
    """更新用户配置"""
    db_config = get_user_config(db, user_id)
    if not db_config:
        return None
        
    update_data = config.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_config, field, value)
    
    db.commit()
    db.refresh(db_config)
    return db_config

def delete_user_config(db: Session, user_id: int) -> bool:
    """删除用户配置"""
    db_config = get_user_config(db, user_id)
    if not db_config:
        return False
    
    db.delete(db_config)
    db.commit()
    return True 