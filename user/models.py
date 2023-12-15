from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, user_id, name, password=None):
        if not user_id:
            raise ValueError('Users must have a unique identifier')
        user = self.model(user_id=user_id, name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, name, password):
        user = self.create_user(user_id=user_id, name=name, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    user_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.user_id
