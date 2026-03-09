from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..models import (
    Office,
    StepPosition,
    User,
    Position,
    Service,
    Requirement,
    Step,
)
from ..admin import (
    OfficeResource,
    StepPositionResource, 
    UserResource,
    PositionResource,
    ServiceResource,
    RequirementResource,
    StepResource,
)
from ..permissions import IsSuperuser
from ..mixins import ExportCsvMixin

class ExportOfficeCsvView(ExportCsvMixin, APIView):
    model = 'office'
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Office.objects.all()

    def get_resource(self):
        return OfficeResource()
    
class ExportUserCsvView(ExportCsvMixin, APIView):
    model = 'user'
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return User.objects.all()

    def get_resource(self):
        return UserResource()

class ExportPositionCsvView(ExportCsvMixin, APIView):
    model = 'position'
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Position.objects.all()

    def get_resource(self):
        return PositionResource()

class ExportServiceCsvView(ExportCsvMixin, APIView):
    model = 'service'
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Service.objects.all()

    def get_resource(self):
        return ServiceResource()

class ExportRequirementCsvView(ExportCsvMixin, APIView):
    model = 'requirement'
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Requirement.objects.all()

    def get_resource(self):
        return RequirementResource()

class ExportStepCsvView(ExportCsvMixin, APIView):
    model = 'step'
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return Step.objects.all()

    def get_resource(self):
        return StepResource()

class ExportStepPositionCsvView(ExportCsvMixin, APIView):
    model = 'step_position'
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return StepPosition.objects.all()

    def get_resource(self):
        return StepPositionResource()