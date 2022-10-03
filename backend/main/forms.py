from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Comment, File


class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]


class FileForm(forms.ModelForm):
    class Meta:
        model = File
        fields = ["name", "description"]

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ["title", "detail", "rate", "datetime"]

# class UploadForm(forms.ModelForm):
#     class Meta:
#         model = fi