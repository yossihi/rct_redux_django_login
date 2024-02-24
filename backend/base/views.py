from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import serializers
from .models import Order, Product

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        token['username'] = user.username
 
        return token
 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    def update(self, instance, validate_data):
        instance.price = validate_data.get('price', instance.price)
        instance.desc = validate_data.get('desc', instance.desc)
        instance.save()
        return instance
    
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
    def create(self, validated_data):
        return Order.objects.create(**validated_data)
    


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


@api_view(['GET','POST','DELETE','PUT','PATCH'])
@permission_classes([IsAuthenticated])
def products(req,id=-1):
    if req.method =='GET':
        if id > -1:
            try:
                temp_prod=Product.objects.get(id=id)
                return Response (ProductSerializer(temp_prod,many=False).data)
            except Product.DoesNotExist:
                return Response ("not found")
        all_prods=ProductSerializer(Product.objects.all(),many=True).data
        return Response (all_prods)
    if req.method =='POST':
        prod_serializer = ProductSerializer(data=req.data)
        if prod_serializer.is_valid():
            prod_serializer.save()
            return Response ("post...")
        else:
            return Response (prod_serializer.errors)
    if req.method =='DELETE':
        try:
            temp_prod=Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response ("not found")    
       
        temp_prod.delete()
        return Response ("del...")
    if req.method =='PUT':
        try:
            temp_prod=Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response ("not found")
        
        ser = ProductSerializer(data=req.data)
        old_task = Product.objects.get(id=id)
        ser.update(old_task, req.data)
        return Response('updated')
    
@api_view(['post'])
@permission_classes([IsAuthenticated])
def buyProd(req, id):
    try:
        temp_prod=Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response ("not found")
    new_order = OrderSerializer(data={'product': temp_prod.id, 'customer': req.user.id})
    if new_order.is_valid():
        new_order.save()
        return Response('buyed')
    else:
        return Response(new_order.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCart(req):
    all_prods = OrderSerializer(Order.objects.filter(customer=req.user.id), many=True).data
    all_orders = []
    for order in all_prods:
        prod_order = Product.objects.get(id=order['product'])
        existing_order = next((item for item in all_orders if item["desc"] == prod_order.desc), None)
        if existing_order:
            existing_order["quantity"] += 1
        else:
            all_orders.append({
                "id": prod_order.id,
                "desc": prod_order.desc,
                "price": prod_order.price,
                "quantity": 1
            })
    return Response(all_orders)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unBuy(req, id):
    
    try:
        temp_prod=Order.objects.filter(product=id, customer=req.user).first()
    except Order.DoesNotExist:
        return Response ("not found")
    
    temp_prod.delete()
    return Response('unbuyed')