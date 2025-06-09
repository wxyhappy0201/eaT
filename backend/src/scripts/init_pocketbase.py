import requests
import json
from typing import Dict, Any
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

class PocketBaseInit:
    def __init__(self):
        self.base_url = os.getenv("POCKETBASE_URL", "http://127.0.0.1:8090")
        self.admin_email = os.getenv("POCKETBASE_ADMIN_EMAIL")
        self.admin_password = os.getenv("POCKETBASE_ADMIN_PASSWORD")
        self.admin_token = None

    def _get_admin_token(self) -> str:
        """获取管理员token"""
        if not self.admin_token:
            response = requests.post(
                f"{self.base_url}/api/admins/auth-with-password",
                json={
                    "email": self.admin_email,
                    "password": self.admin_password
                }
            )
            response.raise_for_status()
            self.admin_token = response.json()["token"]
        return self.admin_token

    def _create_collection(self, collection_data: Dict[str, Any]) -> None:
        """创建集合"""
        headers = {"Authorization": f"Admin {self._get_admin_token()}"}
        response = requests.post(
            f"{self.base_url}/api/collections",
            headers=headers,
            json=collection_data
        )
        if response.status_code == 400 and "already exists" in response.text:
            print(f"Collection {collection_data['name']} already exists")
        else:
            response.raise_for_status()
            print(f"Created collection {collection_data['name']}")

    def create_users_collection(self):
        """创建用户集合"""
        collection_data = {
            "name": "users",
            "type": "auth",
            "schema": [
                {
                    "name": "username",
                    "type": "text",
                    "required": True,
                    "unique": True,
                    "options": {
                        "min": 3,
                        "max": 50
                    }
                },
                {
                    "name": "preferences",
                    "type": "json",
                    "required": False
                },
                {
                    "name": "is_active",
                    "type": "bool",
                    "required": True,
                    "default": True
                },
                {
                    "name": "is_verified",
                    "type": "bool",
                    "required": True,
                    "default": False
                }
            ]
        }
        self._create_collection(collection_data)

    def create_ingredients_collection(self):
        """创建食材集合"""
        collection_data = {
            "name": "ingredients",
            "schema": [
                {
                    "name": "name",
                    "type": "text",
                    "required": True,
                    "unique": True,
                    "options": {
                        "min": 1,
                        "max": 100
                    }
                },
                {
                    "name": "category",
                    "type": "select",
                    "required": True,
                    "options": {
                        "values": ["meat", "vegetable", "fruit", "seafood", "dairy", "grain", "spice", "other"]
                    }
                },
                {
                    "name": "storage_method",
                    "type": "select",
                    "required": True,
                    "options": {
                        "values": ["room_temperature", "refrigerated", "frozen", "dry"]
                    }
                },
                {
                    "name": "shelf_life_days",
                    "type": "number",
                    "required": True,
                    "options": {
                        "min": 1
                    }
                },
                {
                    "name": "nutrition",
                    "type": "json",
                    "required": False
                },
                {
                    "name": "description",
                    "type": "text",
                    "required": False,
                    "options": {
                        "max": 500
                    }
                },
                {
                    "name": "tips",
                    "type": "text",
                    "required": False,
                    "options": {
                        "max": 500
                    }
                },
                {
                    "name": "seasonal_months",
                    "type": "json",
                    "required": False
                }
            ]
        }
        self._create_collection(collection_data)

    def create_recipes_collection(self):
        """创建食谱集合"""
        collection_data = {
            "name": "recipes",
            "schema": [
                {
                    "name": "name",
                    "type": "text",
                    "required": True,
                    "options": {
                        "min": 1,
                        "max": 100
                    }
                },
                {
                    "name": "description",
                    "type": "text",
                    "required": True,
                    "options": {
                        "max": 500
                    }
                },
                {
                    "name": "cuisine_type",
                    "type": "select",
                    "required": True,
                    "options": {
                        "values": ["chinese", "sichuan", "cantonese", "japanese", "korean", "western", "other"]
                    }
                },
                {
                    "name": "difficulty",
                    "type": "select",
                    "required": True,
                    "options": {
                        "values": ["easy", "medium", "hard"]
                    }
                },
                {
                    "name": "prep_time",
                    "type": "number",
                    "required": True,
                    "options": {
                        "min": 0
                    }
                },
                {
                    "name": "cooking_time",
                    "type": "number",
                    "required": True,
                    "options": {
                        "min": 0
                    }
                },
                {
                    "name": "servings",
                    "type": "number",
                    "required": True,
                    "options": {
                        "min": 1
                    }
                },
                {
                    "name": "ingredients",
                    "type": "json",
                    "required": True
                },
                {
                    "name": "steps",
                    "type": "json",
                    "required": True
                },
                {
                    "name": "tags",
                    "type": "json",
                    "required": False
                },
                {
                    "name": "image_url",
                    "type": "url",
                    "required": False
                },
                {
                    "name": "video_url",
                    "type": "url",
                    "required": False
                },
                {
                    "name": "tips",
                    "type": "text",
                    "required": False,
                    "options": {
                        "max": 500
                    }
                },
                {
                    "name": "calories_per_serving",
                    "type": "number",
                    "required": False,
                    "options": {
                        "min": 0
                    }
                },
                {
                    "name": "rating",
                    "type": "number",
                    "required": False,
                    "options": {
                        "min": 0,
                        "max": 5
                    }
                },
                {
                    "name": "reviews_count",
                    "type": "number",
                    "required": True,
                    "default": "0"
                }
            ]
        }
        self._create_collection(collection_data)

    def create_menus_collection(self):
        """创建菜单集合"""
        collection_data = {
            "name": "menus",
            "schema": [
                {
                    "name": "user_id",
                    "type": "relation",
                    "required": True,
                    "options": {
                        "collectionId": "users"
                    }
                },
                {
                    "name": "name",
                    "type": "text",
                    "required": True,
                    "options": {
                        "min": 1,
                        "max": 100
                    }
                },
                {
                    "name": "start_date",
                    "type": "date",
                    "required": True
                },
                {
                    "name": "end_date",
                    "type": "date",
                    "required": True
                },
                {
                    "name": "daily_menus",
                    "type": "json",
                    "required": True
                },
                {
                    "name": "description",
                    "type": "text",
                    "required": False,
                    "options": {
                        "max": 500
                    }
                },
                {
                    "name": "tags",
                    "type": "json",
                    "required": False
                },
                {
                    "name": "is_template",
                    "type": "bool",
                    "required": True,
                    "default": False
                },
                {
                    "name": "total_recipes",
                    "type": "number",
                    "required": True,
                    "default": "0"
                },
                {
                    "name": "estimated_cost",
                    "type": "number",
                    "required": False,
                    "options": {
                        "min": 0
                    }
                }
            ]
        }
        self._create_collection(collection_data)

def main():
    """主函数"""
    pb_init = PocketBaseInit()
    
    # 创建所有集合
    pb_init.create_users_collection()
    pb_init.create_ingredients_collection()
    pb_init.create_recipes_collection()
    pb_init.create_menus_collection()
    
    print("All collections created successfully!")

if __name__ == "__main__":
    main() 