from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Service, Step
from ..serializers import StepBulkUpdateSerializer, StepSerializer
from ..permissions import IsInOffice
from ..mixins import BulkDeleteMixin, BulkUpdateMixin
from ..utils.view_utils import audit_save, audit_delete

class CreateStepView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def post(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        self.check_object_permissions(request, service)

        data = request.data
        data['service'] = service.pk
        serializer = StepSerializer(data=data)
        
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class StepView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def delete(self, request, pk):
        step = get_object_or_404(Step, pk=pk)
        self.check_object_permissions(request, step.service)
        audit_delete(step, request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        step = get_object_or_404(Step, pk=pk)
        self.check_object_permissions(request, step.service)

        data = request.data
        data['service'] = step.service_id
        serializer = StepSerializer(step, data=data)

        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteStepView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsInOffice]
    service_child = True

    def get_queryset(self):
        return Step.objects.all()
    
class UpdateStepView(BulkUpdateMixin, APIView):
    permission_classes = [IsAuthenticated, IsInOffice]
    service_child = True

    def get_queryset(self):
        return Step.objects.all()

    def get_serializer_class(self):
        return StepBulkUpdateSerializer

class StepListView(ListAPIView):
    queryset = Step.objects.all().order_by('id')
    permission_classes = [IsAuthenticated, IsInOffice]
    serializer_class = StepSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        excluded_queryset = self.queryset.filter(
            service_id=self.kwargs.get('pk'),
            service__office_id=self.request.user.office_id
        ).order_by('id')
        return excluded_queryset