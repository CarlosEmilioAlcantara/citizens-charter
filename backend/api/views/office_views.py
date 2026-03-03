from django.shortcuts import get_object_or_404
from django.db import transaction
from django.db.models import Count
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..mixins import BulkDeleteMixin, BulkUpdateMixin, PkRequiredMixin
from ..models import Office
from ..serializers import OfficeBulkUpdateSerializer, OfficeSerializer
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
    
    def delete(self, request, pk=None):
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

class DeleteOfficeView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Office.objects.all()

class UpdateOfficeView(BulkUpdateMixin, APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Office.objects.all()

    def get_serializer_class(self):
        return OfficeBulkUpdateSerializer

    # def post(self, request):
    #     if any('pk' not in item for item in request.data):
    #         return Response(
    #             data='Every item must include a pk.',
    #             status=status.HTTP_400_BAD_REQUEST
    #         )

    #     pks = [item['pk'] for item in request.data]
    #     queryset = list(Office.objects.filter(pk__in=pks))
    #     serializer = OfficeBulkUpdateSerializer(
    #         queryset,
    #         data=request.data,
    #         many=True
    #     )

    #     if serializer.is_valid():
    #         serializer.save()
    #     else:
    #         return Response(
    #             serializer.errors,
    #             status=status.HTTP_400_BAD_REQUEST
    #         )

    #     return Response(serializer.data, status=status.HTTP_200_OK)

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