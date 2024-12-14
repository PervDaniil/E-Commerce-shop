from .views import UserRegisterView, UserLoginView, UserCredentialsView
from django.urls import path


urlpatterns = [
    path('register/', UserRegisterView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('user/', UserCredentialsView.as_view()),
]