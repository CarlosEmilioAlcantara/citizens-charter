from django.db.models import OuterRef, Subquery, Sum, Count
from weasyprint import HTML, CSS
from .models import Office, Service, Requirement, Step

def pdf_chunks(html, request, stylesheets):
    pdf = HTML(
        string=html, 
        base_url=request.build_absolute_uri('/api/')
    ).write_pdf(
        stylesheets=[CSS(stylesheet) for stylesheet in stylesheets]
    )

    chunk_size = 8192
    for i in range(0, len(pdf), chunk_size):
        yield pdf[i:i+chunk_size]

def create_total_time(total_time):
    if not total_time:
        return

    if total_time < 60:
        total_time = f"{total_time} Seconds"
    elif total_time < 3600:
        remaining_time = total_time % 60
        total_time = \
            total_time // 60 == 1 and "1 Minute" or f"{total_time // 60} Minutes"
    elif total_time < 86400:
        remaining_time = total_time % 3600
        total_time = \
            total_time // 3600 == 1 and "1 Hour" or f"{total_time // 3600} Hours"
    else:
        remaining_time = total_time % 86400
        total_time = \
            total_time // 86400 == 1 and "1 Day" or f"{total_time // 86400} Days"

    if remaining_time < 60:
        remaining_time = f"{total_time} Seconds"
    elif remaining_time < 3600:
        remaining_time = \
            remaining_time // 60 == 1 and "1 Minute" or f"{remaining_time // 60} Minutes"
    elif remaining_time < 86400:
        remaining_time = \
            remaining_time // 3600 == 1 and "1 Hour" or f"{remaining_time // 3600} Hours"
    else:
        remaining_time = \
            remaining_time // 86400 == 1 and "1 Day" or f"{remaining_time // 86400} Days"

    total_time = f"{total_time} and {remaining_time}"
    return total_time

def create_office_report(request):
    office = Office.objects.get(pk=request.user.office_id) 
    total_service = Service.objects.filter(
        office_id=office.pk
    ).count()
    total_requirement = Requirement.objects.filter(
        service__office_id=office.pk
    ).count()
    total_step = Step.objects.filter(
        service__office_id=office.pk
    ).count()
    total_price = Step.objects.filter(
        service__office_id=office.pk
    ).aggregate(total_price=Sum('fee'))
    total_time = Step.objects.filter(
        service__office_id=office.pk
    ).aggregate(total_time=Sum('processing_time'))

    data = {
        'office_name': office.name,
        'total_service': total_service,
        'total_requirement': total_requirement,
        'total_step': total_step,
        'total_price': total_price,
        'total_time': create_total_time(total_time['total_time']),
    }

    return data

def create_citizens_charter_single(request, pk):
    office = Office.objects.get(pk=request.user.office_id) 
    office_name = office.name

    step_queryset = Step.objects.filter(
        service=OuterRef('pk')
    ).values('service').annotate(
        total_fee=Sum('fee'),
        total_time=Sum('processing_time')
    )
    service = Service.objects.filter(
        pk=pk
    ).prefetch_related(
        'requirements',
        'steps'
    ).annotate(
        total_requirement=Count('requirements'),
        total_fee=Subquery(step_queryset.values('total_fee')),
        total_time=Subquery(step_queryset.values('total_time'))
    ).first()

    for step in service.steps.all():
        step.processing_time = create_total_time(
            step.processing_time
        )

    return (office_name, service)

def create_citizens_charter_whole(request, pk=None):
    office = Office.objects.get(pk=request.user.office_id) 
    office_name = office.name

    if pk:
        office_id = pk
    else:
        office_id = request.user.office.id
        
    step_queryset = Step.objects.filter(
        service=OuterRef('pk')
    ).values('service').annotate(
        total_fee=Sum('fee'),
        total_time=Sum('processing_time')
    )
    services = Service.objects.filter(
        office_id=office_id
    ).prefetch_related(
        'requirements',
        'steps'
    ).annotate(
        total_requirement=Count('requirements'),
        total_fee=Subquery(step_queryset.values('total_fee')),
        total_time=Subquery(step_queryset.values('total_time'))
    ).order_by('created_at')

    for service in services:
        service.total_time = create_total_time(service.total_time)

        for step in service.steps.all():
            step.processing_time = create_total_time(
                step.processing_time
            )

    return (office_name, services)