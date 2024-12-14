from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from api.shop.urls import urlpatterns as shop_urlpatterns
from api.users.urls import urlpatterns as jwt_token_urlpatterns

urlpatterns = [
    path('api/v1/shop/', include(shop_urlpatterns)),
    path('api/v2/token/', include(jwt_token_urlpatterns)),
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

