import re
import base64

from random import randint

class SERVICE_USER:
    DB_DIR = "api/SERVER/DATABASE.db"

    def generate_token_body(self) -> str:
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
        p = re.compile(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+')
        corrs = p.findall(email)

        return True if corrs[0] == email else False
    
    def verify_user_regex(self, user: str) -> bool:
        p = re.compile(r'[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:\|,.<>\/?]*')
        corrs = p.findall(user)

        #print(corrs[0])
        return True if corrs[0] == user else False

    def CREATE_NEW_USER(self, account: dict):
        # --- ENCODE [USER]
        encode_user = base64.b64encode(account['user'].encode("ascii"))
        token = f"{str(encode_user)[2:-1]}.{self.generate_token_body()}"
        # --- ENCODE [USER]
        
        # self.verify_email_regex(account['email'])
        # self.verify_user_regex(account['user'])
        
        if self.verify_email_regex(account['email']) and self.verify_user_regex(account['user']):
            print("USER DATA")

            return token
        
        else:
            return False

    def request_new_user(self, account: dict):
        return self.CREATE_NEW_USER(account)