from enum import Flag
import requests
from rest_framework.response import Response
from .const import *

def handle_uploaded_file(f):  
    with open(APP + UPLOAD_PATH + f.name, 'wb+') as destination:  
        for chunk in f.chunks():  
            destination.write(chunk) 
    return UPLOAD_PATH + f.name

def open_uploaded_file(path):  
    files = {'file': open(APP + path, 'rb')}
    return files

def request_to_server(method, data, files):
    response = ""
    method = method.lower()
    match method:
        case 'post':
            return requests.post(URL, data=data, files=files)
        case 'get':
            return requests.get(URL, data=data, files=files)
        # case 'update':
        #     response = requests.post(url, data=data)
        # case 'update':
        #     response = requests.post(url, data=data)
    return {
        'success': False
    }
    