from rest_framework.serializers import ModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from .models import Product, Cart


class ProductModelSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        
        
class UserProductsCartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        
        
class ProductModelPagination(LimitOffsetPagination):
    default_limit = 12
    max_limit = 24
    
