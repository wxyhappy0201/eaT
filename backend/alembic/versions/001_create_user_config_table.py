"""创建用户配置表

Revision ID: 001
Revises: 
Create Date: 2024-01-20 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    # 创建用户配置表
    op.create_table(
        'userconfig',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('is_intelligent_mode', sa.Boolean(), nullable=True),
        sa.Column('meal_scene', sa.String(length=50), nullable=True),
        sa.Column('preferences', postgresql.JSONB(), nullable=True),
        sa.Column('nutrition_requirements', postgresql.JSONB(), nullable=True),
        sa.Column('settings', postgresql.JSONB(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id')
    )
    op.create_index(op.f('ix_userconfig_id'), 'userconfig', ['id'], unique=False)
    op.create_index(op.f('ix_userconfig_user_id'), 'userconfig', ['user_id'], unique=False)

def downgrade() -> None:
    # 删除用户配置表
    op.drop_index(op.f('ix_userconfig_user_id'), table_name='userconfig')
    op.drop_index(op.f('ix_userconfig_id'), table_name='userconfig')
    op.drop_table('userconfig') 