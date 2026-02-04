from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import OfficeView, UserView, MyTokenObtainPairView

urlpatterns = [
    path('token', MyTokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh_token'),
    path('office/create', OfficeView.as_view(), name='create_office'),
    path('office/delete/<int:pk>', OfficeView.as_view(), name='delete_office'),
    path('office/update/<int:pk>', OfficeView.as_view(), name='update_office'),
    path('user/create', UserView.as_view(), name='create_user'),
    path('user/delete/<int:pk>', UserView.as_view(), name='delete_user'),
    path('user/update/<int:pk>', UserView.as_view(), name='update_user'),
]