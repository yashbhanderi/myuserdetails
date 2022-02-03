from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

# -----------------------------------------------------------------------


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'phone_no', 'password', ) 

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)