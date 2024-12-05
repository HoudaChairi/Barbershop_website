from django.urls import path
from . import views

urlpatterns = [
    path('services/', views.get_services, name='services'),
    path('bookings/', views.get_bookings, name='get_bookings'),
    path('available-times/', views.get_available_times, name='available_times'),
    path('create-booking/', views.create_booking, name='create_booking'),
    path('update-booking/<int:booking_id>/', views.update_booking, name='update_booking'),
    path('cancel-booking/<int:booking_id>/', views.cancel_booking, name='cancel_booking'),
]
