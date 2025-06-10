export const provinces = [
  '北京市', '上海市', '天津市', '重庆市', 
  '河北省', '山西省', '辽宁省', '吉林省', 
  '黑龙江省', '江苏省', '浙江省', '安徽省', 
  '福建省', '江西省', '山东省', '河南省', 
  '湖北省', '湖南省', '广东省', '海南省', 
  '四川省', '贵州省', '云南省', '陕西省', 
  '甘肃省', '青海省', '台湾省', '内蒙古自治区', 
  '广西壮族自治区', '西藏自治区', '宁夏回族自治区', 
  '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'
];

export const tastePreferences = [
  '辣', '甜', '咸', '酸', '清淡', '重口味'
];

export const specialPreferences = [
  '健身', '怀孕', '坐月子', '减脂', '增肌'
];

export const mockRecipes = [
  {
    id: '1',
    type: '早餐',
    name: '香蕉燕麦粥',
    time: '15分钟',
    difficulty: '简单',
    imagePrompt: '香蕉燕麦粥，健康早餐，白色背景',
    steps: [
      '将燕麦片和水按1:2比例混合',
      '中小火煮5分钟，不断搅拌',
      '加入切片的香蕉',
      '煮至浓稠即可'
    ],
    ingredients: [
      { name: '燕麦片', amount: '50g' },
      { name: '香蕉', amount: '1根' },
      { name: '水', amount: '100ml' }
    ]
  },
  {
    id: '2',
    type: '午餐',
    name: '番茄炒蛋',
    time: '20分钟',
    difficulty: '简单',
    imagePrompt: '番茄炒蛋，家常菜，白色背景',
    steps: [
      '番茄切块，鸡蛋打散',
      '热油炒鸡蛋至凝固，盛出备用',
      '炒番茄至出汁',
      '加入鸡蛋翻炒均匀',
      '加盐调味'
    ],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '盐', amount: '适量' }
    ]
  },
  {
    id: '3',
    type: '晚餐',
    name: '清蒸鲈鱼',
    time: '25分钟',
    difficulty: '中等',
    imagePrompt: '清蒸鲈鱼，中式料理，白色背景',
    steps: [
      '鲈鱼洗净，两面切花刀',
      '鱼身抹盐，放姜片腌制10分钟',
      '水开后蒸8-10分钟',
      '淋上蒸鱼豉油',
      '撒上葱花，浇热油'
    ],
    ingredients: [
      { name: '鲈鱼', amount: '1条' },
      { name: '姜', amount: '3片' },
      { name: '葱', amount: '1根' },
      { name: '蒸鱼豉油', amount: '2勺' }
    ]
  }
];
  
export const mockIngredients = [
  // 生鲜区
  { name: '番茄', category: 'vegetable', amount: 2, unit: '个', section: 'fresh' },
  { name: '鸡蛋', category: 'egg', amount: 3, unit: '个', section: 'fresh' },
  { name: '鲈鱼', category: 'fish', amount: 1, unit: '条', section: 'fresh' },
  { name: '猪肉', category: 'meat', amount: 0.5, unit: 'kg', section: 'fresh' },
  { name: '青菜', category: 'vegetable', amount: 0.3, unit: 'kg', section: 'fresh' },
  
  // 冷藏区
  { name: '牛奶', category: 'dairy', amount: 1, unit: 'L', section: 'cold' },
  { name: '酸奶', category: 'dairy', amount: 2, unit: '盒', section: 'cold' },
  { name: '黄油', category: 'dairy', amount: 0.1, unit: 'kg', section: 'cold' },
  
  // 干货区
  { name: '燕麦片', category: 'grain', amount: 0.05, unit: 'kg', section: 'dry' },
  { name: '盐', category: 'seasoning', amount: 1, unit: '勺', section: 'dry' },
  { name: '蒸鱼豉油', category: 'seasoning', amount: 2, unit: '勺', section: 'dry' },
  { name: '面粉', category: 'grain', amount: 0.5, unit: 'kg', section: 'dry' }
];

export const sectionMap = {
  fresh: { name: '生鲜区', color: 'bg-red-100', icon: 'fa-carrot' },
  cold: { name: '冷藏区', color: 'bg-blue-100', icon: 'fa-snowflake' },
  dry: { name: '干货区', color: 'bg-amber-100', icon: 'fa-wheat-awn' }
};