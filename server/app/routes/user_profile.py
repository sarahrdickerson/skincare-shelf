from fastapi import APIRouter, HTTPException, status, Depends, Request
from gotrue.errors import AuthApiError
from app.utils.logger import logger
from app.utils.supabase import supabase, supabase_admin, verify_token

router = APIRouter()

# prefix: /api/profile

@router.get("/token", status_code=status.HTTP_200_OK)
async def get_profile_by_token(user=Depends(verify_token)):
    """
    Get a user's profile by their token.
    """
    try:
        user_id = user.id
        logger.info(f"Getting profile for user {user_id}")

        # Check if the profile exists
        profile_response = supabase_admin.table("profiles").select("*").eq("id", user_id).execute()
        profile = profile_response.data

        if not profile:
            logger.error(f"Profile for user {user_id} not found")
            raise HTTPException(status_code=404, detail="Profile not found")
        
        return profile
    except HTTPException as e:
        logger.error(f'HTTP Error: {e.detail}')
        raise e
    except Exception as e:
        logger.error(f'Error getting profile: {str(e)}')
        raise HTTPException(status_code=500, detail="Error getting profile")