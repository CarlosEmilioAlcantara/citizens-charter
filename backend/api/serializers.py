from .models import Office, Position, Requirement, Service, Step, User 
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = user.pk
        token['name'] = user.name
        token['office_id'] = user.office.pk
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser

        return token
    
class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = ['name']

class UserSerializer(serializers.ModelSerializer):
    # Get all possible foreign keys
    office = serializers.PrimaryKeyRelatedField(
        queryset=Office.objects.all()
    )

    class Meta:
        model = User
        fields = ['name', 'password', 'is_staff', 'is_superuser', 'office']
        extra_kwargs = {
            'password': {'write_only': True},
            'office': {'read_only': True},
        }

    def create(self, validated_data):
        is_staff = validated_data.pop('is_staff', False)
        is_superuser = validated_data.pop('is_superuser', False)

        if is_staff:
            return User.objects.create_staff(**validated_data)
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

class PositionSerializer(serializers.ModelSerializer):
    office = serializers.PrimaryKeyRelatedField(
        queryset=Office.objects.all()
    )

    class Meta:
        model = Position
        fields = ['name', 'office']
        extra_kwargs = {'office': {'read_only': True}}

class ServiceSerializer(serializers.ModelSerializer):
    classification_types = serializers.MultipleChoiceField(
        choices = Service.CLASSIFICATION_CHOICES
    )

    class Meta:
        model = Service
        fields = [
            'name', 
            'description', 
            'transaction', 
            'classification_types',
            'availers',
            'is_subservice',
            'office',
        ]
        extra_kwargs = {'office': {'read_only': True}}

class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ['name', 'where_to_secure', 'service']
        extra_kwargs = {'service': {'read_only': True}}

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = [
            'name', 
            'action',
            'fee',
            'legal_basis',
            'processing_time',
            'service',
            'position',
        ]
        extra_kwargs = {'service': {'read_only': True}}