from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from gotrue.errors import AuthApiError
from app.utils.logger import logger
from app.utils.supabase import supabase, supabase_admin
from postgrest.exceptions import APIError

router = APIRouter()

# prefix: /api/auth
@router.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Auth API"}