from django.urls import path
from . import views

urlpatterns = [
    path('technicians/', views.api_list_technician, name='list_technicians'),
    path('technicians/<int:pk>/', views.api_edit_technician, name='edit_technician'),
    path('appointments/', views.api_list_appointment, name='list_appointments'),
    path('appointments/cancel/<int:pk>/', views.api_cancel_appointment, name='cancel_appointment'),
    path('appointments/finish/<int:pk>/', views.api_finish_appointment, name='finish_appointment'),
    path('appointments/search/', search_appointments, name='search_appointments'),
]
