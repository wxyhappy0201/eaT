from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

from app.core.config import settings
from app.models.base import Base

# 导入所有模型，确保它们被注册到Base.metadata
from app.models.user_config import UserConfig

# this is the Alembic Config object
config = context.config

# 设置数据库URL
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# 解释配置文件中的日志记录配置
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# 添加 MetaData 对象
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """在"离线"模式下运行迁移。"""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """在"在线"模式下运行迁移。"""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online() 