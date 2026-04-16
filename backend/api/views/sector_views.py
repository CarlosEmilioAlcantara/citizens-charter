from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Sector
from ..serializers import SectorSerializer, SectorBulkUpdateSerializer
from ..permissions import IsSuperuser
from ..mixins import BulkDeleteMixin, BulkUpdateMixin
from ..utils.view_utils import audit_save, audit_delete

class SectorView(APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def post(self, request):
        serializer = SectorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        sector = get_object_or_404(Sector, pk=pk)
        audit_delete(sector, request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        sector = get_object_or_404(Sector, pk=pk)
        serializer = SectorSerializer(sector, data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteSectorView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Sector.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}

class UpdateSectorView(BulkUpdateMixin, APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Sector.objects.all()

    def get_serializer_class(self):
        return SectorBulkUpdateSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class SectorListView(ListAPIView):
    queryset = Sector.objects.prefetch_related(
        'offices',
    ).annotate(
        office_count=Count('offices')
    ).order_by('id')
    permission_classes = [IsAuthenticated, IsSuperuser]
    serializer_class = SectorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset