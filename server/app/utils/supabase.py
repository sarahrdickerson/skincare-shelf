import os
from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Request
from app.utils.logger import logger

# Load the .env.local file
dotenv_path = os.path.join(os.path.dirname(__file__), '../..', '.env')
load_dotenv(dotenv_path=dotenv_path)

url: str = os.getenv("SUPABASE_PROJECT_URL")
key: str = os.getenv("SUPABASE_ANON")
service_key: str = os.getenv("SUPABASE_SERVICE_ROLE")
supabase: Client = create_client(url, key) # Client for public operations
supabase_admin: Client = create_client(url, service_key)  # Service role key for admin operations

async def verify_token(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        logger.error("Missing token")
        raise HTTPException(status_code=401, detail="Missing token")
    
    try:
        token = token.replace("Bearer ", "")
        response = supabase.auth.get_user(token)
        user = response.user
        if not user:
            logger.error("Invalid token")
            raise HTTPException(status_code=403, detail="Invalid token")
        return user
    except Exception as e:
        logger.error(f"Error verifying token: {str(e)}")
        raise HTTPException(status_code=500, detail="Error verifying token")
    