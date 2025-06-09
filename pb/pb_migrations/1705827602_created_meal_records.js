/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    id: 'meal_records',
    name: 'meal_records',
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
        unique: false,
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
        id: 'dishes',
        name: 'dishes',
        type: 'relation',
        required: true,
        presentable: false,
        unique: false,
        options: {
          collectionId: 'dishes',
          cascadeDelete: false,
          minSelect: 1,
          maxSelect: null,
          displayFields: ['name']
        }
      },
      {
        system: false,
        id: 'meal_time',
        name: 'meal_time',
        type: 'date',
        required: true,
        presentable: false,
        unique: false,
        options: {
          min: "",
          max: ""
        }
      },
      {
        system: false,
        id: 'meal_type',
        name: 'meal_type',
        type: 'select',
        required: true,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 1,
          values: ['早餐', '午餐', '晚餐', '加餐']
        }
      },
      {
        system: false,
        id: 'rating',
        name: 'rating',
        type: 'number',
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: 1,
          max: 5,
          noDecimal: true
        }
      },
      {
        system: false,
        id: 'notes',
        name: 'notes',
        type: 'text',
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: null,
          max: 500,
          pattern: ''
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
  const collection = app.findCollectionByNameOrId("meal_records");
  return app.delete(collection);
}); 