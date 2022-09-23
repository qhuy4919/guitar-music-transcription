from django.urls import path
from . import views

urlpatterns = [
    # path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('sign-up', views.sign_up, name='sign_up'),
    path('get-comments', views.get_comments, name='get_comment'),
    path('create-comment', views.create_comment, name='create_comment'),
    path('upload-file', views.upload_file, name='create_file'),
]
