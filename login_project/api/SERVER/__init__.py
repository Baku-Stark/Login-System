"""
    Aplicattion with SQLite 3
    =====
    - Author: Baku-Stark
    - Python: 3.11
"""

import sqlite3 as lite

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

    def INSERT_NEW_USER(self, account: dict):
        with con:
            cur = con.cursor()

            i = [account['token'], account['user'], account['email'], account['password'], account['icon_profile']]

            query = """INSERT INTO users (token, user, email, password, icon_profile) VALUES (?, ?, ?, ?, ?)"""
            
            cur.execute(query, i)

            print(Colors.BACK_GREEN + " NEW USER INSERTED " + Colors.END, end="")
            print(Colors.GREEN + f" WELCOME, {account['user']}! " + Colors.END)