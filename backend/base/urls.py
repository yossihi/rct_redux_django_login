"""
apppppppppppppppplication urls
"""
from django.urls import path

from .views import MyTokenObtainPairView, buyProd, create, getCart, products, secure, unBuy, unsecure

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view()),
    path('register/', create),
    path('secure/', secure),
    path('unsecure/', unsecure),
    path('products/', products),
    path('products/<int:id>', products),
    path('buyProd/<int:id>', buyProd),
    path('getCart/', getCart),
    path('unbuy/<int:id>', unBuy)
]
