from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('sign-up', views.sign_up, name='sign_up'),
    path('get-comments', views.get_comments, name='get_comment'),
    path('create-comment', views.create_comment, name='create_comment'),
    path('upload-form', views.upload_form, name='upload_file_form'),
    path('upload-file', views.upload_file, name='upload_file'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)