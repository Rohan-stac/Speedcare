if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/Speedcare/sw.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}


/*Medicine js*/ 
let cart = [];
let totalPrice = 0;

function addItem(name, price) {
    const quantity = parseInt(document.getElementById(`qty-${name}`).value);
    if (quantity > 0) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCart();
    } else {
        alert('Please enter a valid quantity.');
    }
}

function updateCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';
    totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const row = `<tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs.${item.price * item.quantity}</td>
        </tr>`;
        cartBody.innerHTML += row;
    });
    document.getElementById('total').innerText = `Total: Rs.${totalPrice}`;
}

function goToOrderPage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'order.html'; // Navigate to order page
}

function saveToFavourites() {
    localStorage.setItem('favourites', JSON.stringify(cart));
    alert('Order saved as favourite!');
}

function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    if (favourites) {
        cart = favourites;
        updateCart();
        alert('Favourites applied to the cart!');
    } else {
        alert('No favourites found.');
    }
}


/*Order js */

function completeOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('payment').value;

    if (name && address && phone && payment) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3); // Example: 3 days later
        alert(`Thank you, ${name}! Your order has been placed. Delivery Date: ${deliveryDate.toDateString()}`);
        localStorage.removeItem('cart'); // Clear cart
        window.location.href = 'index.html'; // Navigate back to home
    } else {
        alert('Please fill in all fields.');
    }
}


