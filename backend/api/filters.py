import django_filters
from django.db.models import Count
from .models import Sector, CitizensCharter

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

class CitizensCharterFilter(django_filters.FilterSet):
    sector__name = django_filters.CharFilter(
        field_name='sector__name',
        lookup_expr='icontains'
    )

    class Meta:
        model = CitizensCharter
        fields = ['sector__name']