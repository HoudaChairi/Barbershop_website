import { createServiceCard } from './services.js';
import { BookingManager } from './booking.js';

document.addEventListener('DOMContentLoaded', async () => {
    const bookingManager = new BookingManager();
    const API_BASE_URL = 'http://localhost:8000/api';

    const servicesGrid = document.getElementById('services-grid');
    
    try {
        const response = await fetch(`${API_BASE_URL}/services/`);
        const data = await response.json();
        
        data.services.forEach(service => {
            servicesGrid.appendChild(createServiceCard(service));
        });
    } catch (error) {
        console.error('Error loading services:', error);
    }

    document.getElementById('book-btn').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (!name || !email || !phone || !bookingManager.selectedService || 
            !bookingManager.selectedDate || !bookingManager.selectedTime) {
            bookingManager.showNotification('Please fill in all required fields');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/create-booking/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: bookingManager.selectedService.id,
                    name: name,
                    email: email,
                    phone: phone,
                    date: bookingManager.selectedDate,
                    time: bookingManager.selectedTime
                })
            });

            const data = await response.json();
            if (response.ok) {
                bookingManager.showNotification('Booking created successfully!');
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('service').value = '';
                document.getElementById('date').value = '';
                bookingManager.selectedService = null;
                bookingManager.selectedDate = null;
                bookingManager.selectedTime = null;
                bookingManager.updateSummary();
            } else {
                bookingManager.showNotification(data.error || 'Error creating booking');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            bookingManager.showNotification('Error creating booking');
        }
    });
});