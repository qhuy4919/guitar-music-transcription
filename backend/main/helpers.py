def handle_uploaded_file(f):  
    app = "main/"
    basePath = "static/upload/"
    with open(app + basePath + f.name, 'wb+') as destination:  
        for chunk in f.chunks():  
            destination.write(chunk) 
    return basePath + f.name