// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
const author = urlParams.get('author');
const price = urlParams.get('price');
const imageUrl = urlParams.get('image');

// Populate book details
document.getElementById('bookTitle').textContent = title;
document.getElementById('bookAuthor').textContent = author;
document.getElementById('bookPrice').textContent = price;
document.getElementById('bookImage').src = imageUrl;

// Set page title
document.title = `${title} - BookStore`;

// Populate description (placeholder)
document.getElementById('bookDescription').textContent = `Discover the captivating story of "${title}" by ${author}. This remarkable book will take you on an unforgettable journey through its pages.`;

// Populate book details (placeholder)
document.getElementById('publisher').textContent = 'BookStore Publishing';
document.getElementById('publicationDate').textContent = '2024';
document.getElementById('pages').textContent = '300';
document.getElementById('language').textContent = 'English';
document.getElementById('isbn').textContent = '978-0123456789';
document.getElementById('dimensions').textContent = '6 x 9 inches';

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Quantity selector functionality
const quantityInput = document.getElementById('quantity');
const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');

minusBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
});

plusBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
    }
});

// Add to cart functionality
document.getElementById('addToCartBtn').addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    const bookData = {
        title,
        author,
        price: parseFloat(price.replace('$', '')),
        imageUrl,
        quantity
    };
    
    // Add to cart (assuming addToCart function exists in script.js)
    if (typeof addToCart === 'function') {
        addToCart(bookData);
    }
    
    // Show confirmation
    const button = document.getElementById('addToCartBtn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
    button.style.backgroundColor = '#27ae60';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '#3498db';
    }, 2000);
}); 