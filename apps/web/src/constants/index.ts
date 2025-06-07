// 用户配置相关常量
export const MEAL_SCENES = ['家庭', '工作', '外出'] as const;
export type MealScene = typeof MEAL_SCENES[number] | null;

export const CUISINE_TYPES = [
    '川菜',
    '粤菜',
    '苏菜',
    '浙菜',
    '闽菜',
    '湘菜',
    '鲁菜',
    '徽菜',
    '西餐',
    '日料',
    '韩餐',
    '东南亚'
] as const;

export const DIETARY_TYPES = [
    '素食',
    '低碳水',
    '高蛋白',
    '低脂',
    '生酮',
    '无麸质',
    '地中海'
] as const;

export const SPICINESS_LEVELS = [
    { value: 0, label: '不辣' },
    { value: 1, label: '微辣' },
    { value: 2, label: '小辣' },
    { value: 3, label: '中辣' },
    { value: 4, label: '大辣' },
    { value: 5, label: '特辣' }
] as const;

export const MEAL_SIZES = [
    { value: 'small', label: '小份' },
    { value: 'medium', label: '中份' },
    { value: 'large', label: '大份' }
] as const;

export const BUDGET_LEVELS = [
    { value: 'economic', label: '经济实惠' },
    { value: 'moderate', label: '中等消费' },
    { value: 'premium', label: '高端享受' }
] as const;

export const COOKING_TIMES = [
    { value: 'quick', label: '快速料理 (<30分钟)' },
    { value: 'normal', label: '日常烹饪 (30-60分钟)' },
    { value: 'elaborate', label: '精致美食 (>60分钟)' }
] as const;

export const COOKING_SKILLS = [
    { value: 'beginner', label: '入门' },
    { value: 'intermediate', label: '进阶' },
    { value: 'advanced', label: '大厨' }
] as const; 