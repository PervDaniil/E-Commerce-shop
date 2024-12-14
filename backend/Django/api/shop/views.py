from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import ProductModelSerializer
from .models import Product


class ProductModelViewSet(ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductModelSerializer