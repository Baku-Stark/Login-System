"""
    Aplicattion with SQLite 3
    =====
    - Author: Baku-Stark
    - Python: 3.11
"""

import sqlite3 as lite

import SERVICES
from COLORS import Colors

con = lite.connect('api/SERVER/users_db.db')

class DataBase_Server():
    """
        CRUD SYSTEM
        =====
    """

    def __init__(self):
        with con:
            try:
                cur = con.cursor()
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS users(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        token TEXT,
                        user TEXT,
                        email TEXT,
                        password TEXT,
                        icon_profile TEXT)
                """)

                print(Colors.BACK_GREEN + " NEW TABLE CREATED " + Colors.END, end="")
                print(Colors.GREEN + " USERS - SUCCESS! " + Colors.END)
            
            except Exception as error:
                print(Colors.BACK_RED + " ERROR " + Colors.END, end="")
                print(Colors.RED + f" {error} " + Colors.END)

    def READ_ALL_DATA(self):
        """            
            return:
                `-> data : tuple (id ...)
        """
        with con:
            cur = con.cursor()
            query = "SELECT * FROM users"
            cur.execute(query)
            data = cur.fetchall()
            
            return data

    def READ_A_DATA_wToken(self, token: str):
        """
            args:
                `-> token : string

            
            return:
                `-> data : tuple (id ...)
        """
        with con:
            cur = con.cursor()
            query = "SELECT * FROM users"
            cur.execute(query)
            info = cur.fetchall()

            data = []

            for item in info:
                # print(item)

                if item[1] == token:
                    # print(item)
                    data.append(item[0])
                    data.append(item[1])
                    data.append(item[2])
                    data.append(item[3])
                    data.append(item[5])
                    break
            
            return data
        
    def READ_A_DATA_wID(self, id_user: int):
        """
            args:
                `-> id_user : integer

            
            return:
                `-> data : tuple (id ...)
        """
        with con:
            cur = con.cursor()
            query = "SELECT * FROM users"
            cur.execute(query)
            info = cur.fetchall()

            data = []

            for item in info:
                # print(item)

                if item[0] == id_user:
                    # print(item)
                    data.append(item[0])
                    data.append(item[1])
                    data.append(item[2])
                    data.append(item[3])
                    data.append(item[5])
                    break
            
            return data

    def INSERT_NEW_USER(self, account: dict):
        with con:
            cur = con.cursor()

            i = [account['token'], account['user'], account['email'], account['password'], account['icon_profile']]

            query = """INSERT INTO users (token, user, email, password, icon_profile) VALUES (?, ?, ?, ?, ?)"""
            
            cur.execute(query, i)

            print(Colors.BACK_GREEN + " NEW USER INSERTED " + Colors.END, end="")
            print(Colors.GREEN + f" WELCOME, {account['user']}! " + Colors.END)
    
    def DELETE_USER(self, id_user: int):
        service_user = SERVICES.SERVICE_USER()
        user = self.READ_A_DATA_wID(id_user)
        
        try:
            with con:
                cur = con.cursor()
                query = f"DELETE FROM users WHERE id={id_user}"
                cur.execute(query)

                service_user.delete_user_folder(user)
                
                print(Colors.BACK_GREEN + f" USER DELETED - {id_user} " + Colors.END, end="")
                print(Colors.GREEN + " SUCCESS! " + Colors.END)
                return True
        
        except Exception as error:
                print(Colors.BACK_RED + " ERROR (SERVER/__init__) " + Colors.END, end="")
                print(Colors.RED + f" {error} " + Colors.END)       
                return False

