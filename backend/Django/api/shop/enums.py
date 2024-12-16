from enum import Enum


class CategoriesEnum(Enum):
    ELECTRONICS = 'Electronics'
    COSMETICS = 'Cosmetics'
    FURNITURE = 'Furniture'
    CLOTHING = 'Clothing'
    OTHER = 'Other'
    FOOD = 'Food'
    
    @classmethod
    def choices(cls):
        return [(category.value, category.name)
                for category in cls]