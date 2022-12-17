from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from .helpers import *
import json
from django.core import serializers
import jwt
from users.models import User
from users.serializers import UserSerializer

def getCurrentUserId(request):
    
    # token = request.COOKIES.get('jwt')
    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]

    if not token:
        raise "User is not authenticated."
    
    try:
        payload = jwt.decode(token, 'secret', algorithms="HS256")

    except jwt.ExpiredSignatureError:
        raise "User is not authenticated."
    
    user = User.objects.filter(id=payload['id']).first()
    serializer = UserSerializer(user)

    return serializer.data["id"]

class uploadAPIView(APIView):

    def post(self, request):
        try:
            try:
                user_id = getCurrentUserId(request)
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            if len(request.FILES) == 0:
                return Response({"success": False, "message": "Missing file"})
            if 'name' not in request.POST:
                return Response({"success": False, "message": "Missing name"})
            if 'type' not in request.POST:
                return Response({"success": False, "message": "Missing type"})
            data = request.data
            data = {
                "name": request.data["name"],
                "title": request.data["title"] if 'title' in request.POST else None,
                "describe": request.data["describe"] if 'describe' in request.POST else None,
                "group": request.data["group"] if 'group' in request.POST else None,
                "user_id": user_id,
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
                tablature = Tablature(audio=audio, code=tabReceive["tablature"], type=type, user_id=user_id)
                tablature.save()
            except NameError:
                Response({
                    'success': False,
                    'message': 'Internal server error',
                    'error': NameError
                })

            return Response({
                'success': True,
                'audio': tablature.audio.name,
                'tablature': tablature.code,
                'type': tablature.type.name if tablature.type else None,
                'message': 'Transcription success'
            })
        except NameError:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

class listAudioAPIView(APIView):
    def get(self, request):
        try:
            try:
                user_id = getCurrentUserId(request)
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            
            listAudio = serializers.serialize("json", Audio.objects.filter(user_id=user_id))  
            return Response({
                'success': True,
                'message': 'Get list audio success',
                "list_audio": json.loads(listAudio)
            })
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

class audioAPIView(APIView):
    def get(self, request, id):
        try:
            try:
                user_id = getCurrentUserId(request)
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            audio = serializers.serialize("json", Audio.objects.filter(id=int(id), user_id=user_id))
            return Response({"audio": json.loads(audio)})
        except KeyError:
            return Response({
                'success': False,
                'message': 'Internal server error',
                "KeyError": KeyError
            })

    def delete(self, request, id):
        try:
            try:
                user_id = getCurrentUserId(request)
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            audio = Audio.objects.filter(id=int(id), user_id=user_id)
            audio.delete()
            return Response({
                'success': True,
                'message': 'Delete audio successful'
            })
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

class getCodeAPIView(APIView):
    def get(self, request, id):
        try:
            try:
                user_id = getCurrentUserId(request)
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            tablature = Tablature.objects.get(id=int(id))
            if(tablature.id != user_id):
                data = {
                    'success': False,
                    'message': 'User is not authenticated.'
                }
            else:
                data = {
                    "code": tablature.code
                }
            return Response(data)
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

class listTablatureAPIView(APIView):
    def get(self, request):
        try:
            try:
                user_id = getCurrentUserId(request)
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            listTablature = serializers.serialize("json", Tablature.objects.filter(user_id=user_id))
            return Response({"list-tablature": json.loads(listTablature)})
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

class tablatureAPIView(APIView):
    def get(self, request, id):
        try:
            try:
                user_id = getCurrentUserId(request)
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            tablature = serializers.serialize("json", Tablature.objects.filter(id=int(id), user_id=user_id))
            return Response({"tablature": json.loads(tablature)})
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

    def delete(self, request, id):
        try:
            try:
                user_id = getCurrentUserId(request)
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            tab = Tablature.objects.filter(id=int(id), user_id=user_id)
            tab.delete()
            return Response({
                'success': True,
                'message': 'Delete tablature successful'
            })
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

class listTypeAPIView(APIView):
    def get(self, request):
        try:
            listType = serializers.serialize("json", Type.objects.all())
            return Response({"list-type": json.loads(listType)})
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

class typeAPIView(APIView):
        
    def get(self, request, id):
        try:
            type = serializers.serialize("json", Type.objects.filter(id=int(id)))
            return Response({"type": json.loads(type)})
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

    def post(self, request):
        try:
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
        except:
            return Response({
                'success': False,
                'message': 'Internal server error'
            })

