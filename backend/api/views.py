from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Office, Position, Requirement, Service, Step, User
from .serializers import (
    OfficeSerializer,
    PositionSerializer,
    RequirementSerializer, 
    ServiceSerializer,
    StepSerializer, 
    UserSerializer, 
    MyTokenObtainPairSerializer
)

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class OfficeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')

        serializer = OfficeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def delete(self, request, pk):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')
        office = get_object_or_404(Office, pk=pk)
        office.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')

        office = get_object_or_404(Office, pk=pk)
        serializer = OfficeSerializer(office, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        if not self.request.user.is_superuser:
            raise PermissionDenied('Superadmin only.')

        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class PositionView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = PositionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        position = get_object_or_404(Position, pk=pk)
        position.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        position = get_object_or_404(Position, pk=pk)
        serializer = PositionSerializer(position, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class ServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        office = get_object_or_404(Office, pk=self.request.user.office_id)
        serializer = ServiceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(office=office)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        service = get_object_or_404(Service, pk=pk)

        if service.office_id != self.request.user.office_id:
            raise PermissionDenied('You are not part of this Office.')
        
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        service = get_object_or_404(Service, pk=pk)

        if service.office_id != self.request.user.office_id:
            raise PermissionDenied('You are not part of this Office.')

        serializer = ServiceSerializer(service, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateRequirementView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        service = get_object_or_404(Service, pk=pk)

        if self.request.user.office_id != service.office_id:
            raise PermissionDenied('You are not part of this Office.')

        serializer = RequirementSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(service=service)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class RequirementView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        requirement = get_object_or_404(Requirement, pk=pk)
        
        if self.request.user.office_id != requirement.service.office_id:
            raise PermissionDenied('You are not part of this Office.')

        requirement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        requirement = get_object_or_404(Requirement, pk=pk)

        if self.request.user.office_id != requirement.service.office_id:
            raise PermissionDenied('You are not part of this Office.')

        serializer = RequirementSerializer(requirement, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateStepView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        service = get_object_or_404(Service, pk=pk)

        if self.request.user.office_id != service.office_id:
            raise PermissionDenied('You are not part of this Office.')

        serializer = StepSerializer(data=request.data)
        
        if serializer.is_valid():
            step = serializer.save(service=service)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            StepSerializer(step).data, 
            status=status.HTTP_200_OK
        )

class StepView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        step = get_object_or_404(Step, pk=pk)
        
        if self.request.user.office_id != step.service.office_id:
            raise PermissionDenied('You are not part of this Office.')

        step.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        step = get_object_or_404(Step, pk=pk)

        if self.request.user.office_id != step.service.office_id:
            raise PermissionDenied('You are not part of this Office.')

        serializer = RequirementSerializer(step, data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)