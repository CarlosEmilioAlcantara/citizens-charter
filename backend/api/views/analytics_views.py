from django.db.models import Sum, Count, OuterRef, Subquery
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..serializers import OfficeAnalyticsListSerializer
from ..permissions import IsInOffice
from ..models import Service, Requirement, Step, Office
from ..utils import create_office_report, create_total_time

class OfficeAnalyticsView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def get(self, request):
        data = create_office_report(request)
        return Response(data=data, status=status.HTTP_200_OK)
        
class OfficeAnalyticsListView(ListAPIView):
    step_queryset = Step.objects.filter(
        service=OuterRef('pk')
    ).values('service').annotate(
        total_step=Count('id'),
        total_price=Sum('fee'),
        total_time=Sum('processing_time')
    )
    requirement_queryset = Requirement.objects.filter(
        service=OuterRef('pk')
    ).values('service').annotate(
        total_requirement=Count('id')
    )
    queryset = Service.objects.annotate(
        total_requirement=Subquery(requirement_queryset.values(
            'total_requirement'
        )),
        total_step=Subquery(step_queryset.values('total_step')),
        total_price=Subquery(step_queryset.values('total_price')),
        total_time=Subquery(step_queryset.values('total_time'))
    ).values(
        'id', 
        'name', 
        'total_requirement',
        'total_step', 
        'total_price', 
        'total_time' 
    ).order_by('id')

    permission_classes = [IsAuthenticated, IsInOffice]
    serializer_class = OfficeAnalyticsListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        excluded_queryset = self.queryset.filter(
            office_id=self.request.user.office_id
        )
        return excluded_queryset

class CitizensCharterAnalyticsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        step_queryset = Step.objects.filter(
            service__office=OuterRef('pk')
        ).values('service__office').annotate(
            total_step=Count('id'),
            total_price=Sum('fee'),
            total_time=Sum('processing_time')
        )
        requirement_queryset = Requirement.objects.filter(
            service__office=OuterRef('pk')
        ).values('service__office').annotate(
            total_requirement=Count('id')
        )

        queryset = Office.objects.annotate(
            total_service=Count('services', distinct=True),
            total_requirement=Subquery(
                requirement_queryset.values('total_requirement')
            ),
            total_step=Subquery(step_queryset.values('total_step')),
            total_price=Subquery(step_queryset.values('total_price')),
            total_time=Subquery(step_queryset.values('total_time'))
        ).values()

        for office in queryset:
            office['total_time'] = create_total_time(office['total_time'])

        return Response(data=queryset, status=status.HTTP_200_OK)