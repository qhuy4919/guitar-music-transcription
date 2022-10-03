from django.db import models
from django.contrib.auth.models import User
from datetime import datetime    

class File(models.Model):
    name = models.TextField()
    inputPath = models.CharField(max_length=200)
    outputPath = models.CharField(max_length=200)
    description = models.TextField()
    datetime = models.DateField(default=datetime.now, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Comment(models.Model):
    title = models.TextField()
    detail = models.TextField()
    rate = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    datetime = models.DateField(default=datetime.now, blank=True)

    def __str__(self):
        return self.user.name + "\n" + self.title