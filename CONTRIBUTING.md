# 贡献指南

感谢你考虑为吃啥(Eat What?)项目做出贡献！

## 行为准则

本项目采用贡献者契约行为准则。通过参与本项目，你同意遵守其条款。

## 如何贡献

### 报告Bug
1. 使用Bug报告模板创建issue
2. 详细描述问题和复现步骤
3. 提供必要的系统信息和截图

### 提出新功能
1. 使用功能请求模板创建issue
2. 描述功能的使用场景和预期效果
3. 如果可能，提供实现建议

### 提交代码
1. Fork 项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 开发流程

### 分支命名
- 功能开发：`feature/功能名称`
- Bug修复：`fix/问题描述`
- 文档更新：`docs/更新内容`
- 性能优化：`optimize/优化内容`

### 提交信息规范
使用Angular提交规范：
- feat: 新功能
- fix: Bug修复
- docs: 文档更新
- style: 代码格式化
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

### 代码规范
- Python代码遵循PEP 8规范
- JavaScript代码遵循Airbnb规范
- 使用ESLint和Prettier进行代码格式化
- 所有新代码必须包含适当的注释
- 重要功能需要添加单元测试

## 开发环境设置

### 后端开发
```bash
# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 运行测试
pytest
```

### 前端开发
```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 运行测试
npm test
```

## 测试指南

### 单元测试
- 后端使用pytest
- 前端使用Jest
- 测试覆盖率要求：80%以上

### 集成测试
- 使用pytest-asyncio进行异步测试
- 使用TestClient进行API测试
- 使用React Testing Library进行组件测试

## 文档维护

- 所有新功能必须更新相关文档
- API变更需要更新API文档
- 重要的代码变更需要更新技术文档
- 用户界面变更需要更新用户指南

## 发布流程

1. 更新版本号
2. 更新CHANGELOG.md
3. 创建发布分支
4. 进行全面测试
5. 合并到主分支
6. 创建发布标签
7. 部署到生产环境

## 获取帮助

- 查看项目文档
- 在issue中搜索类似问题
- 在Discussions中提问
- 通过issue联系维护者

感谢你的贡献！ 