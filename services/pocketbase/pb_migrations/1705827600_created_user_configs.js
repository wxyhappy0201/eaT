/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    id: 'user_configs',
    name: 'user_configs',
    type: 'base',
    system: false,
    schema: [
      {
        id: 'is_intelligent_mode',
        name: 'is_intelligent_mode',
        type: 'bool',
        required: false,
        default: false,
      },
      {
        id: 'meal_scene',
        name: 'meal_scene',
        type: 'select',
        required: false,
        options: {
          values: ['家庭', '工作', '外出'],
        },
      },
      {
        id: 'preferences',
        name: 'preferences',
        type: 'json',
        required: false,
      },
      {
        id: 'nutrition_requirements',
        name: 'nutrition_requirements',
        type: 'json',
        required: false,
      },
      {
        id: 'settings',
        name: 'settings',
        type: 'json',
        required: false,
      },
      {
        id: 'user',
        name: 'user',
        type: 'relation',
        required: true,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
          minSelect: 1,
        },
      },
    ],
    indexes: ['CREATE UNIQUE INDEX idx_unique_user ON user_configs (user)'],
    listRule: '@request.auth.id = user.id',
    viewRule: '@request.auth.id = user.id',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id = user.id',
    deleteRule: '@request.auth.id = user.id',
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId('user_configs');

  return dao.deleteCollection(collection);
}); 