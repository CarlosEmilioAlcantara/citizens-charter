from django.db import transaction
from rest_framework import status
from rest_framework.response import Response

class PkRequiredMixin:
    def post(self, request, *args, **kwargs):
        if any('pk' not in item for item in request.data):
            return Response(
                data='Every item must include a pk.',
                status=status.HTTP_400_BAD_REQUEST
            )
        
        response = super().post(request, *args, **kwargs)
        return response

class BulkDeleteMixin:
    def delete(self, request, *args, **kwargs):
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

        self.validated_pks = list(existing)

        with transaction.atomic():
            queryset.filter(pk__in=existing).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class BulkUpdateMixin:
    def put(self, request, *args, **kwargs):
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
