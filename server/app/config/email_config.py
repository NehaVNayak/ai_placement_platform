from fastapi_mail import ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME="psd242004@gmail.com",        
    MAIL_PASSWORD="xopotflzonohdtky",        
    MAIL_FROM="psd242004@gmail.com",           

    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",

    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,

    VALIDATE_CERTS=True
)