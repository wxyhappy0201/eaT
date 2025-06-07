from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import user_config
from app.schemas.user_config import (
    UserConfigCreate,
    UserConfigUpdate,
    UserConfigResponse
)

router = APIRouter()

@router.get("/{user_id}", response_model=UserConfigResponse)
def get_config(
    user_id: int,
    db: Session = Depends(deps.get_db)
) -> Any:
    """获取用户配置"""
    db_config = user_config.get_user_config(db, user_id)
    if not db_config:
        raise HTTPException(
            status_code=404,
            detail="用户配置不存在"
        )
    return db_config

@router.post("/", response_model=UserConfigResponse)
def create_config(
    *,
    db: Session = Depends(deps.get_db),
    config_in: UserConfigCreate
) -> Any:
    """创建用户配置"""
    db_config = user_config.get_user_config(db, config_in.user_id)
    if db_config:
        raise HTTPException(
            status_code=400,
            detail="用户配置已存在"
        )
    return user_config.create_user_config(db, config_in)

@router.put("/{user_id}", response_model=UserConfigResponse)
def update_config(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    config_in: UserConfigUpdate
) -> Any:
    """更新用户配置"""
    db_config = user_config.update_user_config(db, user_id, config_in)
    if not db_config:
        raise HTTPException(
            status_code=404,
            detail="用户配置不存在"
        )
    return db_config

@router.delete("/{user_id}")
def delete_config(
    user_id: int,
    db: Session = Depends(deps.get_db)
) -> Any:
    """删除用户配置"""
    if not user_config.delete_user_config(db, user_id):
        raise HTTPException(
            status_code=404,
            detail="用户配置不存在"
        )
    return {"message": "用户配置已删除"} 