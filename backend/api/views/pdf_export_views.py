from django.conf import settings
from django.http import StreamingHttpResponse
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..renderers import PDFRenderer
from ..models import Office
from ..permissions import IsSuperuser
from ..utils import pdf_chunks, create_office_report

class ExportOfficeReportView(APIView):
    # permission_classes = [IsAuthenticated]
    renderer_classes = [PDFRenderer]

    def get(self, request):
        data = create_office_report(request)
        html = render_to_string('documents/office-report.html', context=data)

        return StreamingHttpResponse(
            pdf_chunks(
                html, 
                request, 
                stylesheet=
                    f"{settings.BASE_DIR}/api/static/citizens_charter/css/report-styles.css",
            ),
            content_type='application/pdf',
            headers={
                'Content-Disposition': 
                    f"attachment; filename={data.get('office_name')}-report.pdf"
            }
        )