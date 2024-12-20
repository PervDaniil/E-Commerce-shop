from .enums import CategoriesEnum
from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=64, null=False, blank=False)
    published_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=512, null=False, blank=False)
    image = models.ImageField(null=True, blank=True, upload_to='products/images/')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.TextField(
        choices=CategoriesEnum.choices(),
        default=CategoriesEnum.OTHER.name
    )
    
    
    def __str__(self):
        return f'{self.title}'
    

class Cart(models.Model):
    user = models.OneToOneField('users.CustomUser', on_delete=models.CASCADE)
    products = models.ManyToManyField('shop.Product', blank=True)
    
    
    def add_product(self, product):
        if product not in self.products.all():
            self.products.add(product)
            
            
    def delete_product(self, product):
        if product in self.products.all():
            self.products.remove(product)
    
    
    @classmethod
    def get_or_create_cart(cls, user):
        cart, created = cls.objects.get_or_create(user=user)
        return cart
    
    
    def __str__(self):
        return f"{self.user.username}'s cart of products"

    