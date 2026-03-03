from django.shortcuts import get_object_or_404
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import User
from ..serializers import UserSerializer
from ..permissions import IsSuperuser

class UserView(APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def post(self, request):
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
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
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
    
class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated, IsSuperuser]

    def post(self, request):
        if any('pk' not in item for item in request.data):
            return Response(
                data='Every item must include a pk.',
                status=status.HTTP_400_BAD_REQUEST
            )

        pks = [item['pk'] for item in request.data]
        users = User.objects.filter(pk__in=pks)
        existing = list(users.values_list('pk', flat=True))
        missing = set(pks) - set(existing)

        if missing:
            return Response(
                data=f"Values {missing} sent are missing.",
                status=status.HTTP_400_BAD_REQUEST
            )

        to_delete = User.objects.filter(pk__in=existing)
        to_delete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

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