import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO


def get_automobile():
    url = 'http://project-beta-inventory-api-1:8000/api/automobiles/'
    response = requests.get(url)
    content = json.loads(response.content)
    print("just polled")
    print("AutomobileVO", AutomobileVO.objects.all())
    print("content", content)
    for automobile in content['autos']:
        print("automobile", automobile)
        AutomobileVO.objects.update_or_create(
            vin=automobile['vin']
        )
    print(len(AutomobileVO.objects.all()), "flibbyflabby")
def poll():
    while True:
        print('Sales poll poll poll poll polling')
        try:
            get_automobile()
            pass
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(60) 


if __name__ == "__main__":
    poll()
