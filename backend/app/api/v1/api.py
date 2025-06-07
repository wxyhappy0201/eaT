from fastapi import APIRouter
from app.api.v1.endpoints import user_config

api_router = APIRouter()

# 注册用户配置路由
api_router.include_router(
    user_config.router,
    prefix="/user-config",
    tags=["user-config"]
) 