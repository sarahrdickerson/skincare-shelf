# app/main.py
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.user_profile import router as user_profile_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

# Include individual routes under /api prefix
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(user_profile_router, prefix="/profile", tags=["profile"])

app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Skincare Shelf API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
