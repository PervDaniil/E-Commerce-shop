from .serializers import ProductModelSerializer, UserProductsCartSerializer, ProductModelPagination
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
        
        if productID:
            try:
                product = Product.objects.get(id = productID)
            except Product.DoesNotExist:
                return Response({'info' : 'Invalid product ID!'}, status=status.HTTP_400_BAD_REQUEST)
            
            cart = Cart.get_or_create_cart(user=request.user)
            cart.add_product(product)
            return Response({'info' : 'Product has been successfully added to user cart!'}, status=status.HTTP_201_CREATED)
    
    
    def delete(self, request):
        productID = request.data.get('productID')
        
        if not productID:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        try:
            cart = Cart.get_or_create_cart(user=request.user)
            product = cart.products.get(id=productID)
            cart.products.remove(product)
            return Response({'info', 'Product has removed from cart successfully!'}, status=status.HTTP_200_OK)
        except Exception as Exc:
            print(Exc)
            return Response({'info' : ''}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        
        
        