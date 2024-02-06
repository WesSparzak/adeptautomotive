from django.shortcuts import render
from .models import Salesperson, Customer, Sale, AutomobileVO
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
import json

class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
        'sold',
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'id',
        'first_name',
        'last_name',
        'employee_id',
    ]

@require_http_methods(["GET", "POST"])
def salesperson_list(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {'salesperson': salesperson},
            encoder= SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder= SalespersonEncoder,
            safe=False,
        )
             


@require_http_methods(["DELETE"])
def salesperson_delete(request, id):
    if request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

    
class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        'id',
        'first_name',
        'last_name',
        'address',
        'phone_number',
    ]

@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {'customer': customer},
            encoder= CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )
    
@require_http_methods(["DELETE"])
def customer_delete(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({'deleted': count > 0})

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        'id',
        'price',
    ]
    encoders = {
        'automobile': AutomobileEncoder(),
        'salesperson': SalespersonEncoder(),
        'customer': CustomerEncoder(),
    }

@require_http_methods(["GET", "POST"])
def sales_list(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False
        )
    

@require_http_methods
def delete_sale(request, id):
    if request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({'deleted': count > 0})
