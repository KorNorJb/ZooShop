document.addEventListener("DOMContentLoaded", () => {
    let modalContainers = document.querySelectorAll(".modal__block");
    let openModalButtons = document.querySelectorAll(".product");

    openModalButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            let index = e.currentTarget.getAttribute("data-index");
            console.log("Index:", index);
            let modal = document.getElementById("modal-" + index);
            console.log("Modal:", modal);
            if (modal) {
                modal.classList.add("show");
            } else {
                console.error("Modal not found for index:", index); 
            }
        });
    });

    modalContainers.forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                e.preventDefault();
                modal.classList.remove("show");
            }
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modalContainers.forEach((modal) => {
                modal.classList.remove("show");
            });
        }
    });


    var swipeButtons = document.querySelectorAll('.modal__swipe');

    swipeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var modalBlock = button.closest('.modal__block');
            modalBlock.classList.toggle('flip');
        });
    });


    const cartBtn = document.querySelector(".product__cart");
    const cartModalBlock = document.querySelector(".cartModal__block");
    const cartModal = cartModalBlock.querySelector(".modal");
    const closeBtn = cartModal.querySelector(".close");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const addToCartBtns = document.querySelectorAll(".addToCartBtn");
    const clearCartBtn = document.querySelector(".clearCart");
    const checkoutBtn = document.querySelector(".checkoutBtn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    const showCart = () => {
        cartModalBlock.classList.add("show");
        localStorage.setItem("cartOpen", "true");
    };


    const hideCart = () => {
        cartModalBlock.classList.remove("show");
        localStorage.setItem("cartOpen", "false");
    };


    cartBtn.addEventListener("click", () => {
        showCart();
    });

    cartModalBlock.addEventListener("click", (e) => {
        if (e.target === cartModalBlock) {
            e.preventDefault();
            hideCart();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            hideCart();
        }
    });

    addToCartBtns.forEach((btn) => {
        btn.onclick = () => {
            const product = {
                name: btn.getAttribute("data-product"),
                price: parseFloat(btn.getAttribute("data-price")),
                image: btn.getAttribute("data-image"),
                stock: parseInt(btn.getAttribute("data-stock")),
            };
            const existingItem = cart.find((item) => item.name === product.name);
            if (existingItem) {
                if (existingItem.quantity < product.stock) {
                    existingItem.quantity += 1;
                } else {
                    alert("Нельзя добавить больше товара, чем имеется в наличии");
                }
            } else {
                cart.push({...product, quantity: 1 });
            }
            saveCart();
            updateCart();
        };
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            const totalPrice = item.price * item.quantity;
            itemElement.innerHTML = `
            <div class="cart-item__image">
                <img src="${item.image}" alt="${item.name}" class="cart__item">
            </div>
            <div class="cart-item__details">
                <div class="cart-item__name">${item.name}</div>
                <div class="cart-item__price">${item.price} ₸ x 
                    <button class="decreaseBtn" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increaseBtn" data-index="${index}">+</button>
                </div>
                <div class="cart-item__total">Total: ${totalPrice} ₸</div>
            </div>
        `;
            cartItems.appendChild(itemElement);
            total += totalPrice;
        });
        cartTotal.innerText = `Total: ${total} ₸`;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function increaseQuantity(index) {
        const item = cart[index];
        if (item.quantity < item.stock) {
            item.quantity++;
        } else {
            alert("Нельзя добавить больше товара, чем имеется в наличии");
        }
        saveCart();
        updateCart();
    }


    function decreaseQuantity(index) {
        const item = cart[index];
        item.quantity--;
        if (item.quantity < 1) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCart();
    }


    cartItems.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("increaseBtn")) {
            const index = parseInt(target.getAttribute("data-index"));
            increaseQuantity(index);
        } else if (target.classList.contains("decreaseBtn")) {
            const index = parseInt(target.getAttribute("data-index"));
            decreaseQuantity(index);
        }
    });

    // Clear Cart
    clearCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        cart = [];
        saveCart();
        updateCart();
    });

    if (localStorage.getItem("cartOpen") === "true") {
        showCart();
    } else {
        hideCart();
    }


    updateCart();


    checkoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const orderId = `${Date.now()}`;
        const orderData = {
            id: orderId,
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };

        console.log("Order Data:", orderData);

        fetch("/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    localStorage.removeItem("cart");
                    localStorage.setItem("orderData", JSON.stringify(orderData));
                    window.location.href = `/order-confirmation`;
                } else {
                    alert("Ошибка при создании заказа: " + data.message);
                }
            })
            .catch((error) => {
                console.error("Ошибка:", error);
                alert("Ошибка при создании заказа");
            });
    });
});
