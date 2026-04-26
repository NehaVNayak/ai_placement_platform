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