from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializers, taskserializers, GetUsernameSerializer, TaskcreateSerializers
from .models import task
from django.contrib.auth.models import User


@api_view(['GET'])
def home(request):
    return Response({"message": "Welcome to the task manager application"})


@api_view(['POST'])
def regiter_User(request):
     serializer = UserSerializers(data=request.data)
     if serializer.is_valid():
        serializer.save() # Save the user details to the database
        return Response({'message': True, 'username': serializer.data['username']}, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
@api_view(['POST'])
def Login_User(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = User.objects.get(username=username, password=password)
        return Response({'user_id': user.id, 'username': username, 'message': True}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"message": False}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET"])
def get_users(request):
    tasks = task.objects.all()
    user = User.objects.all()
    user_serializer = GetUsernameSerializer(user, many= True)
    serializer = taskserializers(tasks, many = True)
    return Response({'users': user_serializer.data, 'tasks': serializer.data}, status=status.HTTP_200_OK)


@api_view(["POST"])
def create_task(request):
    data = TaskcreateSerializers(data = request.data)
    if data.is_valid():
        data.save()
        return Response({"data": data}, status=status.HTTP_201_CREATED)
    return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_task(request, id):
    try:
        task_to_delete = task.objects.get(id=id)
        task_to_delete.delete()
        return Response({"message": "Task deleted successfully"}, status=status.HTTP_200_OK)
    except task.DoesNotExist:
        return Response({"message": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["PATCH"])
def update_task(request, id):
    task_data = task.objects.get(id=id)
    serializer = TaskcreateSerializers(task_data, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"data" : serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)