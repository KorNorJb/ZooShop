document.addEventListener('DOMContentLoaded', () => {
    const getBtns = document.querySelectorAll('.get__btn'); // выбираем все кнопки

    getBtns.forEach(getBtn => {
        getBtn.addEventListener('click', async() => {
            const orderStatus = getBtn.previousElementSibling; // находим элемент .total__status перед кнопкой
            const orderId = getBtn.getAttribute('data-id');

            // Изменяем стили и текст перед отправкой запроса (опционально)
            getBtn.disabled = true;
            orderStatus.textContent = 'Deliveries are being made';

            const newStatus = 'Deliveries are being made';

            try {
                const response = await fetch('/courierpanel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ orderId, newStatus }), // передаем правильные имена полей
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Order status updated successfully:', data.order);
                    // Можно обновить стили и текст после успешного обновления на сервере
                    orderStatus.textContent = `Order status: ${newStatus}`;
                } else {
                    console.error('Error updating order status:', data.message);
                    // Возвращаем исходное состояние кнопки и статуса в случае ошибки
                    orderStatus.textContent = `Order status: ${orderStatus.getAttribute('data-status')}`;
                    getBtn.disabled = false;
                }
            } catch (error) {
                console.error('Error updating order status:', error);
                // Возвращаем исходное состояние кнопки и статуса в случае ошибки
                orderStatus.textContent = `Order status: ${orderStatus.getAttribute('data-status')}`;
                getBtn.disabled = false;
            }
        });
    });
});