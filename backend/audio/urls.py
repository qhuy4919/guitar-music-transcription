from django.urls import path, include
from .views import *

urlpatterns = [
    path('upload/', uploadAPIView.as_view()),
    path('get-code/<id>/', getCodeAPIView.as_view()),
    path('get-list-audio/', listAudioAPIView.as_view()),
    path('audio/<id>/', audioAPIView.as_view()),
    path('get-list-tablature/', listTablatureAPIView.as_view()),
    path('tablature/<id>/', tablatureAPIView.as_view()),
    path('list-type/', listTypeAPIView.as_view()),
    path('type/', typeAPIView.as_view())
]