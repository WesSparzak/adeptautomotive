from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)
    sold = models.BooleanField()


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.SmallIntegerField()

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=10)

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=3
    )
