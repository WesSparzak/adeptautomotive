# Generated by Django 4.0.3 on 2024-02-07 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0007_remove_automobilevo_import_href'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.CharField(max_length=15),
        ),
    ]