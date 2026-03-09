from django.conf import settings
from django.db.models import Sum
from weasyprint import HTML, CSS
from .models import Service, Requirement, Step

def pdf_chunks(html, request, stylesheet):
    pdf = HTML(
        string=html, 
        base_url=settings.STATIC_URL
    ).write_pdf(
        stylesheets=[
            CSS(stylesheet)
        ]
    )

    chunk_size = 8192
    for i in range(0, len(pdf), chunk_size):
        yield pdf[i:i+chunk_size]

def create_office_report(request):
        total_service = Service.objects.filter(
            office_id=request.user.office_id
        ).count()
        total_requirement = Requirement.objects.filter(
            service__office_id=request.user.office_id
        ).count()
        total_step = Step.objects.filter(
            service__office_id=request.user.office_id
        ).count()
        # total_action = Step.objects.filter(
        #     service__office_id=request.user.office_id
        # ).values('action').count()
        total_price = Step.objects.filter(
            service__office_id=request.user.office_id
        ).aggregate(total_price=Sum('fee'))
        total_time = Step.objects.filter(
            service__office_id=request.user.office_id
        ).aggregate(total_time=Sum('processing_time'))


        data = {
            'total_service': total_service,
            'total_requirement': total_requirement,
            'total_step': total_step,
            # 'total_action': total_action,
            'total_price': total_price,
            'total_time': total_time,
        }

        return data