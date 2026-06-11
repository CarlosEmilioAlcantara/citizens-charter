from django.db.models import Case, When, Value, CharField
from auditlog.models import LogEntry
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from ..permissions import IsSuperuser
from ..mixins import BulkDeleteMixin
from ..serializers import AuditLogSerializer
from ..pagers import MyCustomPagination
from ..filters import CharterAuditFilter

content_types = [6, 7, 12, 16, 17]

class AuditLogListView(ListAPIView):
    queryset = LogEntry.objects.exclude(
        content_type_id__in=content_types
    ).annotate(
        action_name=Case(
            When(action=LogEntry.Action.CREATE, then=Value("CREATE")),
            When(action=LogEntry.Action.UPDATE, then=Value("UPDATE")),
            When(action=LogEntry.Action.DELETE, then=Value("DELETE")),
            output_field=CharField(),
        )
    ).order_by('-timestamp')
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AuditLogSerializer
    pagination_class = MyCustomPagination
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    search_fields = ['actor__name']
    ordering_fields = [
        'actor__name', 
        'content_type__model', 
        'timestamp',
        'action_name',
    ]
    filterset_class = CharterAuditFilter

    def get_queryset(self):
        return self.queryset
    
class SuperadminAuditLogListView(ListAPIView):
    queryset = LogEntry.objects.filter(
        content_type_id__in=content_types
    ).annotate(
        action_name=Case(
            When(action=LogEntry.Action.CREATE, then=Value("CREATE")),
            When(action=LogEntry.Action.UPDATE, then=Value("UPDATE")),
            When(action=LogEntry.Action.DELETE, then=Value("DELETE")),
            output_field=CharField(),
        )
    ).order_by('-timestamp')
    permission_classes = [IsAuthenticated, IsSuperuser]
    serializer_class = AuditLogSerializer
    pagination_class = MyCustomPagination
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    search_fields = ['actor__name']
    ordering_fields = [
        'actor__name', 
        'content_type__model', 
        'timestamp',
        'action_name',
    ]

    def get_queryset(self):
        return self.queryset

class DeleteAuditLogView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return LogEntry.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}