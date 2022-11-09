from django.db import models
from django.conf import settings

class Type(models.Model):
    name = models.TextField(unique=True)
    describe = models.TextField(null=True)

class Audio(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255, null=True)
    describe = models.CharField(max_length=255, null=True)
    path = models.CharField(max_length=255)
    group = models.CharField(max_length=255, null=True)

class Tablature(models.Model):
    audio = models.OneToOneField(
        Audio,
        on_delete=models.CASCADE
    )
    code = models.TextField(null=True)
    type = models.ForeignKey(
        Type,
        on_delete=models.CASCADE, 
        null=True
    )


