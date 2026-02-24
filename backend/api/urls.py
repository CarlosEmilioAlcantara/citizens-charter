from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CreateRequirementView,
    CreateStepView,
    OfficeView,
    PositionView,
    RequirementView, 
    ServiceView,
    UserView, 
    MyTokenObtainPairView
)

urlpatterns = [
    path('token', MyTokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh_token'),
    path('office/create', OfficeView.as_view(), name='create_office'),
    path('office/<int:pk>', OfficeView.as_view(), name='update_delete_office'),
    path('user/create', UserView.as_view(), name='create_user'),
    path('user/<int:pk>', UserView.as_view(), name='update_delete_user'),
    path('position/create', PositionView.as_view(), name='create_position'),
    path(
        'position/<int:pk>',
        PositionView.as_view(),
        name='update_delete_position'
    ),
    path('service/create', ServiceView.as_view(), name='create_service'),
    path(
        'service/<int:pk>',
        ServiceView.as_view(),
        name='update_delete_service'
    ),
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
        'service/<int:pk>/create-step', 
        CreateStepView.as_view(),
        name='create_step'
    ),
]