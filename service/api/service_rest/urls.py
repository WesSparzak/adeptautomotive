from django.urls import path
from . import views

urlpatterns = [
    path('technicians/', views.api_list_technician, name='list_technicians'),
    path('technicians/<int:pk>/', views.api_edit_technician, name='edit_technician'),
    path('appointments/', views.api_list_appointment, name='list_appointments'),
<<<<<<< HEAD
    path('appointments/cancel/<int:pk>/', views.api_cancel_appointment, name='cancel_appointment'),
    path('appointments/finish/<int:pk>/', views.api_finish_appointment, name='finish_appointment'),
    path('appointments/search/', views.search_appointments, name='search_appointments'),
=======
    path('appointments/search/', views.search_appointments, name='search_appointments'),
    path('appointments/edit/<int:pk>/', views.api_edit_appointment, name='edit_appointment'),
    path('appointments/<int:pk>/update_status/', views.api_update_appointment_status, name='update_appointment_status'),
    path('appointments/search_appointments_by_vin/', views.search_appointments_by_vin, name='search_appointments_by_vin'),
>>>>>>> 63192c5210118820f53d60755b7bcddbd905e879
]
