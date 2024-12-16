from .views import UserRegisterView, UserLoginView, UserCredentialsView, RefreshTokenView, UserLogoutView
from django.urls import path


urlpatterns = [
    path('register/', UserRegisterView.as_view()),
    path('user/', UserCredentialsView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    path('refresh/', RefreshTokenView.as_view()),
]