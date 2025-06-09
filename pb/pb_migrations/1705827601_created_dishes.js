/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    id: 'dishes',
    name: 'dishes',
    type: 'base',
    system: false,
    schema: [
      {
        system: false,
        id: 'name',
        name: 'name',
        type: 'text',
        required: true,
        presentable: true,
        unique: false,
        options: {
          min: 1,
          max: 100,
          pattern: ''
        }
      },
      {
        system: false,
        id: 'description',
        name: 'description',
        type: 'text',
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: null,
          max: 500,
          pattern: ''
        }
      },
      {
        system: false,
        id: 'category',
        name: 'category',
        type: 'select',
        required: true,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 1,
          values: ['主食', '肉类', '海鲜', '蔬菜', '汤类', '小吃', '甜点']
        }
      },
      {
        system: false,
        id: 'tags',
        name: 'tags',
        type: 'select',
        required: false,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 5,
          values: ['清淡', '辛辣', '酸甜', '咸鲜', '家常', '快手', '营养', '低脂', '高蛋白']
        }
      },
      {
        system: false,
        id: 'image',
        name: 'image',
        type: 'file',
        required: false,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
          thumbs: ['100x100', '300x300']
        }
      },
      {
        system: false,
        id: 'creator',
        name: 'creator',
        type: 'relation',
        required: true,
        presentable: false,
        unique: false,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: []
        }
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
  const collection = app.findCollectionByNameOrId("dishes");
  return app.delete(collection);
}); 