from django.urls import path
from .views import *

urlpatterns = [
    path('register/', registerAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('profile/', profile.as_view()),
    path('change-password/', changePassword.as_view())
]