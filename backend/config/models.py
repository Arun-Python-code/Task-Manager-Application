from django.db import models
from django.contrib.auth.models import User

class task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    assigned_user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, default='pending')
    priority = models.CharField(max_length=100)