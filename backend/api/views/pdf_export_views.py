import io
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.http import StreamingHttpResponse
from django.core.files import File
from django.template.loader import render_to_string
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from auditlog.context import set_actor
from pypdf import PdfWriter
from weasyprint import HTML, CSS
from ..models import Office, Service, CitizensCharter
from ..renderers import PDFRenderer
from ..utils.citizens_charter_utils import (
    create_citizens_charter_single,
    create_citizens_charter_whole,
)
from ..utils.pdf_utils import create_pdf
from ..utils.report_utils import create_office_report
from ..serializers import CitizensCharterSerializer
from ..permissions import IsInOffice

class ExportOfficeReportView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PDFRenderer]

    def get(self, request):
        data = create_office_report(request)
        html = render_to_string('documents/office-report.html', context=data)

        buffer = io.BytesIO()
        HTML(
            string=html,
            base_url=request.build_absolute_uri('/api/')
        ).write_pdf(
            buffer,
            stylesheets=[
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/report-styles.css",
            ]
        )
        buffer.seek(0)

        return StreamingHttpResponse(
            buffer,
            content_type='application/pdf',
            headers={
                'Content-Disposition': 
                    f"attachment; filename={data.get('office_name')}-report.pdf"
            }
        )

class ExportCitizensCharterView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]
    renderer_classes = [PDFRenderer]
    
    def get(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        self.check_object_permissions(request, service) 
        office_name, service = create_citizens_charter_single(request, pk)
        html = render_to_string(
            'documents/citizens-charter.html', 
            context={
                'office_name': office_name, 
                'service': service
            }
        )

        buffer = io.BytesIO()
        HTML(
            string=html,
            base_url=request.build_absolute_uri('/api/')
        ).write_pdf(
            buffer,
            stylesheets=[
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/citizens-charter-styles.css",
            ]
        )
        buffer.seek(0)

        return StreamingHttpResponse(
            buffer,
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

        buffer = io.BytesIO()
        HTML(
            string=html, 
            base_url=request.build_absolute_uri('/api/')
        ).write_pdf(
            buffer,
            stylesheets=[
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/citizens-charter-styles.css",
            ]
        )
        buffer.seek(0)

        return StreamingHttpResponse(
            buffer,
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

        buffer = io.BytesIO()
        HTML(
            string=html, 
            base_url=request.build_absolute_uri('/api/')
        ).write_pdf(
            buffer,
            stylesheets=[
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/citizens-charter-styles.css",
            ]
        )
        buffer.seek(0)

        return StreamingHttpResponse(
            buffer,
            content_type='application/pdf',
            headers={
                'Content-Disposition': 
                    f"attachment; filename={office_name}-report.pdf"
            }
        )

class CreateCitizensCharterPdfsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    # renderer_classes = [PDFRenderer]
    
    def put(self, request):
        offices = list(Office.objects.all().order_by('id'))

        existing_charters = {
            charter.office_id: charter
            for charter in CitizensCharter.objects.filter(office__in=offices)
        }
        new_charters = []

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

            pdf = create_pdf(
                html, 
                request, 
                stylesheets=[
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/citizens-charter-styles.css",
                ]
            )

            charter = existing_charters.get(office.id)
            if charter:
                with set_actor(request.user):
                    charter.pdf.save(
                        name=f"{office.name}.pdf",
                        content=File(io.BytesIO(pdf)),
                        save=True
                    )
            else:
                new_charters.append(
                    CitizensCharter(
                        name=f"{office.name}.pdf",
                        office=office
                    )
                )

        created = CitizensCharter.objects.bulk_create(new_charters)
        for charter in created:
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

            pdf = create_pdf(
                html, 
                request, 
                stylesheets=[
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/citizens-charter-styles.css",
                ]
            )

            office = charter.office
            with set_actor(request.user):
                charter.pdf.save(
                    name=f"{office.name}.pdf",
                    content=File(io.BytesIO(pdf)),
                    save=True
                )

        return Response(status=status.HTTP_201_CREATED)

class CreateCitizensCharterSinglePdfView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, pk):
        office_name, services = create_citizens_charter_whole(
            request, pk
        )
        html = render_to_string(
            'documents/citizens-charter.html', 
            context={
                'office_name': office_name, 
                'services': services
            }
        )

        pdf = create_pdf(
            html, 
            request, 
            stylesheets=[
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/reset.css",
                f"{settings.BASE_DIR}/api/static/citizens_charter/css/citizens-charter-styles.css",
            ]
        )

        charter = CitizensCharter.objects.get(office_id=pk)

        with set_actor(request.user):
            charter.pdf.save(
                name=f"{charter.office.name}.pdf",
                content=File(io.BytesIO(pdf)),
                save=True
            )
        
        return Response(status=status.HTTP_200_OK)

class DownloadCitizensCharterPdfView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(CitizensCharter, pk=pk)
        
        with instance.pdf.open('rb') as pdf:
            buffer = io.BytesIO(pdf.read())
            buffer.seek(0)

        return StreamingHttpResponse(
            buffer,
            content_type='application/pdf',
            headers={
                'Content-Disposition': 
                    f"attachment; filename={instance.office.name}.pdf"
            }
        )

class DeleteCitizensCharterPdfView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, pk):
        charter = get_object_or_404(CitizensCharter, pk=pk)
        with set_actor(request.user):
            charter.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class CitizensCharterListView(ListAPIView):
    queryset = CitizensCharter.objects.all().order_by('id')
    serializer_class = CitizensCharterSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['office']

    def get_queryset(self):
        return self.queryset

class CreateCitizensCharterCompilationView(APIView):
    charters = CitizensCharter.objects.all().values_list('pdf', flat=True).order_by('id')
    merger = PdfWriter()

    def get(self, request):
        # print(self.charters)
        for pdf in self.charters:
            self.merger.append(f"{settings.MEDIA_ROOT}/{pdf}")

        buffer = io.BytesIO()
        self.merger.write(buffer)
        self.merger.close()
        buffer.seek(0)

        return StreamingHttpResponse(
            buffer,
            content_type='application/pdf',
            headers={
                'Content-Disposition': 
                    'attachment; filename=compilation.pdf'
            }
        )
        # return Response(status=status.HTTP_200_OK)