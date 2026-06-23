from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from auditlog.models import LogEntry
from ..models import Sector, Office, CitizensCharter, Position

class AmountFiltersView(APIView):
    def get(self, request):
        return Response(data=[
            '0-10', 
            '11-20', 
            '21-30', 
            '31-40', 
            '41-50', 
            '51-Max',
        ], status=status.HTTP_200_OK)

class CitizensCharterFiltersView(APIView):
    def get(self, request):
        data = CitizensCharter.objects.values_list(
            'sector__name', flat=True
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)

class SectorFiltersView(APIView):
    def get(self, request):
        data = Sector.objects.values_list(
            'name', flat=True
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)

class OfficeFiltersView(APIView):
    def get(self, request):
        data = Office.objects.values_list(
            'name', flat=True
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)

class PositionFiltersView(APIView):
    def get(self, request):
        data = Position.objects.values_list(
            'office__name', flat=True
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)

class CharterAuditFiltersView(APIView):
    content_types = [6, 7, 12, 16, 17]
    def get(self, request):
        data = LogEntry.objects.exclude(
            content_type_id__in=self.content_types
        ).values_list(
            'content_type__model', flat=True
        ).order_by(
            'content_type__model'
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)

class AdminAuditFiltersView(APIView):
    content_types = [6, 7, 12, 16, 17]
    def get(self, request):
        data = LogEntry.objects.filter(
            content_type_id__in=self.content_types
        ).values_list(
            'content_type__model', flat=True
        ).order_by(
            'content_type__model'
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)