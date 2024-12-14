from rest_framework.serializers import ModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from .models import Product


class ProductModelSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"