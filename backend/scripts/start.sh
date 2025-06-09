#!/bin/bash

# 启动Docker服务
echo "Starting Docker services..."
docker-compose up -d

# 等待PocketBase启动
echo "Waiting for PocketBase to start..."
sleep 10

# 激活Python虚拟环境
source venv/Scripts/activate

# 运行初始化脚本
echo "Initializing PocketBase collections..."
python src/scripts/init_pocketbase.py

echo "Setup completed!" 