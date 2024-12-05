export class BookingManager {
    constructor() {
        this.selectedDate = null;
        this.selectedTime = null;
        this.selectedService = null;
        this.API_BASE_URL = 'http://localhost:8000/api';
        this.services = [];
        this.initializeEventListeners();
        this.loadServices();
    }

    async loadServices() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/services/`);
            const data = await response.json();
            this.services = data.services;
            this.renderServices(data.services);
        } catch (error) {
            this.showNotification('Error loading services');
        }
    }

    renderServices(services) {
        const serviceSelect = document.getElementById('service');
        serviceSelect.innerHTML = '<option value="">Choose a service...</option>';
        
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = `${service.name} - $${service.price}`;
            serviceSelect.appendChild(option);
        });
    }

    async getAvailableTimeSlots(date) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/available-times/?date=${date}`);
            const data = await response.json();
            return data.available_times;
        } catch (error) {
            this.showNotification('Error loading available times');
            return [];
        }
    }

    async renderTimeSlots(date) {
        const timeSlotsContainer = document.getElementById('time-slots');
        timeSlotsContainer.innerHTML = '';
        
        const availableSlots = await this.getAvailableTimeSlots(date);
        availableSlots.forEach(time => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.textContent = time;
            slot.addEventListener('click', () => this.selectTimeSlot(time, slot));
            timeSlotsContainer.appendChild(slot);
        });
    }

    selectTimeSlot(time, element) {
        document.querySelectorAll('.time-slot').forEach(slot => 
            slot.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedTime = time;
        this.updateSummary();
    }

    updateSummary() {
        const summaryContent = document.getElementById('summary-content');
        if (!this.selectedService || !this.selectedDate || !this.selectedTime) {
            summaryContent.innerHTML = '<p>Please select all booking details</p>';
            return;
        }

        summaryContent.innerHTML = `
            <p><strong>Service:</strong> ${this.selectedService.name}</p>
            <p><strong>Price:</strong> $${this.selectedService.price}</p>
            <p><strong>Date:</strong> ${this.selectedDate}</p>
            <p><strong>Time:</strong> ${this.selectedTime}</p>
            <p><strong>Duration:</strong> ${this.selectedService.duration} minutes</p>
        `;
    }

    initializeEventListeners() {
        const serviceSelect = document.getElementById('service');
        const dateInput = document.getElementById('date');
        const bookBtn = document.getElementById('book-btn');

        serviceSelect.addEventListener('change', (e) => {
            const selectedId = parseInt(e.target.value);
            this.selectedService = this.services.find(s => s.id === selectedId);
            this.updateSummary();
        });

        dateInput.addEventListener('change', (e) => {
            this.selectedDate = e.target.value;
            this.renderTimeSlots(this.selectedDate);
            this.updateSummary();
        });

        bookBtn.addEventListener('click', () => this.submitBooking());
    }

    async submitBooking() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (!name || !email || !phone || !this.selectedService || !this.selectedDate || !this.selectedTime) {
            this.showNotification('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch(`${this.API_BASE_URL}/create-booking/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: this.selectedService.id,
                    name: name,
                    email: email,
                    phone: phone,
                    date: this.selectedDate,
                    time: this.selectedTime
                })
            });

            const data = await response.json();
            if (response.ok) {
                this.showNotification('Booking created successfully!');
                this.resetForm();
            } else {
                this.showNotification(data.error || 'Error creating booking');
            }
        } catch (error) {
            this.showNotification('Error creating booking');
        }
    }

    resetForm() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('service').value = '';
        document.getElementById('date').value = '';
        document.getElementById('time-slots').innerHTML = '';
        this.selectedService = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.updateSummary();
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}