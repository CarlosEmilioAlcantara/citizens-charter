from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import User
from ..serializers import UserSerializer
from ..permissions import IsSuperuser
from ..mixins import BulkDeleteMixin
from ..utils.view_utils import audit_save, audit_delete

class UserView(APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        audit_delete(user, request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        audit_save(serializer, request)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DeleteUserView(BulkDeleteMixin, APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def get_queryset(self):
        return User.objects.all()

# class UpdateUserView(APIView):
#     permission_classes = [IsAuthenticated, IsSuperuser]

#     def post(self, request):
#         pks = [item['pk'] for item in request.data]
#         queryset = list(User.objects.filter(pk__in=pks))
#         serializer = UserBulkUpdateSerializer(
#             queryset,
#             data=request.data,
#             many=True,
#         )
        
#         if serializer.is_valid():
#             serializer.save()
#         else:
#             return Response(
#                 serializer.errors,
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         return Response(serializer.data, status=status.HTTP_200_OK)

class UserListView(ListAPIView):
    queryset = User.objects.all().order_by('id')
    permission_classes = [IsAuthenticated, IsSuperuser]
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset