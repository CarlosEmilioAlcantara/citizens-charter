from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Requirement, Service
from ..serializers import RequirementSerializer
from ..permissions import IsInOffice

class CreateRequirementView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def post(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        self.check_object_permissions(request, service)
        serializer = RequirementSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(service=service)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class RequirementView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def delete(self, request, pk):
        requirement = get_object_or_404(Requirement, pk=pk)
        self.check_object_permissions(request, requirement.service)
        requirement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        requirement = get_object_or_404(Requirement, pk=pk)
        self.check_object_permissions(request, requirement.service)
        serializer = RequirementSerializer(requirement, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

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