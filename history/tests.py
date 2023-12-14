from django.test import TestCase
from history.models import History, Prompt

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
