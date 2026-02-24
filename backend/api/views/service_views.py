from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Office, Service
from ..serializers import ServiceSerializer

class ServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        office = get_object_or_404(Office, pk=self.request.user.office_id)
        serializer = ServiceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(office=office)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        service = get_object_or_404(Service, pk=pk)

        if service.office_id != self.request.user.office_id:
            raise PermissionDenied('You are not part of this Office.')
        
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        service = get_object_or_404(Service, pk=pk)

        if service.office_id != self.request.user.office_id:
            raise PermissionDenied('You are not part of this Office.')

        serializer = ServiceSerializer(service, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class ServiceListView(ListAPIView):
    queryset = Service.objects.all().order_by('id')
    permission_classes = [IsAuthenticated]
    serializer_class = ServiceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        excluded_queryset = self.queryset.filter(
            office_id=self.request.user.office_id
        ).order_by('id')
        return excluded_queryset