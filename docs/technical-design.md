# 吃啥 (Eat What?) 技术设计文档

## 系统架构设计

### 1. 服务架构
```
后端服务 (Backend Service)
├── FastAPI 应用服务器
├── Celery 任务队列
└── 数据库服务

推荐服务 (Recommendation Service)
├── 规则引擎
├── 机器学习模型
└── 数据分析

前端应用 (Frontend Apps)
├── React Native 移动应用
└── React Web 应用
```

### 2. 数据库设计

#### 用户配置表 (User_Config)
```sql
CREATE TABLE user_config (
    id UUID PRIMARY KEY,
    mode VARCHAR(20) NOT NULL, -- 'smart' or 'manual'
    scene VARCHAR(20) NOT NULL, -- 'family' or 'personal'
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### 核心信息表 (Core_Info)
```sql
CREATE TABLE core_info (
    id UUID PRIMARY KEY,
    config_id UUID REFERENCES user_config(id),
    people_count INTEGER NOT NULL,
    age_range JSONB NOT NULL, -- [{"min": 0, "max": 3, "count": 1}, ...]
    portion_size VARCHAR(20) NOT NULL, -- 'small', 'medium', 'large'
    created_at TIMESTAMP
);
```

#### 扩展信息表 (Extended_Info)
```sql
CREATE TABLE extended_info (
    id UUID PRIMARY KEY,
    config_id UUID REFERENCES user_config(id),
    allergies TEXT[],
    location POINT,
    preferences JSONB,
    special_needs TEXT[],
    created_at TIMESTAMP
);
```

#### 菜品表 (Recipes)
```sql
CREATE TABLE recipes (
    id UUID PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    difficulty_level INTEGER,
    preparation_time INTEGER,
    cooking_time INTEGER,
    ingredients JSONB,
    steps TEXT[],
    nutrition_facts JSONB,
    tags TEXT[]
);
```

### 3. API 设计

#### 核心API
```python
# 配置相关
@router.post("/config/mode")
async def set_mode(mode: ModeEnum):
    return await config_service.set_mode(mode)

@router.post("/config/scene")
async def set_scene(scene: SceneEnum):
    return await config_service.set_scene(scene)

# 推荐相关
@router.post("/recommend/generate")
async def generate_recommendations(params: RecommendParams):
    return await recommend_service.generate(params)

@router.get("/recommend/daily")
async def get_daily_plan():
    return await recommend_service.get_daily_plan()

# 菜品相关
@router.get("/recipes/search")
async def search_recipes(query: RecipeQuery):
    return await recipe_service.search(query)

@router.get("/recipes/{recipe_id}/details")
async def get_recipe_details(recipe_id: UUID):
    return await recipe_service.get_details(recipe_id)
```

#### WebSocket API
```python
# 实时推荐更新
@app.websocket("/ws/recommendations")
async def recommendations_websocket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        recommendations = await get_real_time_recommendations(data)
        await websocket.send_json(recommendations)
```

### 4. 前端架构

#### React 组件结构
```typescript
// 组件目录结构
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── setup/
│   │   ├── ModeSelector.tsx
│   │   └── SceneSelector.tsx
│   └── features/
│       ├── recipe/
│       └── planning/
├── hooks/
│   ├── useConfig.ts
│   ├── useRecipes.ts
│   └── usePlanning.ts
├── services/
│   ├── api.ts
│   └── websocket.ts
└── store/
    ├── configSlice.ts
    └── planningSlice.ts
```

#### 状态管理
```typescript
// Redux Toolkit 配置
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    config: configReducer,
    recipes: recipesReducer,
    planning: planningReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
```

### 5. 后端服务实现

#### FastAPI 应用结构
```python
app/
├── api/
│   ├── config.py
│   ├── recipes.py
│   └── planning.py
├── core/
│   ├── config.py
│   └── security.py
├── models/
│   ├── config.py
│   └── recipe.py
├── services/
│   ├── config_service.py
│   └── recipe_service.py
└── main.py
```

#### Celery 任务队列
```python
# Celery 配置
celery = Celery(
    'app',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/1'
)

@celery.task
async def generate_weekly_plan(user_id: str):
    # 生成周计划的异步任务
    pass
```

### 6. 推荐系统实现

#### 规则引擎
```python
class RuleEngine:
    def __init__(self):
        self.rules = self.load_rules()
    
    def apply_rules(self, context: dict) -> List[Recipe]:
        matching_recipes = []
        for rule in self.rules:
            if rule.matches(context):
                matching_recipes.extend(rule.get_recipes())
        return self.rank_recipes(matching_recipes, context)
```

#### 推荐服务
```python
class RecommendationService:
    def __init__(self):
        self.rule_engine = RuleEngine()
        self.ml_model = MLModel()
    
    async def generate_recommendations(self, user_preferences: dict):
        # 首先使用规则引擎
        rule_based = await self.rule_engine.get_recommendations(user_preferences)
        
        # 如果有足够的用户数据，使用ML模型优化
        if self.has_sufficient_data(user_preferences):
            ml_based = await self.ml_model.optimize(rule_based, user_preferences)
            return ml_based
        return rule_based
```

### 7. 数据处理服务

#### 营养计算
```python
class NutritionCalculator:
    def calculate_meal_nutrition(self, recipes: List[Recipe], portions: dict):
        total_nutrition = defaultdict(float)
        for recipe, portion in zip(recipes, portions):
            for nutrient, amount in recipe.nutrition_facts.items():
                total_nutrition[nutrient] += amount * portion
        return dict(total_nutrition)
```

#### 食材管理
```python
class IngredientManager:
    def calculate_ingredients(self, meal_plan: MealPlan):
        shopping_list = defaultdict(float)
        for meal in meal_plan.meals:
            for ingredient, amount in meal.recipe.ingredients.items():
                shopping_list[ingredient] += amount * meal.portions
        return self.optimize_shopping_list(dict(shopping_list))
```

### 8. 前端实现

#### 核心页面
```typescript
// 页面结构
pages/
├── setup/
│   ├── ModeSelection.tsx
│   ├── SceneSelection.tsx
│   └── PreferencesSetup.tsx
├── planning/
│   ├── DailyPlan.tsx
│   ├── WeeklyPlan.tsx
│   └── ShoppingList.tsx
└── recipes/
    ├── RecipeList.tsx
    ├── RecipeDetail.tsx
    └── RecipeSearch.tsx
```

#### 状态管理
```typescript
// Redux Slices
interface PlanningState {
  currentPlan: MealPlan;
  weeklyPlan: WeeklyPlan;
  shoppingList: ShoppingList;
}

interface RecipesState {
  available: Recipe[];
  favorites: Recipe[];
  history: Recipe[];
}

interface ConfigState {
  mode: 'smart' | 'manual';
  scene: 'family' | 'personal';
  preferences: UserPreferences;
}
```

### 9. 部署架构

```yaml
# Docker Compose 配置
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/app
      - REDIS_URL=redis://redis:6379/0
  
  celery:
    build: ./backend
    command: celery -A app.worker worker -l info
    
  ai:
    build: ./ai
    ports:
      - "5000:5000"
    volumes:
      - ./models:/app/models

  db:
    image: postgres:13
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:6
    volumes:
      - redisdata:/data
```

### 10. 监控和日志

#### 日志配置
```python
# 日志配置
logging.config.dictConfig({
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'level': 'INFO'
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'app.log',
            'maxBytes': 1024 * 1024 * 100,
            'backupCount': 3
        }
    }
})
```

#### 性能监控
```python
# Prometheus 指标收集
from prometheus_client import Counter, Histogram

request_count = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint']
)

response_time = Histogram(
    'http_response_time_seconds',
    'HTTP response time in seconds',
    ['endpoint']
)
```

### 11. 测试策略

#### 后端测试
```python
# PyTest 测试用例
@pytest.mark.asyncio
async def test_recipe_recommendation():
    preferences = {
        "people_count": 4,
        "age_ranges": [{"min": 0, "max": 3, "count": 1}],
        "portion_size": "medium"
    }
    result = await recipe_service.recommend(preferences)
    assert len(result) > 0
    assert all(isinstance(r, Recipe) for r in result)
```

#### 前端测试
```typescript
// Jest + React Testing Library
describe('ModeSelector', () => {
  it('should switch between smart and manual modes', () => {
    const { getByRole } = render(<ModeSelector />);
    const smartButton = getByRole('button', { name: /智能模式/i });
    fireEvent.click(smartButton);
    expect(store.getState().config.mode).toBe('smart');
  });
});
```

## 灾备方案

### 数据备份
- 每日全量备份
- 实时增量备份
- 多地域数据复制

### 故障转移
- 服务器集群
- 负载均衡
- 自动故障检测和恢复 