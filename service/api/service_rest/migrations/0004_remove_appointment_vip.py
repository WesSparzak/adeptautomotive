# Generated by Django 4.0.3 on 2024-02-08 19:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_appointment_vip'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='vip',
        ),
    ]