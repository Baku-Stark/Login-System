import os
import uuid
#import json

import SERVICES

try:
    import uvicorn
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi import FastAPI, File, UploadFile, Form, status

except ModuleNotFoundError:
    os.system('pip install -r requirements.txt')

os.system('cls')
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users", status_code=status.HTTP_200_OK, tags=['Root'])
async def home():
    return "Hello World!"

@app.post("/sign_up", status_code=status.HTTP_201_CREATED, tags=['Root'])
async def RegisterRequest(
    user: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    file: UploadFile = File(...)
) -> str:
    """
        CREATE A NEW USER.
        =====
    """
    account = {"user": user, "email": email, "password": password}

    # --- insert new user in database
    service_user = SERVICES.SERVICE_USER()
    # --- insert new user in database

    # --- save file
    file.filename = f"{user}_{uuid.uuid4()}.jpg"
    content = await file.read()
    if not os.path.isdir(f"api/IMAGES/{user}"):
        os.mkdir(f"api/IMAGES/{user}")
    
    save_file = open(f"api/IMAGES/{user}/{file.filename}", 'wb')
    save_file.write(content)
    save_file.close()
    # --- save file

    return  service_user.request_new_user(account)

@app.post("/sign_in", status_code=status.HTTP_202_ACCEPTED, tags=['Root'])
async def LoginRequest(
    email: str = Form(...),
    password: str = Form(...),
) -> str:
    return "user_token"

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)