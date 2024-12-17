from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import ProductModelSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Product


class ProductModelViewSet(ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductModelSerializer
    
    
class ProductsSearchFilterView(APIView):
    def post(self, request):
        query = request.data.get('query', '')
        
        if query:
            products = Product.objects.filter(title__icontains=query)
            serializer = ProductModelSerializer(products, many=True)     
                   
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'products': ''})
    
    
class ProductsCategoryFilterView(APIView):
    def post(self, request):
        category = request.data.get('category')
        
        if category:
            products = Product.objects.filter(category=category)
            serializer = ProductModelSerializer(products, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'products' : ''})
        