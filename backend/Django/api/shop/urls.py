from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductModelViewSet,
    UserProductsCartView,
    ProductsFilterViewSet
)


APIRouter = DefaultRouter()
APIRouter.register('products', ProductModelViewSet)


urlpatterns = [
    path('', include(APIRouter.urls)),
    path('user-cart/', UserProductsCartView.as_view()),
    path('products/filter/', ProductsFilterViewSet.as_view()),
]