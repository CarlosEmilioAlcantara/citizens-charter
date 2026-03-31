from rest_framework import status
from rest_framework.response import Response
from auditlog.context import set_actor

def audit_save(serializer, request):
    with set_actor(request.user):
        serializer.save()

def audit_delete(instance, request):
    with set_actor(request.user):
        instance.delete()