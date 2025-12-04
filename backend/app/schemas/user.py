from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None
    role: str | None = "NVKH"
    avatar: str | None = None

class UserCreate(UserBase):
    password: str

class UserRegister(UserBase):
    password: str
    full_name: str

class UserForgotPassword(BaseModel):
    email: EmailStr

class UserResetPassword(BaseModel):
    password: str
    access_token: str

class User(UserBase):
    id: str
    
    class Config:
        from_attributes = True
