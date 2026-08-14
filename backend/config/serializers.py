from rest_framework import serializers
from django.contrib.auth.models import User
from .models import task

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']


class GetUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]

class taskserializers(serializers.ModelSerializer):
    assigned_user = GetUsernameSerializer(read_only=True)

    class Meta:
        model = task
        fields = "__all__"

class TaskcreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = "__all__"