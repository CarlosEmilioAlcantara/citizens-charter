from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Office, Service
from ..serializers import ServiceBulkUpdateSerializer, ServiceSerializer
from ..permissions import IsInOffice
from ..mixins import BulkDeleteMixin, BulkUpdateMixin
from ..utils.view_utils import audit_save, audit_delete

class ServiceView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def post(self, request):
        office = get_object_or_404(Office, pk=self.request.user.office_id)

        data = request.data
        data['office'] = office.pk
        serializer = ServiceSerializer(data=data)

        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        self.check_object_permissions(request, service)
        audit_delete(service, request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        office = get_object_or_404(Office, pk=self.request.user.office_id)
        data = request.data
        data['office'] = office.pk

        self.check_object_permissions(request, service)
        serializer = ServiceSerializer(service, data=data)

        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteServiceView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def get_queryset(self):
        return Service.objects.all()
    
class UpdateServiceView(BulkUpdateMixin, APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def get_queryset(self):
        return Service.objects.all()

    def get_serializer_class(self):
        return ServiceBulkUpdateSerializer

class ServiceListView(ListAPIView):
    queryset = Service.objects.all().order_by('id')
    permission_classes = [IsAuthenticated, IsInOffice]
    serializer_class = ServiceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        excluded_queryset = self.queryset.filter(
            office_id=self.request.user.office_id
        ).order_by('id')
        return excluded_queryset