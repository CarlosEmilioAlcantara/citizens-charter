from django.conf import settings
from django.http import StreamingHttpResponse
from django.template.loader import render_to_string
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..renderers import PDFRenderer
from ..permissions import IsSuperuser
from ..utils import pdf_chunks, create_office_report, create_citizens_charter

class ExportOfficeReportView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PDFRenderer]

    def get(self, request):
        data = create_office_report(request)
        html = render_to_string('documents/office-report.html', context=data)

        return StreamingHttpResponse(
            pdf_chunks(
                html, 
                request, 
                stylesheets=[
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/report-styles.css",
                ]
            ),
            content_type='application/pdf',
            headers={
                'Content-Disposition': 
                    f"attachment; filename={data.get('office_name')}-report.pdf"
            }
        )

class ExportCitizensCharterView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PDFRenderer]
    
    def get(self, request):
        service_id = self.kwargs.get('pk')
        if service_id:
            office_name, service = create_citizens_charter(request, service_id)
        
        office_name, services = create_citizens_charter(request)

        html = render_to_string(
            'documents/citizens-charter.html', 
            context={'office_name': office_name, 'services': services}
        )

        return StreamingHttpResponse(
            pdf_chunks(
                html, 
                request, 
                stylesheets=[
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/citizens-charter-styles.css",
                ]
            ),
            content_type='application/pdf',
            headers={
                'Content-Disposition': 
                    f"attachment; filename={office_name}-report.pdf"
            }
        )