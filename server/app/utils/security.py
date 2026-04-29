<<<<<<< HEAD

import bcrypt

def hash_password(password: str):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(password: str, hashed_password):
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode("utf-8")

    return bcrypt.checkpw(
        password.encode("utf-8"),
        hashed_password
    )


   
=======
import bcrypt

def hash_password(password: str):
    # 🔐 convert bytes → string before storing in DB
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(password: str, hashed_password: str):
    # 🔐 convert string → bytes before checking
    return bcrypt.checkpw(
        password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
