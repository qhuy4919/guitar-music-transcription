from django.db import models
from django.conf import settings

class Audio(models.Model):
    name = models.CharField(max_length=255)
    # author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    path = models.CharField(max_length=255)

class Tablature(models.Model):
    # audio = models.ForeignKey(Audio, on_delete=models.CASCADE)
    audio_id = models.CharField(max_length=255, null=True)
    code = models.TextField()
