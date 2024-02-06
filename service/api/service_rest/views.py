import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment
from .common import ModelEncoder
#######################################
#####ENCODERS##########################

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name",
                  "technician_id",]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "technician_id",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician_id"
                  ]

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician_id"
        ]

#######################################
#####VIEWS/API ENDPOINTS###############


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": [TechnicianListEncoder(technician).data for technician in technicians]},
            safe=False,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            TechnicianDetailEncoder(technician).data,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_delete_technician(request, pk):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": [AppointmentListEncoder(appointment).data for appointment in appointments]},
            safe=False,
        )
    else:
        content = json.loads(request.body)
        content.setdefault('status', 'current')  # Set default status to 'current', this is going to be my neutral state
        appointment = Appointment.objects.create(**content)
        return JsonResponse(AppointmentDetailEncoder(appointment).data,
            safe=False
            )

@require_http_methods(["DELETE"])
def api_delete_appointment(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
        appointment.status = "cancelled"
        appointment.save()
        return JsonResponse(AppointmentDetailEncoder(appointment).data)
    except Appointment.DoesNotExist:
        return JsonResponse({"error": "Appointment not found"}, status=404)

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(AppointmentDetailEncoder(appointment).data)
    except Appointment.DoesNotExist:
        return JsonResponse({"error": "Appointment not found"}, status=404)

    # if request.method == "GET":
    #     technicians = Technician.objects.all()
    #     return JsonResponse(
    #         {"technicians": technicians},
    #         encoder=TechnicianListEncoder,
    #     )
    # else:
    #     content = json.loads(request.body)


    #     try:
    #         technician = Technician.objects.get(id=content["technician"])
    #         content["technician"] = technician
    #     except Technician.DoesNotExist:
    #         return JsonResponse(
    #             {"message": "Invalid technician id"},
    #             status=400,
    #         )

    #     technician = Technician.objects.create(**content)
    #     return JsonResponse(
    #         technician,
    #         encoder=TechnicianDetailEncoder,
    #         safe=False,
    #     )
