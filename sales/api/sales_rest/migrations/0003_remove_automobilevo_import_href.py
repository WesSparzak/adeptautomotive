# Generated by Django 4.0.3 on 2024-02-06 15:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_remove_automobilevo_sold_automobilevo_import_href'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='import_href',
        ),
    ]
