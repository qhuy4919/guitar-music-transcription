from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import User
from rest_framework.exceptions import AuthenticationFailed

import jwt
import datetime
import json

# Create your views here.

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


class registerAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)   #if anything not valid, raise exception
        serializer.save()
        return Response({'message' :'Đăng ký tài khoản thành công!', 'success': True})


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        #find user using email
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found:)')
            
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid password')

       
        payload = {
            "id": user.id,
            "email": user.email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        # token.decode('utf-8')
        #we set token via cookies
        

        response = Response() 

        response.set_cookie(key='jwt', value=token, httponly=False)  #httonly - frontend can't access cookie, only for backend

        response.data = {
            'token': token
        }

        #if password correct
        return response


# get user using cookie
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms="HS256")
            #decode gets the user

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)
        #cookies accessed if preserved

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'successful'
        }

        return response

class profile(APIView):
    def get(self, request):
        try:
            user_id = getCurrentUserId(request)
            user = User.objects.get(id=int(user_id))
        except:
            return Response({
                'success': False,
                'message': 'User is not authenticated.'
            })
        data = {
            "name": user.name if user.name else "",
            "username": user.username if user.username else "",
            "email": user.email if user.email else ""
        }
        return Response(data)

    def post(self, request):
        if 'name' in request.POST or "email" in request.POST:
            if 'name' in request.POST and request.POST["name"] == "":
                return Response({"success": False, "message": "Name can not blank"})
            if "email" in request.POST and request.POST["email"] == "":
                return Response({"success": False, "message": "Email can not blank"})
        else:
            return Response({"success": False, "message": "Please fill in the information that needs to be changed"})
        try:
            user_id = getCurrentUserId(request)
            user = User.objects.get(id=int(user_id))
            if "name" in request.POST:
                user.name = request.POST["name"] if request.POST["name"] != user.name else user.name
            if "email" in request.POST:
                user_mail_check = User.objects.filter(email=request.POST["email"]).first()
                if user_mail_check and user_mail_check.id != user.id and user_mail_check.email == request.POST["email"]:
                    return Response({
                        'success': False,
                        'message': 'Email already exists'
                    })
                user.email = request.POST["email"] if request.POST["email"] != user.email else user.email
        except:
            return Response({
                'success': False,
                'message': 'User is not authenticated.'
            })
        user.save()
        return Response({
            'success': True,
            'message': 'Change information successful'
        })

class changePassword(APIView):
    def post(self, request):
        try:
            try:
                user_id = getCurrentUserId(request)
                user = User.objects.get(id=int(user_id))
                if "old_password" not in request.POST or not user.check_password(request.POST["old_password"]):
                    raise AuthenticationFailed('Invalid password')
            except:
                return Response({
                    'success': False,
                    'message': 'User is not authenticated.'
                })
            if "new_password" not in request.POST or len(request.POST["new_password"]) < 6:
                return Response({
                    'success': False,
                    'message': 'Password length must > 6.'
                })
            user.set_password(request.POST["new_password"])
            user.save()
            return Response({
                "success": True,
                "message": "Change password successful"
            })
        except:
            return Response({
                "success": False,
                "message": "Internal server error"
            })