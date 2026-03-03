from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views.token_views import MyTokenObtainPairView
from .views.office_views import (
    OfficeView,
    DeleteOfficeView,
    UpdateOfficeView,
    OfficeListView,
)
from .views.user_views import (
    UserView, 
    DeleteUserView, 
    # UpdateUserView, 
    UserListView,
)
from .views.position_views import (
    PositionView, 
    DeletePositionView, 
    UpdatePositionView, 
    PositionListView,
)
from .views.service_views import (
    ServiceView, 
    DeleteServiceView, 
    ServiceListView,
)
from .views.requirement_views import (
    CreateRequirementView,
    DeleteRequirementView, 
    RequirementView, 
    RequirementListView,
)
from .views.step_views import CreateStepView, StepView, StepListView
from .views.analytics_views import (
    OfficeAnalyticsView, 
    OfficeAnalyticsListView,
    CitizensCharterAnalyticsView,
)

urlpatterns = [
    path('token', MyTokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh_token'),
    path('office/create', OfficeView.as_view(), name='create_office'),
    path('office/<int:pk>', OfficeView.as_view(), name='update_delete_office'),
    path('office/delete', DeleteOfficeView.as_view(), name='delete_office'),
    path('office/update', UpdateOfficeView.as_view(), name='update_office'),
    path('offices', OfficeListView.as_view(), name='fetch_offices'),
    path('user/create', UserView.as_view(), name='create_user'),
    path('user/<int:pk>', UserView.as_view(), name='update_delete_user'),
    path('user/delete', DeleteUserView.as_view(), name='delete_user'),
    # path('user/update', UpdateUserView.as_view(), name='update_user'),
    path('users', UserListView.as_view(), name='fetch_users'),
    path('position/create', PositionView.as_view(), name='create_position'),
    path(
        'position/<int:pk>',
        PositionView.as_view(),
        name='update_delete_position'
    ),
    path(
        'position/update', 
        UpdatePositionView.as_view(), 
        name='update_position'
    ),
    path('positions', PositionListView.as_view(), name='fetch_positions'),
    path('service/create', ServiceView.as_view(), name='create_service'),
    path(
        'service/<int:pk>',
        ServiceView.as_view(),
        name='update_delete_service'
    ),
    path('service/delete', DeleteServiceView.as_view(), name='delete_service'),
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
        'requirement/delete', 
        DeleteRequirementView.as_view(),
        name='delete_requirement'
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
    path('service/<int:pk>/steps', StepListView.as_view(), name='fetch_steps'),
    path(
        'office-analytics', 
        OfficeAnalyticsView.as_view(), 
        name='analysis_office'
    ),
    path(
        'office-analytics-list', 
        OfficeAnalyticsListView.as_view(), 
        name='fetch_analysis_office'
    ),
    path(
        'citizens-charter-analytics', 
        CitizensCharterAnalyticsView.as_view(), 
        name='analysis_citizens_charter'
    ),
]