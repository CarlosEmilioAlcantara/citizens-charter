from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Requirement, Service
from ..serializers import RequirementBulkUpdateSerializer, RequirementSerializer
from ..permissions import IsInOffice
from ..mixins import BulkDeleteMixin, BulkUpdateMixin
from ..utils.view_utils import audit_save, audit_delete

class CreateRequirementView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def post(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        self.check_object_permissions(request, service)
        serializer = RequirementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RequirementView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def delete(self, request, pk):
        requirement = get_object_or_404(Requirement, pk=pk)
        self.check_object_permissions(request, requirement.service)
        audit_delete(requirement, request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        requirement = get_object_or_404(Requirement, pk=pk)
        self.check_object_permissions(request, requirement.service)
        serializer = RequirementSerializer(requirement, data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteRequirementView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsInOffice]
    service_child = True

    def get_queryset(self):
        return Requirement.objects.all()
    
class UpdateRequirementView(BulkUpdateMixin, APIView):
    permission_classes = [IsAuthenticated, IsInOffice]
    service_child = True

    def get_queryset(self):
        return Requirement.objects.all()

    def get_serializer_class(self):
        return RequirementBulkUpdateSerializer

class RequirementListView(ListAPIView):
    queryset = Requirement.objects.all().order_by('id')
    permission_classes = [IsAuthenticated, IsInOffice]
    serializer_class = RequirementSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        excluded_queryset = self.queryset.filter(
            service_id=self.kwargs.get('pk'),
            service__office_id=self.request.user.office_id
        ).order_by('id')
        return excluded_queryset