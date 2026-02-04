from .models import Office, User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = user.id
        token['name'] = user.name
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser

        return token
    
class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = ['name']

class UserSerializer(serializers.ModelSerializer):
    office = serializers.PrimaryKeyRelatedField(
        queryset=Office.objects.all()
    )

    class Meta:
        model = User
        fields = ['name', 'password', 'office', 'is_superuser']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        is_superuser = validated_data.pop('is_superuser', False)
        if is_superuser:
            return User.objects.create_superuser(**validated_data)
        return User.objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.set_password(password)
        instance.save()
        return instance
