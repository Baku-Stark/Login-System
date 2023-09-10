import os
import uuid
import json

try:
    import uvicorn
    from pydantic import BaseModel
    from fastapi import FastAPI, File, UploadFile, Form, status

except ModuleNotFoundError:
    os.system('pip install -r requirements.txt')

os.system('cls')
app = FastAPI()

class Register(BaseModel):
    user: str
    email: str
    password: str

@app.get("/", status_code=status.HTTP_200_OK, tags=['Root'])
async def home():
    return "Hello World!"

@app.post("/", status_code=status.HTTP_201_CREATED, tags=['Root'])
async def RegisterRequest(
    user: str = Form(...),
    # email: str = Form(...),
    # password: str = Form(...),
    file: UploadFile = File(...)
):
    file.filename = f"{user}_{uuid.uuid4()}.jpg"
    content = await file.read()

    # --- save file
    save_file = open(f"api/IMAGES/{file.filename}", 'wb')
    save_file.write(content)
    save_file.close()

    return {'data': file.filename}

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)