from dotenv import load_dotenv
import os
import smtplib
from email.mime.text import MIMEText
import socket

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASSWORD")

def send_email(to_email, subject, body):

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = to_email

    try:
        socket.setdefaulttimeout(10)  # Set a timeout for the SMTP connection
        server = smtplib.SMTP("smtp.gmail.com", 587,timeout=10)
        server.starttls()

        print("DEBUG USER:", EMAIL_USER)   # 👈 check
        print("DEBUG PASS:", EMAIL_PASS)   # 👈 check

        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, to_email, msg.as_string())
        server.quit()

        print("✅ Email sent to:", to_email)

    except Exception as e:
        print("❌ Email error:", str(e))
        raise e