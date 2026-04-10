from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from ..models import Position
from ..serializers import PositionBulkUpdateSerializer, PositionSerializer
from ..mixins import BulkDeleteMixin, BulkUpdateMixin
from ..utils.view_utils import audit_save, audit_delete

class PositionView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = PositionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        position = get_object_or_404(Position, pk=pk)
        audit_delete(position, request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        position = get_object_or_404(Position, pk=pk)
        serializer = PositionSerializer(position, data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeletePositionView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return Position.objects.all()
    
class UpdatePositionView(BulkUpdateMixin, APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return Position.objects.all()

    def get_serializer_class(self):
        return PositionBulkUpdateSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class PositionListView(ListAPIView):
    queryset = Position.objects.all().order_by('id')
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = PositionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset