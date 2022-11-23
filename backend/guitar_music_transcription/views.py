from django.http import HttpResponse
from django.views.decorators.http import require_GET

def load_txt(request):
    lines = [
        "loaderio-87e268fec5cef45fd1b4707dc113b598",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")