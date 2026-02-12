// DOM Elements
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const checkInBtn = document.getElementById('checkInBtn');
const checkOutBtn = document.getElementById('checkOutBtn');

// Current Date and Time Display
function updateDateTime() {
    const now = new Date();
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    
    // Format time
    const formattedTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
    });
    
    // Update elements if they exist
    const currentDateElement = document.getElementById('currentDate');
    const currentTimeElement = document.getElementById('currentTime');
    
    if (currentDateElement) {
        currentDateElement.textContent = formattedDate;
    }
    
    if (currentTimeElement) {
        currentTimeElement.textContent = formattedTime;
    }
}

// Modal Functions
function showLoginModal() {
    loginModal.style.display = 'flex';
    registerModal.style.display = 'none';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
}

function showRegisterModal() {
    registerModal.style.display = 'flex';
    loginModal.style.display = 'none';
}

function closeRegisterModal() {
    registerModal.style.display = 'none';
}

function switchToRegister() {
    closeLoginModal();
    showRegisterModal();
}

function switchToLogin() {
    closeRegisterModal();
    showLoginModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === registerModal) {
        closeRegisterModal();
    }
}

// Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        
        // Simple validation
        if (!email || !password || !role) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate login process
        console.log('Login attempt:', { email, role });
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Redirect based on role
            if (role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else if (role === 'user') {
                window.location.href = 'user-dashboard.html';
            }
            
            closeLoginModal();
        }, 1500);
    });
}

// Registration Form Submission
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const userType = document.getElementById('userType').value;
        
        // Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !userType) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        submitBtn.disabled = true;
        
        // Simulate registration
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            alert('Account created successfully! You can now login.');
            switchToLogin();
        }, 2000);
    });
}

// Check In/Out Functionality
if (checkInBtn && checkOutBtn) {
    let isCheckedIn = false;
    let checkInTime = null;
    
    checkInBtn.addEventListener('click', function() {
        if (!isCheckedIn) {
            // Get current time
            const now = new Date();
            checkInTime = now;
            
            // Format time for display
            const options = { hour: '2-digit', minute: '2-digit', hour12: true };
            const formattedTime = now.toLocaleTimeString('en-US', options);
            
            // Update UI
            const checkInTimeElement = document.querySelector('.check-in-time');
            if (checkInTimeElement) {
                checkInTimeElement.textContent = `Checked in: ${formattedTime}`;
            }
            
            // Update status
            const statusIndicator = document.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.innerHTML = '<i class="fas fa-user-check"></i><span>Present - Checked In</span>';
                statusIndicator.className = 'status-indicator present';
            }
            
            // Update buttons
            checkInBtn.disabled = true;
            checkOutBtn.disabled = false;
            isCheckedIn = true;
            
            // Show notification
            showNotification('Successfully checked in!', 'success');
            
            // Simulate sending to server
            console.log('Checked in at:', formattedTime);
        }
    });
    
    checkOutBtn.addEventListener('click', function() {
        if (isCheckedIn && checkInTime) {
            const now = new Date();
            const checkOutTime = now;
            
            // Calculate hours worked
            const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);
            
            // Format time for display
            const options = { hour: '2-digit', minute: '2-digit', hour12: true };
            const formattedTime = now.toLocaleTimeString('en-US', options);
            
            // Update UI
            const statusIndicator = document.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.innerHTML = '<i class="fas fa-sign-out-alt"></i><span>Checked Out</span>';
                statusIndicator.className = 'status-indicator leave';
            }
            
            // Update buttons
            checkInBtn.disabled = false;
            checkOutBtn.disabled = true;
            isCheckedIn = false;
            
            // Show notification with hours worked
            showNotification(`Checked out! You worked ${hoursWorked.toFixed(2)} hours today.`, 'success');
            
            // Simulate sending to server
            console.log('Checked out at:', formattedTime, 'Hours worked:', hoursWorked.toFixed(2));
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
                max-width: 350px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            .notification-success { background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); }
            .notification-info { background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); }
            .notification-warning { background: linear-gradient(135deg, #f39c12 0%, #d35400 100%); }
            .notification-error { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: auto;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Calendar Generation for User Dashboard
function generateCalendar() {
    const calendarDates = document.querySelector('.calendar-dates');
    if (!calendarDates) return;
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0);
    // Get number of days in month
    const daysInMonth = lastDay.getDate();
    // Get starting day (0 = Sunday, 1 = Monday, etc.)
    const startingDay = firstDay.getDay();
    
    // Clear calendar
    calendarDates.innerHTML = '';
    
    // Add empty cells for days before the first day
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-date';
        calendarDates.appendChild(emptyCell);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.className = 'calendar-date';
        dateCell.textContent = day;
        
        // Simulate attendance status (in a real app, this would come from the server)
        const status = getRandomStatus();
        if (status) {
            dateCell.classList.add(status);
            
            // Add tooltip
            dateCell.title = `${getStatusText(status)} on ${month + 1}/${day}/${year}`;
        }
        
        // Highlight current day
        const currentDate = new Date();
        if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            dateCell.style.border = '2px solid #6a11cb';
            dateCell.style.fontWeight = 'bold';
        }
        
        calendarDates.appendChild(dateCell);
    }
}

// Helper function for calendar status
function getRandomStatus() {
    const statuses = ['present', 'absent', 'present', 'present', 'leave', 'present', null, 'holiday'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function getStatusText(status) {
    const statusMap = {
        'present': 'Present',
        'absent': 'Absent',
        'leave': 'On Leave',
        'holiday': 'Holiday'
    };
    return statusMap[status] || '';
}

// Chart.js Implementation for Admin Dashboard
function initializeAttendanceChart() {
    const chartCanvas = document.getElementById('attendanceChart');
    if (!chartCanvas) return;
    
    const ctx = chartCanvas.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Present',
                data: [85, 82, 88, 90],
                backgroundColor: 'rgba(46, 204, 113, 0.5)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Absent',
                data: [8, 10, 6, 5],
                backgroundColor: 'rgba(231, 76, 60, 0.5)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Late',
                data: [7, 8, 6, 5],
                backgroundColor: 'rgba(243, 156, 18, 0.5)',
                borderColor: 'rgba(243, 156, 18, 1)',
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Weekly Attendance Trends'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Employees'
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Generate calendar for user dashboard
    generateCalendar();
    
    // Initialize chart for admin dashboard
    if (typeof Chart !== 'undefined') {
        initializeAttendanceChart();
    }
    
    // Add active state to sidebar menu items
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(i => i.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
    
    // Handle approval buttons
    const approveBtns = document.querySelectorAll('.btn-approve');
    const rejectBtns = document.querySelectorAll('.btn-reject');
    
    approveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.approval-item');
            showNotification('Request approved successfully!', 'success');
            item.style.opacity = '0.5';
            setTimeout(() => item.remove(), 500);
        });
    });
    
    rejectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.approval-item');
            showNotification('Request rejected.', 'warning');
            item.style.opacity = '0.5';
            setTimeout(() => item.remove(), 500);
        });
    });
    
    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showNotification(`${action} feature would open here`, 'info');
        });
    });
    
    // Quick links
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.querySelector('span').textContent;
            showNotification(`${linkText} page would open here`, 'info');
        });
    });
    
    // Leave form submission
    const leaveForm = document.querySelector('.leave-form');
    if (leaveForm) {
        leaveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const leaveType = document.getElementById('leaveType').value;
            const leaveDate = document.getElementById('leaveDate').value;
            
            if (!leaveDate) {
                alert('Please select a date');
                return;
            }
            
            showNotification(`Leave request submitted for ${leaveDate} (${leaveType})`, 'success');
            this.reset();
        });
    }
});