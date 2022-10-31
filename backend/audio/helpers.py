from enum import Flag
import requests
from rest_framework.response import Response
from .const import *
import time
import json, random

def handle_uploaded_file(f):  
    with open(APP + UPLOAD_PATH + f.name, 'wb+') as destination:  
        for chunk in f.chunks():  
            destination.write(chunk) 
    return UPLOAD_PATH + f.name

def open_uploaded_file(path):  
    files = {'files': open(APP + path, 'rb')}
    return files

def request_to_server(url, method, data, files, try_number):
    headers = {
        'Accept': 'application/json'
    }
    method = method.lower()
    try:
        if method == 'post':
            return json.loads(requests.post(URL + url, data=data, files=files, headers=headers).text)
        elif method == 'get':
            return json.loads(requests.get(URL + url, data=data, files=files, headers=headers).text)
    except (requests.exceptions.ConnectionError, json.decoder.JSONDecodeError):
        time.sleep(try_number + random.random()*0.01)
        if try_number>10:
            return {
                'error': 'Runtime error'
            }
        return request_to_server(url, method, data, files, try_number=try_number+1)
    # case 'update':
    #     response = requests.post(url, data=data)
    # case 'update':
    #     response = requests.post(url, data=data)
    return {
        'success': False
    }
    