from django.shortcuts import get_object_or_404
from django.db.models import Count
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Office
from ..serializers import OfficeSerializer
from ..permissions import IsSuperuser

class OfficeView(APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def post(self, request):
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
        office = get_object_or_404(Office, pk=pk)
        office.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
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
        'services',
        'users',
        'positions'
    ).annotate(
        service_count=Count('services'),
        user_count=Count('users'),
        position_count=Count('positions')
    ).order_by('id')
    permission_classes = [IsAuthenticated, IsSuperuser]
    serializer_class = OfficeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset