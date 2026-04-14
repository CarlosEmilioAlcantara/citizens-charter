from django.db.models import OuterRef, Subquery, Sum, Count
from ..models import Office, Service, Step
from .time_utils import create_total_time

def create_citizens_charter_single(request, pk):
    service = Service.objects.get(pk=pk)
    office = Office.objects.get(pk=service.office_id) 
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
    if pk:
        office = Office.objects.get(pk=pk) 
        office_id = pk
    else:
        office = Office.objects.get(pk=request.user.office_id) 
        office_id = request.user.office.id

    office_name = office.name
        
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
    ).order_by('number')

    for service in services:
        service.total_time = create_total_time(service.total_time)

        for step in service.steps.all():
            step.processing_time = create_total_time(
                step.processing_time
            )

    return (office_name, services)