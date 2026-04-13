from rest_framework import permissions

class IsSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

class IsInOffice(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.office_id == request.user.office_id:
            return True
        elif request.user.is_superuser:
            return True
        else:
            return False