from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views.token_views import MyTokenObtainPairView
from .views.office_views import OfficeView, OfficeListView
from .views.user_views import UserView, UserListView
from .views.position_views import PositionView, PositionListView
from .views.service_views import ServiceView, ServiceListView
from .views.requirement_views import (
    CreateRequirementView, 
    RequirementView, 
    RequirementListView,
)
from .views.step_views import CreateStepView, StepView, StepListView

urlpatterns = [
    path('token', MyTokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh_token'),
    path('office/create', OfficeView.as_view(), name='create_office'),
    path('office/<int:pk>', OfficeView.as_view(), name='update_delete_office'),
    path('offices', OfficeListView.as_view(), name='fetch_offices'),
    path('user/create', UserView.as_view(), name='create_user'),
    path('user/<int:pk>', UserView.as_view(), name='update_delete_user'),
    path('users', UserListView.as_view(), name='fetch_users'),
    path('position/create', PositionView.as_view(), name='create_position'),
    path(
        'position/<int:pk>',
        PositionView.as_view(),
        name='update_delete_position'
    ),
    path('positions', PositionListView.as_view(), name='fetch_positions'),
    path('service/create', ServiceView.as_view(), name='create_service'),
    path(
        'service/<int:pk>',
        ServiceView.as_view(),
        name='update_delete_service'
    ),
    path('services', ServiceListView.as_view(), name='fetch_services'),
    path(
        'service/<int:pk>/create-requirement', 
        CreateRequirementView.as_view(),
        name='create_requirement'
    ),
    path(
        'requirement/<int:pk>', 
        RequirementView.as_view(),
        name='update_delete_requirement'
    ),
    path(
        'service/<int:pk>/requirements',
        RequirementListView.as_view(),
        name='fetch_services'
    ),
    path(
        'service/<int:pk>/create-step', 
        CreateStepView.as_view(),
        name='create_step'
    ),
    path('step/<int:pk>', StepView.as_view(), name='update_delete_step'),
    path('service/<int:pk>/steps', StepListView.as_view(), name='fetch_steps')
]