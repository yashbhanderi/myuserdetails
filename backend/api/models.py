from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(
        max_length=50, blank=False, null=False, unique=True)
    email = models.EmailField(
        ('email address'), blank=False, null=False, unique=True)
    phone_no = models.BigIntegerField(blank=False, null=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'phone_no']

    def __str__(self):
        return self.username