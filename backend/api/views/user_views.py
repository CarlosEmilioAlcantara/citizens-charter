from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from ..models import User
from ..serializers import UserSerializer

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

class UserListView(ListAPIView):
    queryset = User.objects.all().order_by('id')
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        if self.queryset.user.is_superuser:
            return self.queryset
        else:
            raise PermissionDenied('Superadmin only.')
