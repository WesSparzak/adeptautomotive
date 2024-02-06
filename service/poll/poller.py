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
    url = "http://localhost:8100/api/automobiles/"
    response = requests.get(url)
    content = response.json()
    print ("Just polled...")
    print ("AutomobileVO", AutomobileVO.objects.all())
    print ("content", content)
    for automobile in content["automobiles"]:
        print ("automobile", automobile)
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"], #unique identifier
            defaults={"name": automobile["name"], "description": automobile["description"]} #everything else
        )

def poll():
    while True:
        print('Autmobile poller pulling automobiles')
        try:
            get_automobile()

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
