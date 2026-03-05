from django.contrib import admin
from import_export import resources
from .models import Office

# Register your models here.
class OfficeResource(resources.ModelResource):
    class Meta:
        model = Office