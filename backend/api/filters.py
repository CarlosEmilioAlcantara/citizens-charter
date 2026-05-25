import django_filters
from .models import CitizensCharter

class CitizensCharterFilter(django_filters.FilterSet):
    sector__name = django_filters.CharFilter(
        field_name='sector__name',
        lookup_expr='icontains'
    )

    class Meta:
        model = CitizensCharter
        fields = ['sector__name']