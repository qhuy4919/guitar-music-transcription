from django.shortcuts import render
from os.path import exists
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .serializers import *
from .models import *
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from .helpers import *
import json
from django.forms.models import model_to_dict
from django.core import serializers



class uploadAPIView(APIView):

    # permission_classes = (IsAuthenticated,)
    def post(self, request):
        if len(request.FILES) == 0 or 'name' not in request.POST or 'type' not in request.POST:
            return Response({"success": False, "message": "Please fill full field"})
        data = request.data
        data = {
            "name": request.data["name"],
            "title": request.data["title"] if 'title' in request.POST else None,
            "describe": request.data["describe"] if 'describe' in request.POST else None,
            "group": request.data["group"] if 'group' in request.POST else None,
        }
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
            tabReceive = request_to_server("tab-generate/{}".format(serializer.data['id']), "post", requestData, files, 1)
        except NameError:
            print(NameError)
        if "tablature" not in tabReceive:
            return Response(tabReceive)
        audio = Audio.objects.get(id=serializer.data['id'])
        try:            
            audio = Audio.objects.get(id=serializer.data['id'])
            data = {
                'code': tabReceive["tablature"],
                'audio': audio.__dict__
            }
            try:
                type = Type.objects.get(id=str(request.data["type"]))
            except Type.DoesNotExist:
                type = Type.objects.all().first()
            data = {
                'code': tabReceive["tablature"],
                'audio': audio.__dict__
            }
            tablature = Tablature(audio=audio, code=tabReceive["tablature"], type=type)
            tablature.save()
        except NameError:
            print(NameError)

        return Response({
            'success': True,
            'audio': tablature.audio.name,
            'tablature': tablature.code,
            'type': tablature.type.name
        })

class listAudioAPIView(APIView):
    def get(self, request):
        listAudio = serializers.serialize("json", Audio.objects.all())
        return Response({"list-audio": json.loads(listAudio)})

class audioAPIView(APIView):
    def get(self, request, id):
        audio = serializers.serialize("json", Audio.objects.filter(id=int(id)))
        return Response({"audio": json.loads(audio)})


class getCodeAPIView(APIView):
    def get(self, request, id):
        tablature = Tablature.objects.get(id=int(id))
        data = {
            "code": tablature.code
        }
        return Response(data)

class listTablatureAPIView(APIView):
    def get(self, request):
        listTablature = serializers.serialize("json", Tablature.objects.all())
        return Response({"list-tablature": json.loads(listTablature)})

class tablatureAPIView(APIView):
    def get(self, request, id):
        tablature = serializers.serialize("json", Tablature.objects.filter(id=int(id)))
        return Response({"tablature": json.loads(tablature)})

class listTypeAPIView(APIView):
    def get(self, request):
        listType = serializers.serialize("json", Type.objects.all())
        return Response({"list-type": json.loads(listType)})

class typeAPIView(APIView):
        
    def get(self, request, id):
        type = serializers.serialize("json", Type.objects.filter(id=int(id)))
        return Response({"type": json.loads(type)})

    def post(self, request):
        if 'name' not in request.POST:
            return Response({"success": False, "message": "Please fill full field"})
        describe = request.data["describe"] if "describe" in request.POST else None
        data = {
            'name': request.data["name"],
            'describe': describe
        }
        try:
            typeSerializer = TypeSerializer(data=data)
            typeSerializer.is_valid(raise_exception=True)
            typeSerializer.save()
        except NameError:
            print(NameError)
        return Response({
            'data': data,
            'success': True,
            'message': 'Create new type success'
        })

