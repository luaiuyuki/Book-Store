// Check if user is logged in as admin
if (!localStorage.getItem('adminSession')) {
    window.location.href = './index.html';
}

// Display admin email
document.getElementById('adminEmail').textContent = localStorage.getItem('userEmail');

// Handle mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const adminSidebar = document.querySelector('.admin-sidebar');

menuToggle.addEventListener('click', () => {
    adminSidebar.classList.toggle('show');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !e.target.closest('.admin-sidebar') && !e.target.closest('#menuToggle')) {
        adminSidebar.classList.remove('show');
    }
});

// Handle sidebar navigation
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Show corresponding section
        const sectionId = item.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
            adminSidebar.classList.remove('show');
        }
    });
});

// Initialize Charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                fill: true
            }]
        };

        new Chart(revenueCtx, {
            type: 'line',
            data: revenueData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + value.toLocaleString()
                        }
                    }
                }
            }
        });
    }

    // Top Books Chart
    const topBooksCtx = document.getElementById('topBooksChart');
    if (topBooksCtx) {
        const topBooksData = {
            labels: ['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5'],
            datasets: [{
                data: [300, 250, 200, 150, 100],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#FF9800',
                    '#9C27B0',
                    '#F44336'
                ]
            }]
        };

        new Chart(topBooksCtx, {
            type: 'doughnut',
            data: topBooksData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
}

// Handle Add Product Form
document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        price: document.getElementById('bookPrice').value,
        category: document.getElementById('bookCategory').value,
        description: document.getElementById('bookDescription').value,
        image: document.getElementById('bookImage').files[0]
    };
    
    console.log('New product data:', formData);
    alert('Product added successfully!');
    e.target.reset();
});

// Handle search functionality
document.querySelectorAll('.search-bar input').forEach(searchInput => {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const section = e.target.closest('.dashboard-section');
        const rows = section.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
});

// Handle action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.currentTarget.classList.contains('view-btn') ? 'view' :
                      e.currentTarget.classList.contains('edit-btn') ? 'edit' :
                      e.currentTarget.classList.contains('delete-btn') ? 'delete' :
                      'restock';
                      
        const row = e.currentTarget.closest('tr');
        const id = row.cells[0].textContent;
        
        console.log(`${action} item with ID: ${id}`);
        
        if (action === 'delete' && confirm('Are you sure you want to delete this item?')) {
            row.remove();
        }
    });
});

// Handle time range filter
document.getElementById('timeRange').addEventListener('change', (e) => {
    const timeRange = e.target.value;
    console.log('Selected time range:', timeRange);
    // In a real application, this would update the dashboard data based on the selected time range
});

// Load charts when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load Chart.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = initializeCharts;
    document.head.appendChild(script);
}); 