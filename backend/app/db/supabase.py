from supabase import create_client, Client
from app.core.config import settings

url: str = settings.SUPABASE_URL
key: str = settings.SUPABASE_KEY
service_key: str = settings.SUPABASE_SECRET_KEY

supabase: Client = create_client(url, key)
supabase_admin: Client = create_client(url, service_key) if service_key else None
