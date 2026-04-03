#Валидация входных данных
from pydantic import BaseModel, EmailStr

# Схема формы
class Form(BaseModel):
    name: str
    email: EmailStr
    message: str
