from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=64, null=False, blank=False)
    published_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=512, null=False, blank=False)
    image = models.ImageField(null=True, blank=True, upload_to='products/images/')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    # tags = models.ManyToManyField()
    
    def __str__(self):
        return f'{self.title}'