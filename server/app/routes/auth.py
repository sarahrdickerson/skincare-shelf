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

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest):
    """
    Register a new user using their first name, last name, username, email, and password.

    Args:
        request (RegisterRequest): The request body containing the user's information.
    """
    try:
        logger.info(f'Received registration request for {request.email}')

        # Check if email is unique
        logger.info(f"Checking if email {request.email} is unique")
        email_response = supabase_admin.table("profiles").select("id").eq("email", request.email).execute()
        is_email_unique = email_response.data is None or len(email_response.data) == 0

        if not is_email_unique:
            logger.error(f"Email {request.email} is already registered")
            raise HTTPException(status_code=409, detail="Email already registered")
        
        # Check if username is unique
        logger.info(f"Checking if username {request.username} is unique")
        unique_response = supabase_admin.table("profiles").select("id").eq("username", request.username).execute()
        is_unique = unique_response.data is None or len(unique_response.data) == 0

        if not is_unique:
            logger.error(f"Username {request.username} is not unique")
            raise HTTPException(status_code=409, detail="Username already exists")
        
        # Call supabase register method
        auth_response = supabase.auth.sign_up({
            'email': request.email,
            'password': request.password,
            'options': {
                'data': {
                    'display_name': f'{request.first_name} {request.last_name}',
                }
            }
        })

        if auth_response.user is None:
            raise HTTPException(status_code=422, detail="Registration failed")

        # Insert user into the profiles DB
        logger.info(f"Inserting user {request.email} into profiles table")
        supabase.table('profiles').insert({
            'id': auth_response.user.id,
            'first_name': request.first_name,
            'last_name': request.last_name,
            'username': request.username,
            'email': request.email
        }).execute()

        logger.info(f"Registration successful for {request.email}")

        return {
            "detail": "Registration successful",
            "access_token": auth_response.session.access_token,
            "refresh_token": auth_response.session.refresh_token,
            "user": {
                "id": auth_response.user.id,
                "email": auth_response.user.email,
                "username": request.username,
            }
        }
    except AuthApiError as e:
        logger.error(f"Error registering user: {str(e)}")
        raise HTTPException(status_code=e.status, detail=f'Registration error: {str(e)}')
    except APIError as e:
        if e.code == '23505':
            logger.error(f'Duplicate display name: {e}')
            raise HTTPException(status_code=409, detail="Username already exists")
        else:
            logger.error(f'Database error: {e}')
            raise HTTPException(status_code=500, detail=f'Database error: {str(e)}')
    except HTTPException as e:
        logger.error(f'HTTP error during registration: {e}')
        raise e
    except Exception as e:
        logger.error(f'Unexpected error during registration: {e}')
        raise HTTPException(status_code=500, detail="Internal server error")