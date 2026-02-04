import datetime
from datetime import timezone
from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def _create_user(self, name, password, office, **extra_fields):
        user = self.model(name=name, office=office, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, name, password, office, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, password, office, **extra_fields)

    def create_superuser(self, name, password, office, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, password, office, **extra_fields)

class Office(models.Model):
    name = models.CharField(max_length=180, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class User(AbstractBaseUser):
    name = models.CharField(max_length=180, unique=True)
    password = models.CharField(
        max_length=180, 
        validators=[MinLengthValidator(8)]
    )

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'name'

    objects = UserManager()

    office = models.ForeignKey(
        Office,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

# class Service(models.Model):
#     name = models.CharField(max_length=180)
#     description = models.CharField(max_length=255) 

#     CLASSIFICATION_CHOICES = (
#         ('simple', 'Simple'),
#         ('complicated', 'Komplikado'),
#         ('technical', 'Lubhang Teknikal'),
#     )
#     classification = models.CharField(
#         max_length=32,
#         choices=CLASSIFICATION_CHOICES,
#         default='simple',
#     )

#     TRANSACTION_CHOICES = (
#         ('G2B', 'G2B - Government to Business'),
#         ('G2C', 'G2C - Government to Client'),
#         ('G2E', 'G2E - Government to Employee'),
#         ('G2G', 'G2G - Government to Government'),
#         ('G2B,G2C', 
#             '''
#                G2B - Government to Business, 
#                G2C - Government to Client
#             '''
#         ),
#         ('G2B,G2E', 
#             '''
#                G2B - Government to Business, 
#                G2C - Government to Client
#             '''
#         ),
#         ('G2B,G2G', 
#             '''
#                G2B - Government to Business, 
#                G2C - Government to Client
#             '''
#         ),
#         ('G2C,G2E', 
#             '''
#                 G2C - Government to Client, 
#                 G2E - Government to Employee
#             '''
#         ),
#         ('G2C,G2E,G2G', 
#             '''
#                 G2C - Government to Client, 
#                 G2E - Government to Employee,
#                 G2G - Government to Government
#             '''
#         )
#         ('G2E,G2G', 
#             '''
#                 G2C - Government to Client, 
#                 G2E - Government to Employee,
#                 G2G - Government to Government
#             '''
#         )
#     )
#     transaction_types = models.CharField(max_length=180)

#     availers = models.CharField(max_length=180)
#     is_subservice = models.BooleanField(default=False)