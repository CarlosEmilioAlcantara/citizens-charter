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
    service_count = serializers.IntegerField(read_only=True)
    user_count = serializers.IntegerField(read_only=True)
    position_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Office
        fields = ['id', 'name', 'service_count', 'user_count', 'position_count']

class OfficeBulkItemSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField()

    class Meta:
        model = Office
        fields = ['pk', 'name']        

class OfficeBulkUpdateSerializer(serializers.Serializer):
    offices = OfficeBulkItemSerializer(many=True)

    def save(self):
        validated_offices = self.validated_data['offices']
        pks = [item['pk'] for item in validated_offices]

        instances = Office.objects.filter(pk__in=pks)
        existing = list(instances.values_list('pk', flat=True))
        missing = set(pks) - set(existing)

        if missing:
            raise serializers.ValidationError(
                f"Some instances, {missing}, do not exist."
            )

        office_map = {item['pk']: item for item in validated_offices}
        update_fields = set()

        for office in instances:
            payload = office_map[office.pk]
            for attr, value in payload.items():
                if attr == 'pk':
                    continue
                setattr(office, attr, value)
                update_fields.add(attr)

        Office.objects.bulk_update(list(instances), list(update_fields))
        return instances

    # def update(self, instances, validated_data):
    #     instance_map = {obj.pk: obj for obj in instances}
    #     update_fields = set()

    #     for item in validated_data:
    #         office = instance_map.get(item['pk'])

    #         for attr, value in item.items():
    #             if attr == 'pk':
    #                 continue
    #             setattr(office, attr, value)
    #             update_fields.add(attr)

    #     Office.objects.bulk_update(instances, list(update_fields))
    #     return instances

class UserSerializer(serializers.ModelSerializer):
    # Get all possible foreign keys
    office = serializers.PrimaryKeyRelatedField(
        queryset=Office.objects.all()
    )

    class Meta:
        model = User
        fields = [
            'id', 
            'name', 
            'password', 
            'is_staff', 
            'is_superuser', 
            'office',
        ]
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
        fields = ['id', 'name', 'office']
        extra_kwargs = {'office': {'read_only': True}}

class ServiceSerializer(serializers.ModelSerializer):
    classification_types = serializers.MultipleChoiceField(
        choices = Service.CLASSIFICATION_CHOICES
    )

    class Meta:
        model = Service
        fields = [
            'id',
            'name', 
            'description', 
            'transaction', 
            'classification_types',
            'availers',
            'is_subservice',
            'office',
        ]
        extra_kwargs = {'office': {'read_only': True}}

class OfficeAnalyticsListSerializer(serializers.ModelSerializer):
    requirement_count = serializers.IntegerField(read_only=True)
    step_count = serializers.IntegerField(read_only=True)
    total_price = serializers.IntegerField(read_only=True)
    total_time = serializers.IntegerField(read_only=True)

    class Meta:
        model = Service
        fields = [
            'id',
            'name', 
            'office',
            'requirement_count',
            'step_count',
            'total_price',
            'total_time',
        ]
        extra_kwargs = {'office': {'read_only': True}}

class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ['id', 'name', 'where_to_secure', 'service']
        extra_kwargs = {'service': {'read_only': True}}

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = [
            'id',
            'name', 
            'action',
            'fee',
            'legal_basis',
            'processing_time',
            'service',
            'position',
        ]
        extra_kwargs = {'service': {'read_only': True}}