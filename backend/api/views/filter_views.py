from itertools import combinations
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from auditlog.models import LogEntry
from ..models import Service, Sector, Office, CitizensCharter, Position
from ..permissions import IsSuperuser

class AmountFiltersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

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
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        data = Sector.objects.values_list(
            'name', flat=True
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)

class OfficeFiltersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        data = Office.objects.values_list(
            'name', flat=True
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)

class PositionFiltersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        data = Position.objects.values_list(
            'office__name', flat=True
        ).distinct()
        return Response(data=data, status=status.HTTP_200_OK)

class CharterAuditFiltersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

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
    permission_classes = [IsAuthenticated, IsSuperuser]

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

class ServiceFiltersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        classification_types = [
            classification[0]
            for classification
            in Service._meta.get_field('classification_types').choices
        ]
        classification_twos = [
            ",".join(classification) 
            for classification 
            in combinations(classification_types, 2)
        ]
        classification_threes = [
            ",".join(classification) 
            for classification 
            in combinations(classification_types, 3)
        ]
        classification_fours = [
            ",".join(classification) 
            for classification 
            in combinations(classification_types, 4)
        ]
        data = classification_types + classification_twos + classification_threes + classification_fours

        return Response(data=data, status=status.HTTP_200_OK)