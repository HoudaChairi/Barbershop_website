const API_BASE_URL = 'http://localhost:8000/api';
let currentBooking = null;
let services = [];

async function loadServices() {
    try {
        const response = await fetch(`${API_BASE_URL}/services/`);
        const data = await response.json();
        services = data.services;
        
        const serviceSelect = document.getElementById('edit-service');
        serviceSelect.innerHTML = '<option value="">Choose a service...</option>';
        
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = `${service.name} - $${service.price}`;
            serviceSelect.appendChild(option);
        });
    } catch (error) {
        showNotification('Error loading services');
    }
}

async function loadBookings() {
    const email = document.getElementById('email-search').value;
    if (!email) {
        showNotification('Please enter your email');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/bookings/?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        
        const bookingsList = document.getElementById('bookings-list');
        bookingsList.innerHTML = '';
        
        if (data.bookings.length === 0) {
            bookingsList.innerHTML = '<p>No bookings found for this email.</p>';
            return;
        }
        
        data.bookings.forEach(booking => {
            const card = document.createElement('div');
            card.className = 'booking-card';
            card.innerHTML = `
                <h3>${booking.service.name}</h3>
                <div class="booking-details">
                    <p><strong>Date:</strong> ${booking.date}</p>
                    <p><strong>Time:</strong> ${booking.time}</p>
                    <p><strong>Price:</strong> $${booking.service.price}</p>
                    <p><strong>Duration:</strong> ${booking.service.duration} minutes</p>
                </div>
                <div class="booking-actions">
                    <button class="btn btn-edit" onclick="editBooking(${JSON.stringify(booking).replace(/"/g, '&quot;')})">
                        Edit
                    </button>
                    <button class="btn btn-cancel" onclick="cancelBooking(${booking.id})">
                        Cancel
                    </button>
                </div>
            `;
            bookingsList.appendChild(card);
        });
    } catch (error) {
        showNotification('Error loading bookings');
    }
}

async function getAvailableTimeSlots(date, excludeCurrentTime = false) {
    try {
        const response = await fetch(`${API_BASE_URL}/available-times/?date=${date}`);
        const data = await response.json();
        let times = data.available_times;
        
        if (excludeCurrentTime && currentBooking) {
            times.push(currentBooking.time);
            times.sort();
        }
        
        return times;
    } catch (error) {
        showNotification('Error loading available times');
        return [];
    }
}

async function renderTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('edit-time-slots');
    timeSlotsContainer.innerHTML = '';
    
    const availableSlots = await getAvailableTimeSlots(date, true);
    availableSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        if (currentBooking && time === currentBooking.time) {
            slot.classList.add('selected');
        }
        slot.textContent = time;
        slot.addEventListener('click', () => selectTimeSlot(time, slot));
        timeSlotsContainer.appendChild(slot);
    });
}

function selectTimeSlot(time, element) {
    document.querySelectorAll('.time-slot').forEach(slot => 
        slot.classList.remove('selected'));
    element.classList.add('selected');
    currentBooking.time = time;
}

function editBooking(booking) {
    currentBooking = booking;
    
    const form = document.getElementById('edit-form');
    form.classList.add('active');
    
    document.getElementById('edit-service').value = booking.service.id;
    document.getElementById('edit-date').value = booking.date;
    document.getElementById('edit-name').value = booking.customer_name;
    document.getElementById('edit-phone').value = booking.customer_phone;
    
    renderTimeSlots(booking.date);
    
    document.getElementById('edit-date').addEventListener('change', (e) => {
        renderTimeSlots(e.target.value);
    });
}

function cancelEdit() {
    currentBooking = null;
    document.getElementById('edit-form').classList.remove('active');
}

async function updateBooking() {
    if (!currentBooking) return;
    
    const updatedData = {
        service_id: document.getElementById('edit-service').value,
        date: document.getElementById('edit-date').value,
        time: currentBooking.time,
        name: document.getElementById('edit-name').value,
        phone: document.getElementById('edit-phone').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/update-booking/${currentBooking.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });
        
        if (response.ok) {
            showNotification('Booking updated successfully');
            cancelEdit();
            loadBookings();
        } else {
            const data = await response.json();
            showNotification(data.error || 'Error updating booking');
        }
    } catch (error) {
        showNotification('Error updating booking');
    }
}

async function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/cancel-booking/${bookingId}/`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Booking cancelled successfully');
            loadBookings();
        } else {
            const data = await response.json();
            showNotification(data.error || 'Error cancelling booking');
        }
    } catch (error) {
        showNotification('Error cancelling booking');
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    
    // Load bookings if email is in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        document.getElementById('email-search').value = email;
        loadBookings();
    }
});

// Make functions available globally
window.loadBookings = loadBookings;
window.editBooking = editBooking;
window.cancelEdit = cancelEdit;
window.updateBooking = updateBooking;
window.cancelBooking = cancelBooking;
