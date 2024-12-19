from .views import UserRegisterView, UserLoginView, UserCredentialsView, RefreshTokenView, UserLogoutView
from django.urls import path


jwt_urlpatterns = [
    path('refresh/', RefreshTokenView.as_view()),
]

auth_urlpatterns = [
    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    path('register/', UserRegisterView.as_view()),
]

user_urlpatterns = [
    path('credentials/', UserCredentialsView.as_view()),
]