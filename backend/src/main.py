from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import get_settings

settings = get_settings()

app = FastAPI(
    title="吃啥 API",
    description="智能饮食推荐系统API",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "欢迎使用吃啥API！",
        "version": "1.0.0",
        "status": "running"
    } 