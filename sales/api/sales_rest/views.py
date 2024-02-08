from django.shortcuts import render
from .models import Salesperson, Customer, Sale, AutomobileVO
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
import json


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'id',
        'first_name',
        'last_name',
        'employee_id',
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        'id',
        'first_name',
        'last_name',
        'address',
        'phone_number',
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
        'id',
        'sold',
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        'id',
        'price',
        'automobile',
        'salesperson',
        'customer'
    ]
    encoders = {
        'automobile': AutomobileVOEncoder(),
        'salesperson': SalespersonEncoder(),
        'customer': CustomerEncoder(),
    }

    # class Object:
    #     def toJSON(self):
    #         return json.dumps(self, default=lambda o: o.__dict__, 
    #             sort_keys=True, indent=4)
    
    


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


@require_http_methods(["GET", "POST"])
def sales_list(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"sale": sale},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "automobile doesn't exist"},
                status=400,
            )
        try:
            id = content['salesperson']
            salesperson = Salesperson.objects.get(id=id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "salesperson doesn't exist"},
                status=400,
            )
        try:
            id = content['customer']
            customer = Customer.objects.get(id=id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "customer doesn't exist"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
    

@require_http_methods(["DELETE"])
def delete_sale(request, id):
    if request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({'deleted': count > 0})

