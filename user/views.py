from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from user.models import Users

import json
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    data = json.loads(request.body)
    uid = data.get('uid')
    name = data.get('name')
    password = data.get('password')

    if not (uid or name or password):
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    user = Users.objects.create(
        uid=uid,
        name=name,
        password=password
    )

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh)

    return Response({'access_token': access_token}, status=status.HTTP_201_CREATED)
