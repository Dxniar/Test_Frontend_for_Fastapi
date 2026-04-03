# Роутер для форм
from fastapi import APIRouter

from backend.database_connect import database_conn
from backend.shemas import Form

forms_router = APIRouter()

#Подключение к БД
supabase = database_conn()

@forms_router.post("/post_forms", tags=["Forms"], summary="Отправка формы")
def post_message(form: Form):
    payload = {
        "name": form.name,
        "email": form.email,
        "message": form.message
    }
    try:
        supabase.table("forms").insert(payload).execute()
        return {
            "status": "success",
        }
    except Exception as e:
        return {
            "status": "error",
        }


@forms_router.get("/get_forms", tags=["Forms"], summary="Получение формы")
def get_message():
    try:
        response = supabase.table("forms").select().execute()
        return response.data
    except Exception as e:
        return {
            "status": "error",
        }

@forms_router.get(f"/get_forms/{id}", tags=["Forms"], summary="Получение формы по ID")
def get_form(form_id: int):
    try:
        response = (
            supabase.table("forms")
            .select("*")
            .eq("id", form_id)
            .single()
            .execute()
        )
        return response.data
    except Exception as e:
        return {
            "status": "error",
        }