"""
apppppppppppppppplication urls
"""
from django.urls import path

from .views import MyTokenObtainPairView, create, products, secure, unsecure

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view()),
    path('register/', create),
    path('secure/', secure),
    path('unsecure/', unsecure),
    path('products/', products),
    path('products/<int:id>', products)
]
