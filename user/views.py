# views.py

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import UserSerializer, UserLoginSerializer, CheckUserIdSerializer
from user.models import CustomUser

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    access = AccessToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(access),
    }


class SignUpView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data

        # Vaidation
        if len(str(data['user_id'])) < 4 or len(str(data['user_id'])) > 15:
            response = {
                'is_success': False,
                'message': '아이디는 4 ~ 15자입니다.'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        if len(str(data['password'])) < 8 or len(str(data['password'])) > 15:
            response = {
                'is_success': False,
                'message': '비밀번호는 8 ~ 15자입니다.'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        if len(str(data['name'])) < 2 or len(str(data['name'])) > 15:
            response = {
                'is_success': False,
                'message': '이름은 2 ~ 15자입니다.'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        data['password'] = make_password(data['password'])
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            response = {
                'is_success': True,
                'result': serializer.data
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                'is_success': False,
                'message': serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class CheckUserIdView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = CheckUserIdSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            is_duplicate = CustomUser.objects.filter(user_id=user_id).exists()

            response = {
                'is_success': True,
                'result': {'is_duplicate': is_duplicate}
            }
            return Response(response, status=status.HTTP_200_OK)

        response = {
            'is_success': False,
            'message': serializer.errors
        }
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)
            customUser = get_object_or_404(CustomUser, user_id=request.data['user_id'])
            response = {
                'is_success': True,
                'result': {
                    'tokens': tokens,
                    'user_id': customUser.user_id
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                'is_success': False,
                'message': 'Invalid credentials, try again'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()

            response = {
                'is_success': True
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                'is_success': False
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)