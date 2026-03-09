from django.contrib import admin
from import_export import resources
from .models import (
    Office,
    User,
    Position,
    Service,
    Requirement,
    Step,
    StepPosition,
)

# Register your models here.
class OfficeResource(resources.ModelResource):
    class Meta:
        model = Office

class UserResource(resources.ModelResource):
    class Meta:
        model = User

class PositionResource(resources.ModelResource):
    class Meta:
        model = Position

class ServiceResource(resources.ModelResource):
    class Meta:
        model = Service

class RequirementResource(resources.ModelResource):
    class Meta:
        model = Requirement

class StepResource(resources.ModelResource):
    class Meta:
        model = Step

class StepPositionResource(resources.ModelResource):
    class Meta:
        model = StepPosition