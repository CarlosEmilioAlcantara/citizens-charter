import io
from django.conf import settings
from django.http import StreamingHttpResponse
from django.core.files import File
from django.template.loader import render_to_string
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..models import Office, CitizensCharter
from ..renderers import PDFRenderer
from ..utils.citizens_charter_utils import (
    create_citizens_charter_single,
    create_citizens_charter_whole,
)
from ..utils.pdf_utils import (
    pdf_chunks,
    pdf_whole,
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

class CreateCitizensCharterPdfsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    renderer_classes = [PDFRenderer]
    
    def put(self, request):
        offices = Office.objects.all().order_by('id')

        for office in offices:
            office_name, services = create_citizens_charter_whole(
                request, office.pk
            )
            html = render_to_string(
                'documents/citizens-charter.html', 
                context={
                    'office_name': office_name, 
                    'services': services
                }
            )

            pdf = pdf_whole(
                html, 
                request, 
                stylesheets=[
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/citizens-charter-styles.css",
                ]
            )

            if CitizensCharter.objects.filter(office=office).exists():
                charter = CitizensCharter.objects.get(office=office)
            else:
                charter = CitizensCharter.objects.create(
                    name=f"{office.name}.pdf",
                    office=office
                )

            charter.charter.save(
                name=f"{office.name}.pdf",
                content=File(io.BytesIO(pdf)),
                save=True
            )

        return Response(status=status.HTTP_200_OK)