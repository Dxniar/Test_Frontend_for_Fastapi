// Базовый URL вашего backend. При необходимости поменяйте на полный адрес сервера.
const API_BASE_URL = "";

const form = document.getElementById("request-form");
const getRequestsBtn = document.getElementById("get-requests-btn");
const responseBlock = document.getElementById("response");
const errorBlock = document.getElementById("error");

// Рендерим данные в блок ответа в красивом JSON-формате.
function renderResponse(data) {
  responseBlock.textContent = JSON.stringify(data, null, 2);
}

// Показываем текст ошибки пользователю.
function renderError(message) {
  errorBlock.textContent = message;
}

// Очищаем старую ошибку перед новым запросом.
function clearError() {
  errorBlock.textContent = "";
}

// Отправка формы на POST /api/requests
async function sendRequest(event) {
  event.preventDefault();
  clearError();

  const formData = new FormData(form);
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Ошибка POST: ${response.status}`);
    }

    const data = await response.json();
    renderResponse(data);
  } catch (error) {
    renderError(error.message || "Не удалось отправить данные");
  }
}

// Получение данных с GET /api/requests
async function getRequests() {
  clearError();

  try {
    const response = await fetch(`${API_BASE_URL}/api/requests`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Ошибка GET: ${response.status}`);
    }

    const data = await response.json();
    renderResponse(data);
  } catch (error) {
    renderError(error.message || "Не удалось получить данные");
  }
}

// Навешиваем обработчики событий на форму и кнопку.
form.addEventListener("submit", sendRequest);
getRequestsBtn.addEventListener("click", getRequests);
