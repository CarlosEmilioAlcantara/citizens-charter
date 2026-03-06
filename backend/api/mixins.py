import io
import zipfile
from django.db import transaction
from django.http import StreamingHttpResponse, FileResponse
from rest_framework import status
from rest_framework.response import Response

class BulkDeleteMixin:
    service_child = False

    def delete(self, request):
        if not isinstance(request.data, dict) or not request.data:
            return Response(
                data={'detail': 'No items provided.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        data = request.data
        pks = data.get('pks')

        if not isinstance(pks, list) or not pks:
            return Response(
                data={'detail': 'No pks provided.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not all(isinstance(pk, int) for pk in pks):
            return Response(
                data={'detail': 'Pks must be integers.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(pks) != len(set(pks)):
            return Response(
                data={'detail': 'Pks must not have duplicates.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        queryset = self.get_queryset()
        existing = list(
            queryset.filter(pk__in=pks).values_list('pk', flat=True)
        )

        missing = set(pks) - set(existing)
        if missing:
            return Response(
                data=f"Some instances, {missing}, do not exist.",
                status=status.HTTP_400_BAD_REQUEST
            )

        for obj in queryset.filter(pk__in=existing):
            self.check_object_permissions(
                request, 
                self.service_child and obj.service or obj
            )

        with transaction.atomic():
            queryset.filter(pk__in=existing).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class BulkUpdateMixin:
    service_child = False

    def put(self, request):
        if not isinstance(request.data, list) or not request.data:
            return Response(
                data={'detail': 'No items provided.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if any('pk' not in item for item in request.data):
            return Response(
                data={'detail': 'Every item must include a pk.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        pks = [item['pk'] for item in request.data]

        if len(pks) != len(set(pks)):
            return Response(
                data={'detail': 'Pks must not have duplicates.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        queryset = self.get_queryset()
        existing = list(
            queryset.filter(pk__in=pks).values_list('pk', flat=True)
        )

        missing = set(pks) - set(existing)
        if missing:
            return Response(
                data=f"Some instances, {missing}, do not exist.",
                status=status.HTTP_400_BAD_REQUEST
            )

        for obj in queryset.filter(pk__in=existing):
            self.check_object_permissions(
                request, 
                self.service_child and obj.service or obj
            )

        serializer_class = self.get_serializer_class()
        
        serializer = serializer_class(
            queryset.filter(pk__in=existing),
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

class ExportCsvMixin:
    model = ''

    def get(self, request):
        queryset = self.get_queryset()
        resource = self.get_resource()
        dataset = resource.export(queryset)

        return StreamingHttpResponse(
            dataset.csv,
            content_type='text/csv',
            headers={
                'Content-Disposition': f"attachment; filename={self.model}.csv"
            }
        )