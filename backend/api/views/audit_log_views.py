from auditlog.models import LogEntry
from rest_framework import filters
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from ..permissions import IsSuperuser
from ..pagers import MyCustomPagination
from ..serializers import AuditLogSerializer

content_types = [6, 7, 12, 16, 17]

class AuditLogListView(ListAPIView):
    queryset = LogEntry.objects.exclude(
        content_type_id__in=content_types
    ).order_by('-timestamp')
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AuditLogSerializer
    pagination_class = MyCustomPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['content_type_model']

    def get_queryset(self):
        return self.queryset
    
class SuperadminAuditLogListView(ListAPIView):
    queryset = LogEntry.objects.filter(
        content_type_id__in=content_types
    ).order_by('-timestamp')
    permission_classes = [IsAuthenticated, IsSuperuser]
    serializer_class = AuditLogSerializer
    filter_backends = [filters.SearchFilter]
    pagination_class = MyCustomPagination
    search_fields = ['content_type_model']

    def get_queryset(self):
        return self.queryset