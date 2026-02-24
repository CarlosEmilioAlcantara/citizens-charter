from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Service, Step
from ..serializers import StepSerializer

class CreateStepView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        service = get_object_or_404(Service, pk=pk)

        if self.request.user.office_id != service.office_id:
            raise PermissionDenied('You are not part of this Office.')

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
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        step = get_object_or_404(Step, pk=pk)
        
        if self.request.user.office_id != step.service.office_id:
            raise PermissionDenied('You are not part of this Office.')

        step.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        step = get_object_or_404(Step, pk=pk)

        if self.request.user.office_id != step.service.office_id:
            raise PermissionDenied('You are not part of this Office.')

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
    permission_classes = [IsAuthenticated]
    serializer_class = StepSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        excluded_queryset = self.queryset.filter(
            service_id=self.kwargs.get('pk')
        ).order_by('id')
        return excluded_queryset