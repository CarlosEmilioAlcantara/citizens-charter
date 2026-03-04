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

class BaseBulkUpdateSerializer(serializers.ListSerializer):
    def to_internal_value(self, data):
        if self.instance is None:
            return super().to_internal_value(data)

        instance_map = {
            obj.pk: obj for obj in self.instance
        }

        ret = []
        errors = []

        for item in data:
            pk = item.get('pk')
            instance = instance_map.get(pk)

            if not instance:
                errors.append(
                    {'pk': f"Object with pk={pk} does not exist."}
                )
                continue

            self.child.instance = instance
            
            try:
                validated = self.child.run_validation(item)
                ret.append(validated)
            except serializers.ValidationError as exc:
                errors.append(exc.detail)

        if errors:
            raise serializers.ValidationError(errors)

        return ret
    
    def update(self, queryset, validated_data):
        model = self.child.Meta.model

        instance_map = {obj.pk: obj for obj in queryset}
        print(validated_data)
        data_map = {item['pk']: item for item in validated_data}

        update_fields = set()
        instances = []

        for pk, data in data_map.items():
            instance = instance_map[pk]

            for attr, value in data.items():
                if attr == 'pk':
                    continue
                setattr(instance, attr, value)
                update_fields.add(attr)

            instances.append(instance)

        model.objects.bulk_update(instances, list(update_fields))
        return instances

class OfficeSerializer(serializers.ModelSerializer):
    service_count = serializers.IntegerField(read_only=True)
    user_count = serializers.IntegerField(read_only=True)
    position_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Office
        fields = ['id', 'name', 'service_count', 'user_count', 'position_count']

class OfficeBulkUpdateSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField()

    class Meta:
        model = Office
        fields = ['pk', 'name']        
        list_serializer_class = BaseBulkUpdateSerializer

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

# class UserBulkUpdateSerializer(serializers.ModelSerializer):
#     pk = serializers.IntegerField()
#     office = serializers.PrimaryKeyRelatedField(
#         queryset=Office.objects.all()
#     )

#     class Meta:
#         model = User
#         fields = [
#             'pk', 
#             'name', 
#             'password', 
#             'is_staff', 
#             'is_superuser', 
#             'office',
#         ]
#         extra_kwargs = {
#             'password': {'write_only': True},
#             'office': {'read_only': True},
#         }
#         list_serializer_class = BaseBulkUpdateSerializer

class PositionSerializer(serializers.ModelSerializer):
    office = serializers.PrimaryKeyRelatedField(
        queryset=Office.objects.all()
    )

    class Meta:
        model = Position
        fields = ['id', 'name', 'office']
        extra_kwargs = {'office': {'read_only': True}}

class PositionBulkUpdateSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField()
    office = serializers.PrimaryKeyRelatedField(
        queryset=Office.objects.all()
    )

    class Meta:
        model = Position
        fields = ['pk', 'name', 'office']
        extra_kwargs = {'office': {'read_only': True}}
        list_serializer_class = BaseBulkUpdateSerializer

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