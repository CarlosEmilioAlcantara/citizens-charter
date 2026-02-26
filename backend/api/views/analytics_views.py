from django.db.models import Sum, Count
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..serializers import OfficeAnalyticsListSerializer
from ..permissions import IsInOffice
from ..models import Service, Requirement, Step

class OfficeAnalyticsView(APIView):
    permission_classes = [IsAuthenticated, IsInOffice]

    def get(self, request):
        total_service = Service.objects.filter(
            office_id=request.user.office_id
        ).count()
        total_requirement = Requirement.objects.filter(
            service__office_id=request.user.office_id
        ).count()
        total_step = Step.objects.filter(
            service__office_id=request.user.office_id
        ).count()
        total_action = Step.objects.filter(
            service__office_id=request.user.office_id
        ).values('action').count()
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
            'total_action': total_action,
            'total_price': total_price,
            'total_time': total_time,
        }

        return Response(data=data, status=status.HTTP_200_OK)
        
class OfficeAnalyticsListView(ListAPIView):
    queryset = Service.objects.prefetch_related(
        'requirements',
        'steps'
    ).annotate(
        requirement_count=Count('requirements'),
        step_count=Count('steps'),
        total_price=Sum('steps__fee'),
        total_time=Sum('steps__processing_time')
    ).values(
        'id', 
        'name', 
        'requirement_count', 
        'step_count', 
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