import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Загрузка переменных окружения
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Непосредственно подключение к БД Supabase
def database_conn():
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    return supabase
