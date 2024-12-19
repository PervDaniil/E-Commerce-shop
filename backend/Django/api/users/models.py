from django.db import models
from api.shop.models import Product
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    basket = models.ManyToManyField(Product, null=True)