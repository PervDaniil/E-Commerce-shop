# Generated by Django 5.1.2 on 2024-12-16 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.IntegerField(choices=[('Electronics', 'Electronics'), ('Cosmetics', 'Cosmetics'), ('Furniture', 'Furniture'), ('Clothing', 'Clothing'), ('Other', 'Other'), ('Food', 'Food')], default='Other'),
        ),
    ]
