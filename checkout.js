// Get DOM elements
const orderItemsContainer = document.getElementById('orderItems');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutForm = document.getElementById('checkoutForm');

// Constants
const TAX_RATE = 0.08; // 8% tax rate
const SHIPPING_COST = 4.99;

// Initialize checkout page
function initCheckout() {
    // Get cart items from localStorage or session
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartItems.length === 0) {
        // Redirect to cart if no items
        window.location.href = 'index.html';
        return;
    }
    
    displayOrderItems(cartItems);
    updateOrderSummary(cartItems);
}

// Display order items
function displayOrderItems(items) {
    orderItemsContainer.innerHTML = '';
    
    items.forEach(item => {
        const orderItemElement = document.createElement('div');
        orderItemElement.className = 'order-item';
        orderItemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <div class="order-item-details">
                <span class="order-item-title">${item.title}</span>
                <span class="order-item-quantity">Quantity: ${item.quantity}</span>
                <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        
        orderItemsContainer.appendChild(orderItemElement);
    });
}

// Update order summary
function updateOrderSummary(items) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SHIPPING_COST;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Form validation
function validateForm() {
    // Card number validation (simple check for 16 digits)
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.value = cardNumber.value.replace(/\D/g, '');
    if (cardNumber.value.length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return false;
    }
    
    // Expiry date validation (MM/YY format)
    const expiryDate = document.getElementById('expiryDate');
    const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryPattern.test(expiryDate.value)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }
    
    // CVV validation (3 or 4 digits)
    const cvv = document.getElementById('cvv');
    cvv.value = cvv.value.replace(/\D/g, '');
    if (cvv.value.length < 3 || cvv.value.length > 4) {
        alert('Please enter a valid CVV');
        return false;
    }
    
    // ZIP code validation (5 digits)
    const zipCode = document.getElementById('zipCode');
    zipCode.value = zipCode.value.replace(/\D/g, '');
    if (zipCode.value.length !== 5) {
        alert('Please enter a valid 5-digit ZIP code');
        return false;
    }
    
    // Phone number validation (10 digits)
    const phone = document.getElementById('phone');
    const phoneDigits = phone.value.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }
    
    return true;
}

// Handle form submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // In a real application, this would send the order to a server
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Clear cart and redirect to home page
    localStorage.removeItem('cartItems');
    window.location.href = 'index.html';
});

// Format input fields
document.getElementById('cardNumber').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 16);
});

document.getElementById('expiryDate').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

document.getElementById('cvv').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
});

document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
    } else if (value.length >= 3) {
        value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
    }
    e.target.value = value;
});

document.getElementById('zipCode').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 5);
});

// Initialize checkout on page load
initCheckout(); 