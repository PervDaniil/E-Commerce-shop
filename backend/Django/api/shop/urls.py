from django.urls import path, include
from .views import ProductModelViewSet, ProductsSearchFilterView
from rest_framework.routers import DefaultRouter

APIRouter = DefaultRouter()
APIRouter.register('products', ProductModelViewSet)


urlpatterns = [
    path('', include(APIRouter.urls)),
    path('products/filter/search/', ProductsSearchFilterView.as_view()),
]