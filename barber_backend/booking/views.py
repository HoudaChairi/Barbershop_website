from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Service, Booking
import json
from datetime import datetime, time

def get_services(request):
    services = Service.objects.all()
    services_list = [
        {
            'id': service.id,
            'name': service.name,
            'price': float(service.price),
            'duration': service.duration
        }
        for service in services
    ]
    return JsonResponse({'services': services_list})

def get_bookings(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({'error': 'Email is required'}, status=400)
        
    bookings = Booking.objects.filter(customer_email=email).select_related('service')
    bookings_list = [
        {
            'id': booking.id,
            'service': {
                'id': booking.service.id,
                'name': booking.service.name,
                'price': float(booking.service.price),
                'duration': booking.service.duration
            },
            'date': booking.date.strftime('%Y-%m-%d'),
            'time': booking.time.strftime('%H:%M'),
            'customer_name': booking.customer_name,
            'customer_email': booking.customer_email,
            'customer_phone': booking.customer_phone
        }
        for booking in bookings
    ]
    return JsonResponse({'bookings': bookings_list})

def get_available_times(request):
    date_str = request.GET.get('date')
    if not date_str:
        return JsonResponse({'error': 'Date is required'}, status=400)
    
    try:
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return JsonResponse({'error': 'Invalid date format'}, status=400)
    
    booked_times = set(
        Booking.objects.filter(date=date).values_list('time', flat=True)
    )
    
    available_times = []
    for hour in range(9, 17):
        for minute in [0, 30]:
            slot_time = time(hour, minute)
            if slot_time not in booked_times:
                available_times.append(slot_time.strftime('%H:%M'))
    
    return JsonResponse({'available_times': available_times})

@csrf_exempt
@require_http_methods(["POST"])
def create_booking(request):
    try:
        data = json.loads(request.body)
        service = Service.objects.get(id=data['service_id'])
        
        date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        time = datetime.strptime(data['time'], '%H:%M').time()
        
        booking = Booking.objects.create(
            service=service,
            customer_name=data['name'],
            customer_email=data['email'],
            customer_phone=data['phone'],
            date=date,
            time=time
        )
        
        return JsonResponse({
            'message': 'Booking created successfully',
            'booking_id': booking.id
        })
        
    except Service.DoesNotExist:
        return JsonResponse({'error': 'Service not found'}, status=404)
    except KeyError as e:
        return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["PUT"])
def update_booking(request, booking_id):
    try:
        data = json.loads(request.body)
        booking = Booking.objects.get(id=booking_id)
        
        if 'service_id' in data:
            service = Service.objects.get(id=data['service_id'])
            booking.service = service
        
        if 'date' in data:
            booking.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        
        if 'time' in data:
            booking.time = datetime.strptime(data['time'], '%H:%M').time()
            
        if 'name' in data:
            booking.customer_name = data['name']
            
        if 'phone' in data:
            booking.customer_phone = data['phone']
            
        booking.save()
        
        return JsonResponse({'message': 'Booking updated successfully'})
        
    except (Booking.DoesNotExist, Service.DoesNotExist):
        return JsonResponse({'error': 'Booking or service not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["DELETE"])
def cancel_booking(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id)
        booking.delete()
        return JsonResponse({'message': 'Booking cancelled successfully'})
    except Booking.DoesNotExist:
        return JsonResponse({'error': 'Booking not found'}, status=404)
