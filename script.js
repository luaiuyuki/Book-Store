// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const checkoutButton = document.getElementById('checkoutButton');

// Update cart count display
cartCountElement.textContent = cartCount;

// Cart icon click handler
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateCartDisplay();
    cartDropdown.classList.toggle('show');
});

// Close cart dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.cart-wrapper')) {
        cartDropdown.classList.remove('show');
    }
});

// Prevent closing when clicking inside the dropdown
cartDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bookCard = button.closest('.book-card');
        const title = bookCard.querySelector('h3').textContent;
        const author = bookCard.querySelector('.author').textContent;
        const price = parseFloat(bookCard.querySelector('.price').textContent.replace('$', ''));
        const imageUrl = bookCard.querySelector('img').src;

        addToCart({ title, author, price, imageUrl });
        
        // Animation effect
        button.textContent = 'Added!';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '#3498db';
        }, 1000);

        // Show cart dropdown when adding items
        cartDropdown.classList.add('show');
    });
});

// Add item to cart
function addToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.title === item.title);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    saveCart();
}

// Update cart count
function updateCartCount() {
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
}

// Update cart display
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItemsContainer.style.display = 'none';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <div class="cart-item-details">
                <span class="cart-item-title">${item.title}</span>
                <span class="cart-item-author">${item.author}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                    <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        
        // Add quantity button handlers
        cartItemElement.querySelector('.minus').addEventListener('click', () => updateItemQuantity(item, -1));
        cartItemElement.querySelector('.plus').addEventListener('click', () => updateItemQuantity(item, 1));
        cartItemElement.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(item));
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    updateCartTotal();
}

// Update item quantity
function updateItemQuantity(item, change) {
    const index = cartItems.findIndex(cartItem => cartItem.title === item.title);
    if (index !== -1) {
        cartItems[index].quantity += change;
        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1);
        }
        updateCartCount();
        updateCartDisplay();
        saveCart();
    }
}

// Remove item from cart
function removeFromCart(item) {
    const index = cartItems.findIndex(cartItem => cartItem.title === item.title);
    if (index !== -1) {
        cartItems.splice(index, 1);
        updateCartCount();
        updateCartDisplay();
        saveCart();
    }
}

// Update cart total
function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Checkout button handler
checkoutButton.addEventListener('click', () => {
    if (cartItems.length > 0) {
        window.location.href = 'checkout.html';
    }
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        // In a real application, this would make an API call to search for books
        alert(`Searching for: ${searchTerm}`);
    }
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = newsletterForm.querySelector('input');
const newsletterButton = newsletterForm.querySelector('button');

newsletterButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = newsletterInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // In a real application, this would make an API call to subscribe the email
        newsletterInput.value = '';
        alert('Thank you for subscribing to our newsletter!');
    } else {
        alert('Please enter a valid email address.');
    }
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scroll for anchor links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile responsiveness
const navLinks = document.querySelector('.nav-links');

// Window resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// New Releases Page Functionality
if (document.querySelector('.new-releases-page')) {
    const monthFilter = document.getElementById('month-filter');
    const genreFilter = document.getElementById('genre-filter');
    
    // Filter functionality (in a real application, this would make API calls)
    [monthFilter, genreFilter].forEach(filter => {
        filter.addEventListener('change', () => {
            const month = monthFilter.value;
            const genre = genreFilter.value;
            console.log(`Filtering by: Month - ${month}, Genre - ${genre}`);
            // In a real application, this would trigger an API call and refresh the book list
        });
    });
}

// Contact Form Functionality
if (document.querySelector('.contact-page')) {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, this would make an API call to submit the form
        console.log('Form submitted with data:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// FAQ Functionality (if needed to add accordion or other interactions)
if (document.querySelector('.faq-section')) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle answer visibility
            const isVisible = answer.style.display === 'block';
            answer.style.display = isVisible ? 'none' : 'block';
            
            // Add/remove active class for styling
            question.classList.toggle('active');
        });
    });
}

// Pre-order button functionality
const preOrderButtons = document.querySelectorAll('.pre-order');
preOrderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bookTitle = button.closest('.book-card').querySelector('h3').textContent;
        alert(`Pre-order placed for: ${bookTitle}\nYou will be notified when the book is available.`);
        
        // Animation effect
        button.textContent = 'Pre-ordered!';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            button.textContent = 'Pre-order';
            button.style.backgroundColor = '#27ae60';
        }, 1000);
    });
});

// Auth Modal Functionality
const userIcon = document.querySelector('.user-icon');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeButtons = document.querySelectorAll('.close-button');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Show login modal when clicking user icon
userIcon.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('show');
});

// Close modals when clicking close button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.classList.remove('show');
        registerModal.classList.remove('show');
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('show');
    }
});

// Switch between login and register modals
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('show');
    registerModal.classList.add('show');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('show');
    loginModal.classList.add('show');
});

// Simulated admin credentials (in a real app, this would be in a secure backend)
const ADMIN_CREDENTIALS = {
    email: 'admin@gmail.com',
    password: 'admin123'
};

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check if admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // Store admin session
        localStorage.setItem('adminSession', 'true');
        localStorage.setItem('userEmail', email);
        
        // Redirect to admin dashboard
        window.location.href = './admin-dashboard.html';
        return;
    }

    // Regular user login (existing code)
    console.log('Login attempt:', { email, password });
    alert('Login successful!');
    loginModal.classList.remove('show');
    
    // Update UI to show logged-in state
    updateUserInterface(email);
});

// Handle registration form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // In a real application, this would make an API call to register
    console.log('Registration attempt:', { name, email, password });

    // Simulate successful registration
    alert('Registration successful! Please log in.');
    registerModal.classList.remove('show');
    loginModal.classList.add('show');
});

// Function to update UI after successful login
function updateUserInterface(email) {
    const userIconLink = document.querySelector('.user-icon');
    userIconLink.innerHTML = `<i class="fas fa-user"></i>`;
    userIconLink.title = `Logged in as ${email}`;
    
    // Add logout functionality
    userIconLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Do you want to log out?')) {
            // In a real application, this would clear the session
            location.reload();
        }
    });
}

// Password validation
const registerPassword = document.getElementById('registerPassword');
const confirmPassword = document.getElementById('confirmPassword');

function validatePassword() {
    if (registerPassword.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
    } else {
        confirmPassword.setCustomValidity('');
    }
}

registerPassword.addEventListener('change', validatePassword);
confirmPassword.addEventListener('keyup', validatePassword);

// Make book cards clickable
document.querySelectorAll('.book-card').forEach(card => {
    // Add click event to the entire card except buttons
    card.addEventListener('click', (e) => {
        // Don't navigate if clicking on a button
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }
        
        const title = card.querySelector('h3').textContent;
        const author = card.querySelector('.author').textContent;
        const price = card.querySelector('.price').textContent;
        const imageUrl = card.querySelector('img').src;
        
        // Create URL-friendly title for the route
        const titleSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Navigate to book detail page with parameters
        window.location.href = `./book-detail.html?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(imageUrl)}&slug=${titleSlug}`;
    });
    
    // Add pointer cursor to indicate clickability
    card.style.cursor = 'pointer';
});

// Function to check admin session
function checkAdminSession() {
    return localStorage.getItem('adminSession') === 'true';
}

// Function to logout
function logout() {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('userEmail');
    window.location.href = './index.html';
} 