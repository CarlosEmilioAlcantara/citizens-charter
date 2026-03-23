from django.db import models
from django.db.models import UniqueConstraint
from multiselectfield import MultiSelectField
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def _create_user(self, name, password, office, **extra_fields):
        user = self.model(name=name, office=office, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, name, password, office, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, password, office, **extra_fields)

    def create_staff(self, name, password, office, **extra_fields):
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
        validators=[RegexValidator(
            regex=r'^\S{8,}$',
            message='Password should be atleast 8 characters with no spaces.'
        )]
    )

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'name'

    objects = UserManager()

    office = models.ForeignKey(
        Office,
        on_delete=models.CASCADE,
        related_name='users'
    )

    def __str__(self):
        return self.name

class Position(models.Model):
    name = models.CharField(max_length=180)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    office = models.ForeignKey(
        Office,
        on_delete=models.CASCADE,
        related_name='positions'
    )

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['name', 'office'], 
                name='unique_name_per_office'
            )
        ]

    def __str__(self):
        return self.name

class Service(models.Model):
    number = models.DecimalField(max_digits=9, decimal_places=1)
    name = models.CharField(max_length=180)
    description = models.CharField(max_length=255) 

    TRANSACTION_CHOICES = (
        ('simple', 'Simple'),
        ('complicated', 'Komplikado'),
        ('technical', 'Lubhang Teknikal'),
    )
    transaction = models.CharField(
        max_length=12,
        choices=TRANSACTION_CHOICES
    )

    CLASSIFICATION_CHOICES = (
        ('g2b', 'G2B - Government to Business'),
        ('g2c', 'G2C - Government to Client'),
        ('g2e', 'G2E - Government to Employee'),
        ('g2g', 'G2G - Government to Government'),
    )
    classification_types = MultiSelectField(
        max_length=32, 
        choices=CLASSIFICATION_CHOICES, 
        max_choices=4
    )

    availers = models.CharField(max_length=180)
    is_subservice = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    office = models.ForeignKey(
        Office,
        on_delete=models.CASCADE,
        related_name='services'
    )

    def __str__(self):
        return self.name

class Requirement(models.Model):
    name = models.CharField(max_length=180)
    where_to_secure = models.CharField(max_length=180)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='requirements'
    )

    def __str__(self):
        return self.name

class Step(models.Model):
    name = models.CharField(max_length=180, blank=True, null=True)
    action = models.CharField(max_length=180)
    fee = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    legal_basis = models.CharField(max_length=180, default="None")
    processing_time = models.BigIntegerField()

    is_subaction = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='steps'
    )

    position = models.ManyToManyField(
        Position,
        through='StepPosition',
    )

    def __str__(self):
        return self.name

class StepPosition(models.Model):
    step = models.ForeignKey(
        Step,
        on_delete=models.CASCADE,
        related_name='step_positions'
    )
    position = models.ForeignKey(
        Position,
        on_delete=models.CASCADE,
        related_name='step_positions'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.step} - {self.position}"