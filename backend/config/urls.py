"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import home, regiter_User, Login_User, get_users, create_task, delete_task, update_task

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home, name = 'home'),
    path('register/', regiter_User, name = 'register'),
    path('login/', Login_User, name = 'login'),
    path('getusers/', get_users, name = 'getusers'),
    path('createtask/', create_task, name = 'createtask'),
    path('deletetask/<int:id>/', delete_task, name = 'deletetask'),
    path('updatetask/<int:id>/', update_task, name = 'updatetask')
]
