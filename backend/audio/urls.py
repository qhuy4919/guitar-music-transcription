from django.urls import path, include
from .views import *

urlpatterns = [
    path('upload/', uploadAPIView.as_view()),
    path('get-code/<id>/', getCodeAPIView.as_view())
]