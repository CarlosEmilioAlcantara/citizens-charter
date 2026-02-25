from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Service, Step
from ..serializers import StepSerializer
from ..permissions import IsInOffice

class CreateStepView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def post(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        self.check_object_permissions(request, service)
        serializer = StepSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(service=service)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            serializer.data, 
            status=status.HTTP_200_OK
        )

class StepView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def delete(self, request, pk):
        step = get_object_or_404(Step, pk=pk)
        self.check_object_permissions(request, step.service)
        step.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        step = get_object_or_404(Step, pk=pk)
        self.check_object_permissions(request, step.service)
        serializer = StepSerializer(step, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

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