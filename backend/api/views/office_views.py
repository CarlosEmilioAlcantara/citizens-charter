from django.shortcuts import get_object_or_404
from django.db.models import Count
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Office
from ..serializers import OfficeBulkUpdateSerializer, OfficeSerializer
from ..permissions import IsSuperuser
from ..mixins import BulkDeleteMixin, BulkUpdateMixin
from ..utils.view_utils import audit_save, audit_delete

class OfficeView(APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def post(self, request):
        serializer = OfficeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def delete(self, request, pk=None):
        office = get_object_or_404(Office, pk=pk)
        audit_delete(office, request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        office = get_object_or_404(Office, pk=pk)
        serializer = OfficeSerializer(office, data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteOfficeView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Office.objects.all()

class UpdateOfficeView(BulkUpdateMixin, APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Office.objects.all()

    def get_serializer_class(self):
        return OfficeBulkUpdateSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class OfficeListView(ListAPIView):
    queryset = Office.objects.prefetch_related(
        'services',
        'users',
        'positions'
    ).annotate(
        service_count=Count('services'),
        user_count=Count('users'),
        position_count=Count('positions')
    ).order_by('id')
    permission_classes = [IsAuthenticated, IsSuperuser]
    serializer_class = OfficeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset