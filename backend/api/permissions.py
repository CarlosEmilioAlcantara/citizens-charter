from django.db.models import QuerySet
from rest_framework import permissions
from .models import Office

class IsSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

class IsInOffice(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            _ = Office.objects.get(pk=request.user.office_id)
            return _
        except Office.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        if isinstance(obj, QuerySet):
            try:
                office_ids = list(obj.values_list('office_id', flat=True))
            except ValueError:
                office_ids = list(
                    obj.values_list('service__office_id', flat=True)
                )
            return all(
                office_id == request.user.office_id for office_id in office_ids
            )
        else:
            if obj.office_id == request.user.office_id:
                return True
            else:
                return False