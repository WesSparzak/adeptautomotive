from django.urls import path
from . import views

urlpatterns = [
    path('technicians/', views.api_list_technician, name='api_list_technician'),
    path('technicians/delete/<int:pk>/', views.api_delete_technician, name='api_delete_technician'),
    path('appointments/', views.api_list_appointments, name='api_list_appointments'),
    path('appointments/delete/<int:pk>/', views.api_delete_appointment, name='api_delete_appointment'),
    path('appointments/cancel/<int:pk>/', views.api_cancel_appointment, name='api_cancel_appointment'),
    path('appointments/finish/<int:pk>/', views.api_finish_appointment, name='api_finish_appointment'),
]
