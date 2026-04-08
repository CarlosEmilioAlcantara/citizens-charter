from django.db import transaction
from django.http import StreamingHttpResponse
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
        ids = data.get('ids')

        if not isinstance(ids, list) or not ids:
            return Response(
                data={'detail': 'No ids provided.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not all(isinstance(id, int) for id in ids):
            return Response(
                data={'detail': 'Ids must be integers.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(ids) != len(set(ids)):
            return Response(
                data={'detail': 'Ids must not have duplicates.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        queryset = self.get_queryset()
        existing = list(
            queryset.filter(id__in=ids).values_list('id', flat=True)
        )

        missing = set(ids) - set(existing)
        if missing:
            return Response(
                data=f"Some instances, {missing}, do not exist.",
                status=status.HTTP_400_BAD_REQUEST
            )

        for obj in queryset.filter(id__in=existing):
            self.check_object_permissions(
                request, 
                self.service_child and obj.service or obj
            )

        with transaction.atomic():
            queryset.filter(id__in=existing).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class BulkUpdateMixin:
    service_child = False

    def put(self, request):
        if not isinstance(request.data, list) or not request.data:
            return Response(
                data={'detail': 'No items provided.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if any('id' not in item for item in request.data):
            return Response(
                data={'detail': 'Every item must include an id.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        ids = [item['id'] for item in request.data]

        if len(ids) != len(set(ids)):
            return Response(
                data={'detail': 'Ids must not have duplicates.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        queryset = self.get_queryset()
        existing = list(
            queryset.filter(id__in=ids).values_list('id', flat=True)
        )

        missing = set(ids) - set(existing)
        if missing:
            return Response(
                data=f"Some instances, {missing}, do not exist.",
                status=status.HTTP_400_BAD_REQUEST
            )

        for obj in queryset.filter(id__in=existing):
            self.check_object_permissions(
                request, 
                self.service_child and obj.service or obj
            )

        serializer_class = self.get_serializer_class()
        context = self.get_serializer_context()

        serializer = serializer_class(
            queryset.filter(id__in=existing),
            data=request.data,
            many=True,
            context=context
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