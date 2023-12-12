from django.db import models
from django.utils import timezone


# Create your models here.

class Users(models.Model):
    uid = models.CharField(max_length=15, null=False)
    name = models.CharField(max_length=15, null=False)
    password = models.CharField(max_length=15, null=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.uid
