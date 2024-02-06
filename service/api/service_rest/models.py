from django.db import models
from django.urls import reverse

# Create your models here.
#################################

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)

class Technician(models.Model):

    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    technician_id = models.CharField(max_length=2)


    def get_api_url(self):
        return reverse("api_show_location", kwargs={"pk": self.pk})

    def __str__(self):
        return self.first_name

    class Meta:
        ordering = ("first_name",)  # Default ordering for Technician

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=100)
    vin = models.CharField(max_length=17)  # Standard length for a VIN
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)

    def __str__(self):
        return f"Appointment for {self.customer} on {self.date_time.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        ordering = ("date_time",)

#################################
