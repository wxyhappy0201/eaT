# 吃啥 (Eat What?) 🍳

> "今天吃啥呢？" - 可能是人类历史上最难回答的问题了！

## 😩 你是否也遇到过这些烦恼？

### 🤔 "今天吃什么"永远是个难题
- 每天中午都要纠结半天要吃什么
- 老公或者老婆问"想吃啥"，脑子瞬间一片空白
- 周末想给家人露一手，但不知道该做什么好
- 天天吃一样的，感觉生活好单调啊

### 🛒 买菜总是很头疼
- 上周买的青菜又坏掉了，好浪费啊
- 食材买少了不够吃，买多了又怕放坏
- 去超市像无头苍蝇，最后还是买一堆零食回来
- 冰箱里囤了一堆食材，但就是找不到合适的搭配


### 🥗 想吃得健康，但又怕太麻烦
- 营养均衡太复杂了，光想就头大
- 减肥期间不知道吃什么才能既饱腹又低卡
- 家里有老人和小孩，每顿都要考虑不同人的需求
- 想尝试新的菜品，但不知道从何下手
- 平时上班累得要死，处理食材就要花费半小时

## 🎉 别担心，有我们帮你！

"吃啥"不仅仅是一个APP，更是你的私人饮食管家！我们是这样解决这些问题的：

### 🤖 智能推荐，再也不用纠结
- **场景智能**：上班族的快手午餐、家庭聚餐的暖心晚餐、约会的精致料理，我们都帮你想好了
- **个性定制**：喜欢川菜的辣、爱吃面食、海鲜过敏...统统记下来，推荐更合你胃口
- **循环不重样**：智能排菜算法，让你每周都能尝试新花样

### 📝 精准采购清单
- **刚刚好的量**：2个人的早餐、4口之家的晚餐，食材用量精准计算
- **不浪费**：根据你冰箱里的食材推荐菜品，让每一样食材都物尽其用
- **省钱攻略**：当季食材推荐，价格预估参考，让你买菜更精明
- **没时间**： 周末提前处理好可存储类食材，减轻每日做饭负担

### 💪 健康生活好帮手
- **营养均衡**：每餐营养成分一目了然，荤素搭配恰到好处
- **特殊需求**：减脂期、增肌期、孕期...不同阶段的饮食建议都有
- **家人关怀**：老人、小孩、上班族，每个人的营养需求都照顾到

## 🚀 快速开始

想体验这些功能吗？现在就开始吧！

## 项目愿景

通过智能推荐和个性化配置，为用户提供高效、便利、健康、美味的饮食解决方案，让美好生活触手可及。

## 核心功能

### 1. 智能推荐
- 基于场景的饮食推荐（家庭、工作、外出等）
- 考虑营养均衡的膳食规划
- 个性化的口味适配

### 2. 购物清单
- 智能生成购物清单
- 食材用量精确计算
- 余量管理和使用建议

### 3. 健康管理
- 营养摄入追踪
- 饮食习惯分析
- 健康建议生成

## 技术架构

### 后端
- Python 3.8+
- FastAPI
- PostgreSQL
- Redis
- Celery

### 前端
- React Native (移动端)
- React + Vite (Web端)
- Redux Toolkit
- Material UI / Ant Design

## 项目结构

```
eat-what/
├── frontend/                # 前端应用
│   ├── mobile/             # React Native移动应用
│   │   ├── src/           # 源代码
│   │   ├── assets/        # 静态资源
│   │   └── tests/         # 测试用例
│   └── web/               # React Web应用
│       ├── src/           # 源代码
│       ├── public/        # 公共资源
│       └── tests/         # 测试用例
│
├── backend/                # 后端服务
│   ├── src/               # 源代码
│   │   ├── api/          # API接口定义
│   │   ├── core/         # 核心业务逻辑
│   │   ├── models/       # 数据模型
│   │   ├── services/     # 服务层
│   │   └── utils/        # 工具函数
│   ├── tests/            # 测试用例
│   └── alembic/          # 数据库迁移
│
├── services/              # 微服务
│   ├── pocketbase/       # PocketBase服务
│   ├── ml/               # 机器学习服务
│   └── api/              # API网关服务
│
├── pb_data/              # PocketBase数据
├── pb_migrations/        # PocketBase迁移
│
├── docs/                 # 项目文档
│   ├── technical-design.md  # 技术设计文档
│   └── user-flow.md        # 用户流程文档
│
└── scripts/             # 工具脚本
    ├── deploy/         # 部署脚本
    └── dev/            # 开发辅助脚本
```

### 目录说明

#### 前端 (frontend/)
- `mobile/`: React Native移动应用
  - `src/`: 源代码，包含组件、页面、状态管理等
  - `assets/`: 图片、字体等静态资源
  - `tests/`: 单元测试和集成测试
- `web/`: React Web应用
  - `src/`: 源代码
  - `public/`: 静态资源
  - `tests/`: 测试用例

#### 后端 (backend/)
- `src/`: 源代码目录
  - `api/`: RESTful API接口定义
  - `core/`: 核心业务逻辑实现
  - `models/`: 数据模型定义
  - `services/`: 服务层实现
  - `utils/`: 通用工具函数
- `tests/`: 测试用例
- `alembic/`: 数据库迁移文件

#### 微服务 (services/)
- `pocketbase/`: PocketBase服务，负责数据存储和基础认证
- `ml/`: 机器学习服务，提供智能推荐功能
- `api/`: API网关服务，统一管理API路由和认证

#### 数据存储
- `pb_data/`: PocketBase数据存储
- `pb_migrations/`: PocketBase数据迁移文件

#### 文档 (docs/)
- `technical-design.md`: 系统架构和技术设计文档
- `user-flow.md`: 用户流程和功能说明文档

#### 脚本 (scripts/)
- `deploy/`: 部署相关脚本
- `dev/`: 开发环境配置脚本

## 开发指南

### 环境要求
- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- Redis 6+

### 本地开发
1. 克隆仓库
```bash
git clone https://github.com/yourusername/eat-what.git
cd eat-what
```

2. 后端设置
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. 前端设置
```bash
cd frontend/web
npm install
npm run dev
```

## 版本管理

我们使用[语义化版本](https://semver.org/)进行版本控制：
- MAJOR.MINOR.PATCH
- 主版本号：不兼容的API修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

## 反馈收集

我们通过以下方式收集用户反馈：
1. GitHub Issues：功能建议和问题报告
2. 用户调研：定期进行问卷调查
3. 应用内反馈：集成的反馈功能
4. 数据分析：用户行为分析

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情 