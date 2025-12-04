from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from app.core.config import settings
from app.schemas.token import TokenPayload
from app.schemas.user import User
from app.db.supabase import supabase

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API}/auth/login"
)

def get_current_user(token: str = Depends(reusable_oauth2)) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    
    user_id = token_data.sub
    email = token_data.email
    
    # Fetch user profile from Supabase
    try:
        full_name = "User"
        role = "NhaKhoaHoc"
        avatar = None

        # 1. Fetch role from user_roles -> roles
        try:
            role_response = supabase.table("user_roles").select("role_id, roles(ten_vai_tro)").eq("user_id", user_id).execute()
            if role_response.data and len(role_response.data) > 0:
                user_role_data = role_response.data[0]
                # Check if roles is a dict (joined data) or list
                if 'roles' in user_role_data and user_role_data['roles']:
                     # It might be a list if multiple matches, but usually one-to-one here
                     r_data = user_role_data['roles']
                     if isinstance(r_data, list) and len(r_data) > 0:
                         role = r_data[0].get('ten_vai_tro', role)
                     elif isinstance(r_data, dict):
                         role = r_data.get('ten_vai_tro', role)
        except Exception as e:
            print(f"Error fetching role: {e}")

        # 2. Fetch profile from nckh_nha_khoa_hoc
        response = supabase.table("nckh_nha_khoa_hoc").select("*").eq("user_id", user_id).execute()
        
        if response.data and len(response.data) > 0:
            profile = response.data[0]
            full_name = profile.get("ten", full_name)
            avatar = profile.get("avatar_url", None) 
            
        return User(
            id=user_id,
            email=email or "user@example.com",
            full_name=full_name,
            role=role,
            avatar=avatar
        )
        
    except Exception as e:
        print(f"Error fetching user profile: {e}")
        # Fallback to basic info
        return User(
            id=user_id,
            email=email or "user@example.com",
            full_name="User",
            role="NVKH"
        )
