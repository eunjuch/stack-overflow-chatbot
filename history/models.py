from django.db import models


class History(models.Model):
    user_id = models.CharField(max_length=15)
    title = models.CharField(max_length=100)
    file = models.FileField(null=True, blank=True)
    is_file_exist = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Prompt(models.Model):
    history_id = models.IntegerField()
    user_message = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
