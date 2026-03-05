from import_export.mixins import ExportViewMixin
from rest_framework.views import APIView
from django.views.generic import ListView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Office
from ..admin import OfficeResource
from ..permissions import IsSuperuser
from ..mixins import ExportCsvMixin

class ExportOfficeCsvView(APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Office.objects.all()

    def get_resource(self):
        return OfficeResource()
    