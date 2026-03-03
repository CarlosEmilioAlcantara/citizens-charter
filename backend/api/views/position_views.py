from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from ..models import Position
from ..serializers import PositionBulkUpdateSerializer, PositionSerializer

class PositionView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = PositionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        position = get_object_or_404(Position, pk=pk)
        position.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        position = get_object_or_404(Position, pk=pk)
        serializer = PositionSerializer(position, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class DeletePositionView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        if any('pk' not in item for item in request.data):
            return Response(
                data='Every item must include a pk.',
                status=status.HTTP_400_BAD_REQUEST
            )

        pks = [item['pk'] for item in request.data]
        position = Position.objects.filter(pk__in=pks)
        existing = list(position.values_list('pk', flat=True))
        missing = set(pks) - set(existing)

        if missing:
            return Response(
                data=f"Values {missing} sent are missing.",
                status=status.HTTP_400_BAD_REQUEST
            )

        to_delete = Position.objects.filter(pk__in=existing)
        to_delete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class UpdatePositionView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        pks = [item['pk'] for item in request.data]
        queryset = list(Position.objects.filter(pk__in=pks))
        serializer = PositionBulkUpdateSerializer(
            queryset,
            data=request.data,
            many=True
        )

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class PositionListView(ListAPIView):
    queryset = Position.objects.all().order_by('id')
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = PositionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset