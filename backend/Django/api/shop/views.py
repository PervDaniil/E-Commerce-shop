from .serializers import ProductModelSerializer, ProductModelPagination
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product, Cart
from rest_framework import status


class ProductModelViewSet(ReadOnlyModelViewSet):
    pagination_class = ProductModelPagination
    serializer_class = ProductModelSerializer
    queryset = Product.objects.all()
    

class ProductsFilterViewSet(APIView):
    def post(self, request):
        queryset = Product.objects.all()

        search_title = request.data.get('search_title')
        min_price = request.data.get('min_price')
        max_price = request.data.get('max_price')
        category = request.data.get('category')
        brand = request.data.get('brand')
        
        if search_title:
            queryset = queryset.filter(title__icontains=search_title)
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        if category:
            queryset = queryset.filter(category=category)
            
        if brand:
            queryset = queryset.filter(brand=brand)
            
        serializer = ProductModelSerializer(queryset, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        
class UserProductsCartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        cart = Cart.objects.get(user=request.user)
        queryset = cart.products.all()
        serializer = ProductModelSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    def post(self, request):
        productID = request.data.get('productID')
        
        if not productID:
            return Response({'info' : 'Product ID is missed!'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            product = Product.objects.get(id = productID)
        except Product.DoesNotExist:
            return Response({'info' : 'Invalid product ID!'}, status=status.HTTP_400_BAD_REQUEST)
            
        cart = Cart.get_or_create_cart(user=request.user)
        
        if product not in cart.products.all():
            cart.add_product(product)
            return Response({'info' : 'Product has been successfully added to user cart!'}, status=status.HTTP_201_CREATED)
        return Response({'info' : 'Product had been already added to user cart!'}, status=status.HTTP_200_OK)

        
    
    def delete(self, request):
        productID = request.data.get('productID')
        
        if not productID:
            return Response({'info' : 'Product ID is missed!'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            cart = Cart.get_or_create_cart(user=request.user)
            product = cart.products.get(id=productID)
            cart.products.remove(product)
            return Response({'info', 'Product has removed from cart successfully!'}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'info' : 'Internal server error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        
        
        