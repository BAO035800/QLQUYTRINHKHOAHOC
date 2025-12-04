from datetime import timedelta
from typing import Any
from jose import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core import security
from app.core.config import settings
from app.schemas.token import Token
from app.schemas.user import UserLogin
from app.db.supabase import supabase

router = APIRouter()

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
        # Map Supabase errors to HTTP exceptions
        raise HTTPException(status_code=400, detail=str(e))

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    return {
        "access_token": security.create_access_token(
            user_id, expires_delta=access_token_expires
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
