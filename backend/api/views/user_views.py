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
        data = request.data.get('users')
        users = User.objects.filter(pk__in=data)
        existing_users = list(users.values_list('pk', flat=True))
        missing = set(data) - set(existing_users)

        if missing:
            return Response(
                data=f"Values {missing} sent are missing.",
                status=status.HTTP_400_BAD_REQUEST
            )

        to_delete = User.objects.filter(pk__in=existing_users)
        to_delete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

# class UpdateUserView(APIView):
#     permission_classes = [IsAuthenticated, IsSuperuser]

#     # TODO; Fix mass update
#     def post(self, request):
#         data = request.data.get('users')
#         user_pks = list(map(lambda dict: dict['pk'], data))
#         users = User.objects.filter(pk__in=user_pks)
#         existing_users = list(users.values_list('pk', flat=True))
#         missing = set(user_pks) - set(existing_users)

#         if missing:
#             return Response(
#                 data=f"Values {missing} sent are missing.",
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         list_users = list(users)
#         updates = list(data)

#         for i in range(0, len(user_pks)):
#             if user_pks[i] == list_users[i].pk:
#                 list_users[i].name = updates[i].get('name')
#                 list_users[i].password = updates[i].get('')

#         Office.objects.bulk_update(list_offices, ['name'], batch_size=10)

#         return Response(status=status.HTTP_200_OK)

class UserListView(ListAPIView):
    queryset = User.objects.all().order_by('id')
    permission_classes = [IsAuthenticated, IsSuperuser]
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset