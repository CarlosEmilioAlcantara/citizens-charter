from django.conf import settings
from django.http import StreamingHttpResponse
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..renderers import PDFRenderer
from ..utils.citizens_charter_utils import (
    create_citizens_charter_single,
    create_citizens_charter_whole,
)
from ..utils.pdf_utils import (
    pdf_chunks,
)
from ..utils.report_utils import (
    create_office_report
)

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
    
    def get(self, request, pk):
        office_name, service = create_citizens_charter_single(request, pk)
        html = render_to_string(
            'documents/citizens-charter.html', 
            context={
                'office_name': office_name, 
                'service': service
            }
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

class ExportCitizensCharterWholeView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PDFRenderer]
    
    def get(self, request):
        office_name, services = create_citizens_charter_whole(request)
        html = render_to_string(
            'documents/citizens-charter.html', 
            context={
                'office_name': office_name, 
                'services': services
            }
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

class ExportCitizensCharterOfficeView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    renderer_classes = [PDFRenderer]
    
    def get(self, request, pk):
        office_name, services = create_citizens_charter_whole(request, pk)
        html = render_to_string(
            'documents/citizens-charter.html', 
            context={
                'office_name': office_name, 
                'services': services
            }
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