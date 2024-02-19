"""
apppppppppppppppplication urls
"""
from django.contrib import admin
from django.urls import path, include

from .views import MyTokenObtainPairView, create, secure, unsecure

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view()),
    path('register/', create),
    path('secure/', secure),
    path('unsecure/', unsecure)
]
