import json

from django.test import TestCase, Client
from rest_framework.test import force_authenticate, APIClient
from django.shortcuts import get_object_or_404
from user.models import CustomUser
from history.models import History, Prompt

client = APIClient()
user = CustomUser.objects.create_user(user_id='ehdwlsdlwkd22', name='조동진', password='password123')
client.force_authenticate(user=user)

class HistoryTest(TestCase):
    def test_history_post_whitout_file(self):
        data = {
            'user_id': 'ehdwlsdlwkd22',
            'title': 'test'
        }

        response = client.post('/history/histories/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)


# Create your tests here.
class PromptTest(TestCase):
    def PromptPost(self):
        # Given
        username = 'testuser'
        password = 'testpassword'

        # When
        url = ''
        response = self.client.post(url, {'username': username, 'password': password})

        # Then
        self.assertEqual(response.status_code, 200)
        self.assertTrue(Prompt.objects.filter(username=username).exists())
