# 启动Docker服务
Write-Host "Starting Docker services..."
docker-compose up -d

# 等待PocketBase启动
Write-Host "Waiting for PocketBase to start..."
Start-Sleep -Seconds 10

# 激活Python虚拟环境
Write-Host "Activating virtual environment..."
.\venv\Scripts\Activate

# 运行初始化脚本
Write-Host "Initializing PocketBase collections..."
python src/scripts/init_pocketbase.py

Write-Host "Setup completed!" 