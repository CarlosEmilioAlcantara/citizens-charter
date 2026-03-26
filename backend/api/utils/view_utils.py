from rest_framework import status
from rest_framework.response import Response
from auditlog.context import set_actor

def audit_save(serializer, request):
    if serializer.is_valid():
        with set_actor(request.user):
            serializer.save()
    else:
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )

def audit_delete(instance, request):
    with set_actor(request.user):
        instance.delete()