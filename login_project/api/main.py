import os
import uuid
#import json

import SERVICES

try:
    import uvicorn
    from pathlib import Path
    from fastapi.responses import HTMLResponse
    from fastapi.responses import FileResponse
    from fastapi.staticfiles import StaticFiles
    from fastapi.templating import Jinja2Templates
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi import FastAPI, File, UploadFile, Form, status, Request

except ModuleNotFoundError:
    os.system('pip install -r requirements.txt')

os.system('cls')
app = FastAPI()
app.mount("/static", StaticFiles(directory="api/PAGE/static", html=True), name="static")

templates = Jinja2Templates(directory="api/PAGE")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", status_code=status.HTTP_200_OK, response_class=HTMLResponse, tags=['Root'])
async def home(request: Request):
    return templates.TemplateResponse(name="index.html", context={"request": request})

@app.get("/vector_image/get_image/{user}/{icon_profile}")
def image_endpoint(
    user: str,
    icon_profile: str,
):
    print(user)
    print(icon_profile)

    IMAGE_DIR = f"api/IMAGES/{user}/profile/{icon_profile}"
    image_path = Path(IMAGE_DIR)
    return FileResponse(image_path)

@app.post("/sign_up", status_code=status.HTTP_201_CREATED, tags=['Root'])
async def RegisterRequest(
    user: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    file: UploadFile = File(...)
):
    """
        CREATE A NEW USER.
        =====
    """
    account = {
        "token": "",
        "user": user,
        "email": email,
        "password": password,
        "icon_profile": ""
    }

    file.filename = f"{user}_{uuid.uuid4()}.jpg"
    account['icon_profile'] = str(file.filename)

    service_user = SERVICES.SERVICE_USER()
    # print(service_user.request_new_user(account)['response'])
    
    if len(file.filename) > 0:
        # --- save file
        content = await file.read()
        
        if not os.path.isdir(f"api/IMAGES/{user}"):
            service_user.create_user_folder(user)
        
        IMAGE_DIR = f"api/IMAGES/{user}/profile/{file.filename}"
        save_file = open(IMAGE_DIR, 'wb')
        save_file.write(content)
        save_file.close()
        # --- save file

        return  {"token": service_user.request_new_user(account)['token']}

@app.post("/sign_in", status_code=status.HTTP_202_ACCEPTED, tags=['Root'])
async def LoginRequest(
    email: str = Form(...),
    password: str = Form(...),
):
    # print(f'{email} - {password}')
    service_user = SERVICES.SERVICE_USER()
    return {"token": service_user.request_login_user(email, password)}

@app.post("/auth_user", status_code=status.HTTP_202_ACCEPTED, tags=['Root'])
async def UserRequest(
    token: str = Form(...)
):
    # print(token)
    service_user = SERVICES.SERVICE_USER()

    return {"data": service_user.GET_A_USER(token)}

@app.delete("/delete_user/{id_user}", status_code=status.HTTP_200_OK, tags=['Root'])
async def UserDelete(id_user: int):
    service_user = SERVICES.SERVICE_USER()

    return {"data": service_user.DELETE(id_user)}

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)