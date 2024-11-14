# app/main.py
from fastapi import FastAPI

app = FastAPI()

# Include the users router
# app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Skincare Shelf API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
