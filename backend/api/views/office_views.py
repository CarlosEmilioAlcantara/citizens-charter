from django.shortcuts import get_object_or_404
from django.db.models import Count
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import Office
from ..serializers import OfficeSerializer

class OfficeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')

        serializer = OfficeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def delete(self, request, pk):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')
        office = get_object_or_404(Office, pk=pk)
        office.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')

        office = get_object_or_404(Office, pk=pk)
        serializer = OfficeSerializer(office, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class OfficeListView(ListAPIView):
    queryset = Office.objects.prefetch_related(
        'services'
    ).annotate(
        service_count=Count('services')
    ).order_by('id')
    permission_classes = [IsAuthenticated]
    serializer_class = OfficeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return super().get_queryset()
        else:
            raise PermissionDenied('Superadmin only.')