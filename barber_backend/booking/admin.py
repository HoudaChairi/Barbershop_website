from django.contrib import admin
from .models import Service, Booking

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration')
    search_fields = ('name',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'service', 'date', 'time', 'customer_email', 'customer_phone')
    list_filter = ('date', 'service')
    search_fields = ('customer_name', 'customer_email')
