from django.urls import path, include
from .views import ProductModelViewSet
from rest_framework.routers import DefaultRouter

APIRouter = DefaultRouter()
APIRouter.register('products', ProductModelViewSet)


urlpatterns = [
    path('', include(APIRouter.urls))
]