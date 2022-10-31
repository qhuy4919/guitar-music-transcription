from re import M
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AudioSerializer, TablatureSerializer
from .models import Audio, Tablature
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
import json

from .helpers import *

import requests

class uploadAPIView(APIView):

    # permission_classes = (IsAuthenticated,)
    def post(self, request):
        if request.FILES['file']:
            data = request.data
            path = handle_uploaded_file(request.FILES['file']) 
            data['path'] = path
            serializer = AudioSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            try:
                files = open_uploaded_file(serializer.data['path'])
                requestData = {
                    'files' : files
                }
                tabReceive = request_to_server("tab-generate/{}".format(serializer.data['id']), "get", requestData, files)
            except NameError:
                print(NameError)

            audio = Audio.objects.get(id=serializer.data['id'])
            data = {
                # 'code': tabReceive.json()["tablature"],
                # "audio_id": serializer.data['file_id'],
            }
            # tabSerializer = TablatureSerializer(data=data)
            # tabSerializer.is_valid(raise_exception=True)
            # tabSerializer.save()
            
            print(tabReceive)

            return Response("abc")

    
    def get(self, request):
        data = {
            'id': 1,
        }
        response = request_to_server("post", data)
        return Response(response.json())

class getCodeAPIView(APIView):
    def get(self, request, id):
        tablature = Tablature.objects.get(id=int(id))
        data = {
            "code": tablature.code
        }
        return Response(data)

