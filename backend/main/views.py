from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import RegisterForm, CommentForm, FileForm
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User, Group
from .models import Comment, File
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render, redirect
from .helpers import handle_uploaded_file

# from uploadfile.forms import DocumentForm
# from uploadfile.models import Document

@login_required(login_url="/login")
def home(request):
    return JsonResponse({'success': False, 'message': "Login successful"})

def get_comments(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        return JsonResponse({'success': True, 'comments': list(comments)})

    # return render(request, 'main/create_post.html', {"form": form})
    return JsonResponse({'success': False, 'message': "Url not found"})


# @login_required(login_url="/login")
# @permission_required("main.add_comment", login_url="/login", raise_exception=True)
# def get_files(request):
#     if request.method == 'GET':
#         comments = Comment.objects.all()
#         return JsonResponse({'success': True, 'comments': list(comments)})

#     # return render(request, 'main/create_post.html', {"form": form})
#     return JsonResponse({'success': False, 'message': "Url not found"})


@login_required(login_url="/login")
@permission_required("main.create_comment", login_url="/login", raise_exception=True)
def create_comment(request):
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.save()
            return JsonResponse({'success': True, 'message': "Create comment successful"})
        else: return JsonResponse({'success': False, 'message': "Create comment fail"})
    
    return JsonResponse({'success': False, 'message': "Url not found"})

    
def sign_up(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({'success': True, 'message': "Create user successful"})
    else:
        form = RegisterForm()

    return render(request, 'registration/sign_up.html', {"form": form})

# def upload(request):
#     if request.method == "POST":
#         form = FileForm(request.POST)
#         if form.is_valid():
            
def upload_form(request):
    return render(request, 'main/simple_upload.html' )

@login_required(login_url="/login")
@permission_required("main.add_file", login_url="/login", raise_exception=True)
def upload_file(request):
    if request.method == 'POST':
        form = FileForm(request.POST)
        if form.is_valid() and request.FILES['file']:
            path = handle_uploaded_file(request.FILES['file']) 
            file = form.save(commit=False)
            file.user = request.user
            file.inputPath = "/" + path
            file.outputPath = "/"
            file.save()
            return JsonResponse({'success': True, 'message': "Upload file successful"})
        else: return JsonResponse({'success': False, 'message': "Upload file fail"})

    # return render(request, 'main/create_post.html', {"form": form})
    return JsonResponse({'success': False, 'message': "Url not found"})
