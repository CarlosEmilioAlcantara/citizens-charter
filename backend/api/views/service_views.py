from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Office, Service
from ..serializers import ServiceSerializer
from ..permissions import IsInOffice

class ServiceView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

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
        self.check_object_permissions(request, service)
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        self.check_object_permissions(request, service)
        serializer = ServiceSerializer(service, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteServiceView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def post(self, request):
        data = request.data.get('services')
        service = Service.objects.filter(pk__in=data)
        existing_services = list(service.values_list('pk', flat=True))
        missing = set(data) - set(existing_services)

        if missing:
            return Response(
                data=f"Values {missing} sent are missing.",
                status=status.HTTP_400_BAD_REQUEST
            )

        to_delete = Service.objects.filter(pk__in=existing_services)
        self.check_object_permissions(request, to_delete)
        to_delete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

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