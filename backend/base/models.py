from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    desc = models.CharField(max_length=50, null=False, default="default description", unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    createdTime = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.desc
    
class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    def __str__(self) -> str:
        return f"{self.customer.username}, {self.product.desc}"