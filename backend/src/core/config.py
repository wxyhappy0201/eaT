from typing import List
import os
from pathlib import Path
from pydantic_settings import BaseSettings
from functools import lru_cache

# 获取项目根目录路径
ROOT_DIR = Path(__file__).resolve().parent.parent.parent.parent

class Settings(BaseSettings):
    # PocketBase配置
    POCKETBASE_URL: str
    POCKETBASE_ADMIN_EMAIL: str
    POCKETBASE_ADMIN_PASSWORD: str

    # Redis配置
    REDIS_HOST: str
    REDIS_PORT: int

    # 安全配置
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # CORS配置
    CORS_ORIGINS: List[str]

    # 环境配置
    DEBUG: bool
    ENVIRONMENT: str

    class Config:
        env_file = ROOT_DIR / ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings() 