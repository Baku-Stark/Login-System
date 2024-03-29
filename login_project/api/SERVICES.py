import re, os, shutil, base64

from random import randint
from SERVER import DataBase_Server

class SERVICE_USER:
    """
        Api Service
    """
    db_server = DataBase_Server()

    def create_user_folder(self, user: str):
        os.mkdir(f"api/IMAGES/{user}")
        os.mkdir(f"api/IMAGES/{user}/profile")

    def delete_user_folder(self, user: str):
        if os.path.isdir(f"api/IMAGES/{user}"):
            shutil.rmtree(f"api/IMAGES/{user}")

    def encode_password(self, password: str) -> str:
        # --- ENCODE [PASSWORD]
        encode_password = base64.b64encode(password.encode("ascii"))
        password_encode = str(encode_password)[2:-1]
        # --- ENCODE [PASSWORD]

        return password_encode

    def generate_token_body(self) -> str:
        """
            return:
                token : str
        """
        
        list_carac = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "-", "=", "*", "+", "!", "@", "#", "$", "%", "&", "(", ")"
        ]

        token_body = ""

        for num in range(1, 41):
            randomNum = randint(0, len(list_carac)-1)
            token_body += "".join(list_carac[randomNum])

        return token_body

    def verify_email_regex(self, email: str) -> bool:
        """
            REGEX (Useremail)
        """
        # print(f"email: {email}")

        # p = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+')
        # corrs = p.finditer(email)
        # print(f"email(REGEX): {corrs}")

        req = re.match(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+', email)

        # print(req)

        return True if req else False
    
    def verify_user_regex(self, user: str) -> bool:
        """
            REGEX (Username)
        """

        p = re.compile(r'^[a-zA-Z0-9_.-]+$')
        corrs = p.findall(user)

        #print(corrs[0])
        return True if corrs[0] == user else False

    def CREATE_NEW_USER(self, account: dict):
        """
            return: token (user)
        """

        # --- ENCODE [USER]
        encode_user = base64.b64encode(account['user'].encode("ascii"))
        # --- ENCODE [USER]

        # --- ENCODE [PASSWORD]
        encode_password = base64.b64encode(account['password'].encode("ascii"))
        account['password'] = str(encode_password)[2:-1]
        # --- ENCODE [PASSWORD]

        # self.verify_email_regex(account['email'])
        # self.verify_user_regex(account['user'])
        
        if self.verify_email_regex(account['email']) and self.verify_user_regex(account['user']):

            # --- ENCODE [TOKEN]
            token = f"{str(encode_user)[2:-1]}.{self.generate_token_body()}"
            account['token'] = token
            # --- ENCODE [TOKEN]
            
            # print(account)
            self.db_server.INSERT_NEW_USER(account)

            return {"response": True, "token": token}

        else:
            return {"response": False}

    def request_new_user(self, account: dict):
        return self.CREATE_NEW_USER(account)

    def request_login_user(self, email: str, password: str):
        token = ""
        for data in self.db_server.READ_ALL_DATA():
            # print(data)

            if email == data[3] and self.encode_password(password) == data[4]:
                # print(f"CHECK (SERVICES.py): {data}")

                token = data[1]
                break
        
        return token

    def GET_A_USER(self, token: str):
        return self.db_server.READ_A_DATA_wToken(token)

    def DELETE(self, id_user: int):
        return self.db_server.DELETE_USER(id_user)
