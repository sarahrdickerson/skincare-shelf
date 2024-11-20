from fastapi import APIRouter, HTTPException, status, Depends, Request
from gotrue.errors import AuthApiError
from pydantic import BaseModel
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
    
class ProfileUpdateRequest(BaseModel):
    username: str = None
    first_name: str = None
    last_name: str = None
    avatar_url: str = None
    skin_data: dict = None
    email: str = None

@router.patch("/update", status_code=status.HTTP_200_OK)
async def update_profile(profile_update: ProfileUpdateRequest, user=Depends(verify_token)):
    """
    Update a user's profile
    """
    try:
        user_id = user.id
        logger.info(f"Updating profile for user {user_id}")

        # Check if the profile exists
        profile_response = supabase_admin.table("profiles").select("*").eq("id", user_id).execute()
        if not profile_response.data:
            logger.error(f"Profile for user {user_id} not found")
            raise HTTPException(status_code=404, detail="Profile not found")
        
        # Prepare the fields to be updated
        update_fields = profile_update.dict(exclude_unset=True)

        if not update_fields:
            logger.error("No fields to update")
            raise HTTPException(status_code=400, detail="No fields to update")
        
        # Patch the user profile in Supabase
        update_response = supabase_admin.table("profiles").update(update_fields).eq("id", user_id).execute()
        if not update_response.data:
            logger.error(f"Error updating profile for user {user_id}")
            raise HTTPException(status_code=500, detail="Error updating profile")
        
        return {"detail": "Profile updated successfully", "updated_fields": update_fields}
    except HTTPException as e:
        logger.error(f'HTTP Error: {e.detail}')
        raise e
    except Exception as e:
        logger.error(f'Error updating profile: {str(e)}')
        raise HTTPException(status_code=500, detail="Unexpected error updating profile")
