from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import CitizensCharter

class CitizensCharterFiltersView(APIView):
    def get(self, request):
        data = CitizensCharter.objects.values_list(
            'sector__name', flat=True
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)