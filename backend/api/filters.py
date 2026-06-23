import django_filters
from django.db.models import Count
from auditlog.models import LogEntry
from .models import Service, Sector, CitizensCharter, Office, Position, User

class SectorFilter(django_filters.FilterSet):
    office_count_range = django_filters.CharFilter(
        method='filter_office_count_range'
    )

    def filter_office_count_range(self, queryset, name, value):
        queryset = queryset.annotate(
            office_count=Count('offices')
        )

        ranges = {
            '0-10': (0, 10),
            '11-20': (11, 20),
            '21-30': (21, 30),
            '31-40': (31, 40),
            '41-50': (41, 50),
            '51-Max': (51, None),
        }

        min_count, max_count = ranges.get(value, (None, None))

        if min_count is not None:
            queryset = queryset.filter(office_count__gte=min_count)
        if max_count is not None:
            queryset = queryset.filter(office_count__lte=max_count)

        return queryset

class SectorNameFilterSet(django_filters.FilterSet):
    sector__name = django_filters.CharFilter(
        field_name='sector__name',
        lookup_expr='icontains'
    )

class CitizensCharterFilter(SectorNameFilterSet):
    class Meta:
        model = CitizensCharter
        fields = ['sector__name']

class OfficeFilter(SectorNameFilterSet):
    class Meta:
        model = Office
        fields = ['sector__name']

class OfficeNameFilterSet(django_filters.FilterSet):
    office__name = django_filters.CharFilter(
        field_name='office__name',
        lookup_expr='icontains'
    )

class PositionFilter(OfficeNameFilterSet):
    class Meta:
        model = Position
        fields = ['office__name']

class UserFilter(OfficeNameFilterSet):
    class Meta:
        model = User
        fields = ['office__name']

class CharterAuditFilter(django_filters.FilterSet):
    model_name = django_filters.CharFilter(
        field_name='content_type__model',
        lookup_expr='icontains'
    )

    class Meta:
        model = LogEntry
        fields = ['content_type__model']

class AdminAuditFilter(django_filters.FilterSet):
    model_name = django_filters.CharFilter(
        field_name='content_type__model',
        lookup_expr='icontains'
    )

    class Meta:
        model = LogEntry
        fields = ['content_type__model']

class ServiceFilter(django_filters.FilterSet):
    classification_types = django_filters.CharFilter(
        field_name='classification_types',
        lookup_expr='iexact'
    ) 

    class Meta:
        model = Service
        fields = ['classification_types']