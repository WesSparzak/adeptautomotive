from django.urls import path
from .views import salesperson_list, salesperson_delete, customer_list, customer_delete, sales_list, delete_sale


urlpatterns = {
    path ('salespeople/', salesperson_list, name="salesperson_list" ),
    path ('salespeople/<int:id>/', salesperson_delete, name="salesperson_delete"),
    path ('customers/', customer_list, name="customer_list"),
    path ('customers/<int:id>/', customer_delete, name='customer_delete'),
    path ('sales/', sales_list, name='sales_list'),
    path ('sales/<int:id>/', delete_sale, name='delete_sale'),
}