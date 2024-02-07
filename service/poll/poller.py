import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something


import requests
from service_rest.models import AutomobileVO

def get_automobile():
    url = "http://project-beta-inventory-api-1:8000/api/automobiles/"
    response = requests.get(url)
    content = response.json()
    for automobile in content["automobiles"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"], #unique identifier
            defaults={"name": automobile["name"], "description": automobile["description"]} #everything else
        )

def poll():
    while True:
        print("Automobile poller pulling automobiles")
        try:
            get_automobile()

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
