from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from .serializers import ProductModelSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from api.users.models import CustomUser
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
    
    
# class AddProductToUserBasketView(APIView):
#     authentication_classes = [IsAuthenticated]
    
#     def post(self, request):
#         productID = request.data.get('productID')
        
#         if not productID:
#             return Response({'info' : 'Product ID is missed!'}, status=status.HTTP_400_BAD_REQUEST)
        
#         if productID:
#             User = request.user
#             product = Product.objects.get(id=1)
#             User.basket.add(product)
#             print('Ok!')
#             return Response({}, status=status.HTTP_201_CREATED)
        
        
        