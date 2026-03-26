from django.db.models import Sum
from ..models import Office, Service, Requirement, Step
from .time_utils import create_total_time

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