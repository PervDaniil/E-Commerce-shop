# Generated by Django 5.1.2 on 2024-12-16 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.IntegerField(choices=[('ELECTRONICS', 'Electronics'), ('COSMETICS', 'Cosmetics'), ('FURNITURE', 'Furniture'), ('CLOTHING', 'Clothing'), ('OTHER', 'Other'), ('FOOD', 'Food')], default='OTHER'),
        ),
    ]
