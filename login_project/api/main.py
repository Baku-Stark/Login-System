import os
import uuid
import json

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
):
    file.filename = f"{user}_{uuid.uuid4()}.jpg"
    content = await file.read()

    # --- save file
    if not os.path.isdir(f"api/IMAGES/{user}"):
        os.mkdir(f"api/IMAGES/{user}")
    
    save_file = open(f"api/IMAGES/{user}/{file.filename}", 'wb')
    save_file.write(content)
    save_file.close()

    return {'response': "NEW USER CREATED"}

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)