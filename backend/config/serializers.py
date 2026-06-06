from rest_framework import serializers
from django.contrib.auth.models import User
from .models import task

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class taskserializers(serializers.ModelSerializer):
    assigned_user = UserSerializers(read_only=True)

    class Meta:
        model = task
        fields = "__all__"

class GetUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]

class TaskcreateSerializers(serializers.ModelSerializer):
    assigned_user = UserSerializers(read_only = True)
    class Meta:
        model = task
        fields = "__all__"