from .models import CustomUser
from rest_framework import status
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenBackendError, TokenError, InvalidToken 


class UserRegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        confirmed_password = request.data.get('confirmed_password')
        
        if not username:
            return Response({'info' : 'Username cannot be blank!'}, status=status.HTTP_400_BAD_REQUEST)

        if password != confirmed_password:
            return Response({'info' : 'Passwords do not match!'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.create_user(
                username = username,
                password = password,
            )
            
            refresh_token = RefreshToken.for_user(user)
            access_token = refresh_token.access_token
            
            return Response({'refresh' : str(refresh_token),
                             'access' : str(access_token)}, status=status.HTTP_201_CREATED)
            
            
        except IntegrityError:
            return Response({'info' : 'User with this username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as Exc:
            print(Exc)
            return Response({'info' : 'INTERNAL_SERVER_ERROR'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
    
class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username:
            return Response({'info' : 'Username required!'}, status=status.HTTP_400_BAD_REQUEST)

        if not password:
            return Response({'info' : 'Password required!'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.filter(username = username).first()
            
            if user is not None:
                if user.check_password(password):
                    refresh_token = RefreshToken.for_user(user)
                    access_token = refresh_token.access_token
                    
                    return Response({'refresh' : str(refresh_token),
                                     'access' : str(access_token)}, status=status.HTTP_200_OK)
                    
            return Response({'info' : 'Invalid credentials!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as Exc:
            print(Exc)
            return Response({'info' : 'INTERNAL SERVER ERROR!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class RefreshTokenView(APIView):
    def post(self, request):
        refresh = request.data.get('refresh')
        
        if not refresh:
            return Response({'info' : 'Token is required!'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh_token = RefreshToken(refresh)
            access_token = refresh_token.access_token
            return Response({'access' : str(access_token),
                             'refresh' : str(refresh_token)}, status=status.HTTP_200_OK)
        except Exception as Exc:
            print(Exc)
            return Response({'info' : 'INTERNAL_SERVER_ERROR'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    

class UserLogoutView(APIView):
    def post(self, request):
        pass


class UserCredentialsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'username' : request.user.username}, status=status.HTTP_200_OK)
        

