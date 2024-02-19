from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        token['username'] = user.username
 
        return token
 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def create(request):
        User.objects.create_user(username= request.data["username"],password=request.data['password'],is_staff=1)
        return Response({"reg":"test"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def secure(req):
     return Response({'message': 'inside of secured function'})

@api_view(['GET'])
def unsecure(req):
     return Response({'message': 'inside of unsecured function'})