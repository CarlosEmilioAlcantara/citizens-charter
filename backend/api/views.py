from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Office, User
from .serializers import OfficeSerializer, ServiceSerializer, UserSerializer, MyTokenObtainPairSerializer

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class OfficeView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        # if not self.request.user.is_superuser:
        #     raise PermissionError('Superadmin only.')

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
            raise PermissionError('Superadmin only.')
        office = get_object_or_404(Office, pk=pk)
        office.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        if not self.request.user.is_superuser:
            raise PermissionError('Superadmin only.')

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
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        # if not self.request.user.is_superuser:
        #     raise PermissionError('Superadmin only.')

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
            raise PermissionError('Superadmin only.')
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        if not self.request.user.is_superuser:
            raise PermissionError('Superadmin only.')

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

class ServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = get_object_or_404(User, pk=self.request.user.id)
        office = get_object_or_404(Office, pk=user.office_id)

        if user.office_id != self.request.user.office_id:
            raise PermissionError('You are not from this Office.')

        serializer = ServiceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(office=office)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request):
        user = get_object_or_404(User, pk=self.request.user.id)

        if user.office_id != self.request.user.office_id:
            raise PermissionError('You are not from this Office.')

        office = get_object_or_404(Office, pk=user.office_id)

        serializer = ServiceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(office=office)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)