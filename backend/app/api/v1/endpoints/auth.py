from datetime import timedelta
from typing import Any
from jose import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core import security
from app.core.config import settings
from app.schemas.token import Token
from app.schemas.user import UserLogin, UserRegister, User
from app.db.supabase import supabase

router = APIRouter()

@router.post("/signup", response_model=User)
def signup(user_in: UserRegister) -> Any:
    """
    Create new user without the need to be logged in
    """
    try:
        # 1. Sign up with Supabase Auth
        res = supabase.auth.sign_up({
            "email": user_in.email,
            "password": user_in.password,
            "options": {
                "data": {
                    "full_name": user_in.full_name,
                    "role": user_in.role or "NVKH" 
                }
            }
        })
        
        if not res.user:
             raise HTTPException(status_code=400, detail="Registration failed")
             
        user_id = res.user.id
        
        # 2. Profile creation is now handled by Supabase Trigger (on_auth_user_created)
        # We do not need to manually insert into nckh_nha_khoa_hoc or user_roles here.

            
        return User(
            id=user_id,
            email=user_in.email,
            full_name=user_in.full_name,
            role=user_in.role
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

from app.schemas.user import UserForgotPassword

@router.post("/forgot-password")
def forgot_password(user_in: UserForgotPassword) -> Any:
    """
    Send password reset email
    """
    try:
        # Ensure we use the correct host and port from settings
        redirect_url = f"{settings.FRONTEND_URL}/reset-password"
        
        res = supabase.auth.reset_password_email(user_in.email, options={
            "redirect_to": redirect_url
        })
        
        return {"message": "Password reset email sent"}
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

from app.schemas.user import UserResetPassword

from app.db.supabase import supabase, supabase_admin

@router.post("/reset-password")
def reset_password(user_in: UserResetPassword) -> Any:
    """
    Reset password using recovery token
    """
    try:
        # 1. Verify the access token by getting the user
        # This ensures the token is valid and not expired
        user_response = supabase.auth.get_user(user_in.access_token)
        
        if not user_response or not user_response.user:
             raise HTTPException(status_code=400, detail="Invalid or expired token")
             
        user_id = user_response.user.id
        
        # 2. Update password using admin client (Service Role)
        if not supabase_admin:
             raise HTTPException(status_code=500, detail="Server configuration error: Missing service key")
        
        # Use admin API to update user attributes without needing a session
        supabase_admin.auth.admin.update_user_by_id(user_id, {"password": user_in.password})
        
        return {"message": "Password updated successfully"}
        
    except Exception as e:
        print(f"Reset password error: {e}")
        # Check for specific error messages if needed
        raise HTTPException(status_code=400, detail="Failed to reset password. Token might be expired or invalid.")

@router.post("/login", response_model=Token)
def login(user_in: UserLogin) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    try:
        # Authenticate with Supabase
        res = supabase.auth.sign_in_with_password({
            "email": user_in.email, 
            "password": user_in.password
        })
        
        if not res.user:
             raise HTTPException(status_code=400, detail="Incorrect email or password")
             
        user_id = res.user.id
        
    except Exception as e:
        error_msg = str(e)
        if "Email not confirmed" in error_msg:
            raise HTTPException(status_code=400, detail="Email chưa được xác thực. Vui lòng kiểm tra hộp thư của bạn.")
        elif "Invalid login credentials" in error_msg:
             raise HTTPException(status_code=400, detail="Email hoặc mật khẩu không chính xác.")
        
        # Map other Supabase errors to HTTP exceptions
        raise HTTPException(status_code=400, detail=error_msg)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    return {
        "access_token": security.create_access_token(
            user_id, expires_delta=access_token_expires, extra_claims={"email": user_in.email}
        ),
        "refresh_token": security.create_refresh_token(
            user_id, expires_delta=refresh_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/refresh", response_model=Token)
def refresh_token(refresh_token: str) -> Any:
    """
    Refresh access token
    """
    try:
        payload = jwt.decode(
            refresh_token, settings.REFRESH_TOKEN_SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_type = payload.get("type")
        if token_type != "refresh":
            raise HTTPException(status_code=400, detail="Invalid token type")
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=400, detail="Invalid token subject")
            
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    return {
        "access_token": security.create_access_token(
            user_id, expires_delta=access_token_expires
        ),
        "refresh_token": refresh_token, # Return same refresh token or rotate it
        "token_type": "bearer",
    }
