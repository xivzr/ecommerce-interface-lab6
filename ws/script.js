
// TASK 1: PRODUCT CLASS
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

// TASK 1: DATA
const products = [
    new Product(1, "Minimal Watch 1", 985, "Minimal Watch 1.jpg"),
    new Product(2, "Minimal Watch 2", 1020, "Minimal Watch 2.jpg"),
    new Product(3, "Classic Watch", 1800, "Classic Watch.jpg"),
    new Product(4, "Elegant Watch", 2700, "Elegant Watch.jpg"),
    new Product(5, "Smart Watch 1", 3000, "Smart Watch 1.jpg"),
    new Product(6, "Smart Watch 2", 2500, "Smart Watch 2.jpg"),
    new Product(7, "Sports Watch 1", 1200, "Sport Watch 1.jpg"),
    new Product(8, "Sports Watch 2", 5000, "Sport watch 2.jpg"),
    new Product(9, "Digital Watch", 1500, "Digital Watch.jpg"),
    new Product(10, "Fitness Watch", 2200, "Fitness Watch.jpg"),
];

// TASK 3: CART
let cart = [];

// TASK 2: RENDER PRODUCTS
const productContainer = document.querySelector(".products-grid");

if (productContainer) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("article");

        const title = document.createElement("h3");
        title.textContent = product.name;

        const img = document.createElement("img");
        img.src = product.image;

        const price = document.createElement("p");
        price.textContent = "₱" + product.price;
        price.classList.add("price");

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.setAttribute("data-id", product.id);

        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(price);
        card.appendChild(button);

        productContainer.appendChild(card);
    });
}

// TASK 3: EVENT DELEGATION
document.body.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON" &&
        event.target.textContent === "Add to Cart") {

        const id = parseInt(event.target.getAttribute("data-id"));
        const product = products.find(p => p.id === id);

        const existing = cart.find(p => p.id === product.id);

        if (existing) {
            existing.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        renderCart();

        event.target.parentElement.classList.add("fade-in");

        setTimeout(() => {
            event.target.parentElement.classList.remove("fade-in");
        }, 500);
    }
});

// TASK 3: RENDER CART
function renderCart() {
    const cartList = document.querySelector(".cart-items");
    if (!cartList) return;

    cartList.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "₱" + item.price;

        const qty = document.createElement("input");
        qty.type = "number";
        qty.value = item.qty;
        qty.min = 0;

        qty.addEventListener("change", function() {
            if (qty.value == 0) {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
            } else {
                item.qty = parseInt(qty.value);
            }
            renderCart();
        });

        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(qty);

        cartList.appendChild(li);
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    console.log("Total:", total);
}
// TASK 4: FORM VALIDATION
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const inputs = form.querySelectorAll("input");
        const errorMsg = document.querySelector("#errorMsg");

        let isValid = true;

        inputs.forEach(input => {
            if (input.value === "") {
                input.classList.add("error");
                isValid = false;
            } else {
                input.classList.remove("error");
            }
        });

        if (!isValid) {
            if (errorMsg) {
                errorMsg.textContent = "Please fill out all fields";
            }
        } else {
            console.log("Order successful!");
            window.location.href = "thankyou.html";
        }
    });
}

// TASK 5: USER ACCOUNT
const currentUser = {
    name: "Kj",
    orderHistory: [
        {
            id: 1,
            date: "Feb 1, 2026",
            total: 1020,
            items: ["Minimal Watch"]
        }
    ]
};

const headerTitle = document.querySelector("header h1");

if (headerTitle && headerTitle.textContent.includes("Welcome")) {
    headerTitle.textContent = "Welcome, " + currentUser.name;
}

document.querySelectorAll("details").forEach((detail, index) => {
    detail.querySelector("summary").addEventListener("click", function() {
        const order = currentUser.orderHistory[index];

        detail.innerHTML = `
            <summary>Order #${order.id}</summary>
            <p>Date: ${order.date}</p>
            <p>Total: ₱${order.total}</p>
            <p>Items: ${order.items.join(", ")}</p>
        `;
document.addEventListener("DOMContentLoaded" , renderCart);
    });
});
