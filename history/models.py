from django.db import models

class History(models.Model):
    id = models.IntegerField(primary_key = True)
    users_id = models.IntegerField()
    title = models.CharField(max_length = 100)
    file_name = models.CharField(max_length = 100)
    is_file_exist = models.BooleanField(default = False)
    created_at = models.DateTimeField(auto_now_add = True)


class Prompt(models.Model):
    id = models.IntegerField(primary_key = True)
    history_id = models.IntegerField()
    user_message = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)

