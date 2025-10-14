document.addEventListener("DOMContentLoaded", () => {
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    if (orderData) {
        document.getElementById("orderId").textContent = orderData.id;
        document.getElementById("orderTotal").textContent = `${orderData.total}`;

        const itemsContainer = document.getElementById("orderItems");
        orderData.items.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>${item.name}</div>
                    <div>${item.price} x ${item.quantity}</div>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });
    }


    // Получение элемента по ID
    const orderTotalElement = document.getElementById('orderTotal');
    const orderIdElement = document.getElementById('orderId');

    // Получение значения orderTotal
    const orderTotalValue = orderTotalElement.textContent;
    const orderIdValue = orderIdElement.textContent;

    // Функция для отправки значения на сервер
    function sendOrderTotalToServer(orderTotal, orderId) {
        // URL сервера, куда будем отправлять данные
        const url = 'http://localhost:5500/order-confirmation';

        // Настройка запроса
        const data = { orderTotal: orderTotal, orderId };

        // Отправка запроса на сервер с помощью fetch API
        fetch(url, {
                method: 'POST', // Используем метод POST
                headers: {
                    'Content-Type': 'application/json' // Тип передаваемых данных
                },
                body: JSON.stringify(data) // Преобразуем объект данных в JSON
            })
            .then(response => response.json()) // Обрабатываем ответ в формате JSON
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Вызов функции для отправки данных
    sendOrderTotalToServer(orderTotalValue, orderIdValue);


});