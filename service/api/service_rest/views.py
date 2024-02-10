import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Appointment, Technician
from common.json import ModelEncoder
from django.db.models import Q
from django.shortcuts import render
import sys
#######################################
#####ENCODERS##########################

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name",
            "technician_id",
            ]


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
        "technician_id",
        "id"
            ]

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician_id",
        "id"
        ]

#######################################
#####VIEWS/API ENDPOINTS###############

@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def api_edit_technician(request, pk):
    if request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()

        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            # this part is going to set default status to 'pending' if not specified in the request body
            if 'status' not in content or content['status'] == '':
                content['status'] = 'pending'
            technician = Technician.objects.get(id=content['technician_id'])
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Exception as e:
            exc_type = type(e).__name__
            exc_value = str(e)
            return JsonResponse({
                "message": "Could not create the appointment",
                "exception": {
                    "type": exc_type,
                    "value": exc_value
                }
            }, status=400)

@require_http_methods(["DELETE"])
def api_edit_appointment(request, pk):
    if request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()

            return JsonResponse({"message": "Appointment deleted successfully"}, status=204)
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"}, status=404)



@require_http_methods(["PUT"])
def api_update_appointment_status(request, pk):
    try:

        data = json.loads(request.body)
        new_status = data.get('status', None)


        if new_status not in ['cancelled', 'finished', 'pending']:
            return JsonResponse({"message": "Invalid or missing status"}, status=400)


        appointment = Appointment.objects.get(pk=pk)
        appointment.status = new_status
        appointment.save()

        return JsonResponse({"message": "Appointment status updated successfully", "status": new_status}, status=200)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON"}, status=400)





def search_appointments(request):
    if request.method == 'POST':
        vin = request.POST.get('vin')
        appointments = Appointment.objects.filter(vin=vin).select_related('technician').all()
    else:
        appointments = Appointment.objects.all().select_related('technician')

    appointments_data = [
        {
            'vin': appt.vin,
            'customer_name': appt.customer,
            'date_time': appt.date_time,
            'technician_name': appt.technician.first_name + " " + appt.technician.last_name,
            'reason': appt.reason,
            'status': appt.status,
        }
        for appt in appointments
    ]

    return render(request, 'appointments/search_appointments.html', {
        'appointments': appointments_data
    })



@require_http_methods(["GET"])
def search_appointments_by_vin(request):
    vin = request.GET.get('vin', '')

    if vin:
        appointments = Appointment.objects.filter(vin=vin)
    else:
        appointments = Appointment.objects.all()


    appointments_data = list(appointments.values(
        'id', 'date_time', 'reason', 'status', 'vin', 'customer', 'technician_id'
    ))
    return JsonResponse(appointments_data, safe=False)

