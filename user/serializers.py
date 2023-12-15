# serializers.py

from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class CheckUserIdSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=15)

class UserLoginSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return {'user': user}
        raise serializers.ValidationError("Incorrect Credentials")
