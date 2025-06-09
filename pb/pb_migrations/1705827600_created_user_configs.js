/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    id: 'user_configs',
    name: 'user_configs',
    type: 'base',
    system: false,
    schema: [
      {
        system: false,
        id: 'user',
        name: 'user',
        type: 'relation',
        required: true,
        presentable: false,
        unique: true,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          minSelect: null,
          maxSelect: 1,
          displayFields: []
        }
      },
      {
        system: false,
        id: 'is_intelligent_mode',
        name: 'is_intelligent_mode',
        type: 'bool',
        required: false,
        presentable: false,
        unique: false,
        options: {
          default: false
        }
      },
      {
        system: false,
        id: 'meal_scene',
        name: 'meal_scene',
        type: 'select',
        required: false,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 1,
          values: ['家庭', '工作', '外出']
        }
      },
      {
        system: false,
        id: 'dietary_preferences',
        name: 'dietary_preferences',
        type: 'select',
        required: false,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 5,
          values: ['素食', '低碳水', '高蛋白', '低脂', '无糖', '无麸质', '低盐', '不吃辣', '不吃海鲜']
        }
      },
      {
        system: false,
        id: 'allergies',
        name: 'allergies',
        type: 'select',
        required: false,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 10,
          values: ['花生', '海鲜', '蛋类', '乳制品', '大豆', '坚果', '小麦', '芝麻']
        }
      },
      {
        system: false,
        id: 'health_goals',
        name: 'health_goals',
        type: 'select',
        required: false,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 3,
          values: ['减重', '增肌', '维持健康', '控制血糖', '降血压', '增强免疫力']
        }
      },
      {
        system: false,
        id: 'daily_calorie_target',
        name: 'daily_calorie_target',
        type: 'number',
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: 1000,
          max: 5000,
          noDecimal: true
        }
      },
      {
        system: false,
        id: 'meal_reminders',
        name: 'meal_reminders',
        type: 'json',
        required: false,
        presentable: false,
        unique: false,
        options: {}
      },
      {
        system: false,
        id: 'favorite_dishes',
        name: 'favorite_dishes',
        type: 'relation',
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: 'dishes',
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: ['name']
        }
      },
      {
        system: false,
        id: 'disliked_dishes',
        name: 'disliked_dishes',
        type: 'relation',
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: 'dishes',
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: ['name']
        }
      },
      {
        system: false,
        id: 'notification_settings',
        name: 'notification_settings',
        type: 'json',
        required: false,
        presentable: false,
        unique: false,
        options: {}
      }
    ],
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
    options: {}
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("user_configs");
  return app.delete(collection);
}); 