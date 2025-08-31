import os
from dotenv import load_dotenv

load_dotenv()  # loads .env file if exists

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret")
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('DB_USER','root')}:{os.getenv('DB_PASS','')}"
        f"@{os.getenv('DB_HOST','localhost')}:{os.getenv('DB_PORT','3306')}/{os.getenv('DB_NAME','resume_builder')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
