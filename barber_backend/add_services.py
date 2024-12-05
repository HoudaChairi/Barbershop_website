import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'barber_backend.settings')
django.setup()

from booking.models import Service

services = [
    {
        'name': "Classic Haircut",
        'price': 30.00,
        'duration': 30,
    },
    {
        'name': "Beard Trim",
        'price': 20.00,
        'duration': 20,
    },
    {
        'name': "Hair & Beard Combo",
        'price': 45.00,
        'duration': 45,
    },
    {
        'name': "Premium Styling",
        'price': 40.00,
        'duration': 40,
    }
]

for service_data in services:
    Service.objects.get_or_create(
        name=service_data['name'],
        defaults={
            'price': service_data['price'],
            'duration': service_data['duration']
        }
    )
