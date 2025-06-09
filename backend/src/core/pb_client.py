import requests
from typing import Optional, Dict, Any
from .config import get_settings

settings = get_settings()

class PocketBaseClient:
    def __init__(self):
        self.base_url = settings.POCKETBASE_URL
        self.admin_email = settings.POCKETBASE_ADMIN_EMAIL
        self.admin_password = settings.POCKETBASE_ADMIN_PASSWORD
        self.admin_token: Optional[str] = None

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

    def _make_request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """发送请求到PocketBase"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = kwargs.pop("headers", {})
        
        if "auth" not in kwargs:
            headers["Authorization"] = f"Admin {self._get_admin_token()}"
        
        response = requests.request(
            method,
            url,
            headers=headers,
            **kwargs
        )
        response.raise_for_status()
        return response.json()

    def create_record(self, collection: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """创建记录"""
        return self._make_request("POST", f"collections/{collection}/records", json=data)

    def get_record(self, collection: str, record_id: str) -> Dict[str, Any]:
        """获取记录"""
        return self._make_request("GET", f"collections/{collection}/records/{record_id}")

    def update_record(self, collection: str, record_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """更新记录"""
        return self._make_request("PATCH", f"collections/{collection}/records/{record_id}", json=data)

    def delete_record(self, collection: str, record_id: str) -> None:
        """删除记录"""
        self._make_request("DELETE", f"collections/{collection}/records/{record_id}")

    def list_records(self, collection: str, query_params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """列出记录"""
        return self._make_request("GET", f"collections/{collection}/records", params=query_params)

pb_client = PocketBaseClient() 