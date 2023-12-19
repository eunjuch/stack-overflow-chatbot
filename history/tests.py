<<<<<<< HEAD
# import mock
# import json
# from django.utils import timezone
# from django.core.files import File
# from django.shortcuts import get_object_or_404
# from django.test import TestCase, Client
# from history.models import History, Prompt
# from user.models import CustomUser
# from rest_framework.test import APIClient

# client = APIClient()
# user = CustomUser.objects.create_user(user_id='ehdwlsdlwkd22', name='조동진', password='password123')
# client.force_authenticate(user=user)
=======
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
>>>>>>> 8eafa002f2d549257be6190b8c1d811b42c6de9b

# class HistoryViewTest(TestCase):
#     def test_history_view_post(self):
#         print()

#     def test_history_view_get(self):
#         history = History.objects.create({
#             "history_id": "1",
#             "user_message": "test",
#             "answer": "test answer"
#         })

#         response = self.client.delete('/history/histories/prompts/1', content_type='application/json')

#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.json(), {
#             'is_success': True,
#             'result': {'message': 'History delete success'}
#         })
        

# class HistoryDeleteGetViewTest(TestCase):
#     def test_history_get(self):
#         print()

#     def test_history_delete(self):
#         print()



# class PromptPostViewTest(TestCase):
#     def test_prompt_post_view_if_file_exists(self):
        
#         file_mock = mock.MagicMock(spec=File, name='FileMock')
#         file_mock.name = 'test1.java'

#         data = {
#             "user_id": "varchar",
#             "title": "varchar",
#             "file": file_mock
#         }

#         response = self.client.post('/history/histories/prompts/', content_type='application/json')

#         self.assertEqual(response.status_code, 200)

#     def test_prompt_post_view_if_file_not_exists(self):
#         data = {
#             "user_id": "varchar",
#             "title": "varchar",
#         }

#         response = self.client.post('/history/histories/prompts/1', json.dumps(data), content_type='application/json')

# class PromptDeleteViewTest(TestCase):

#     def test_prompt_delete_view_if_prompt_exists(self):

#         client.force_authenticate(user=login())

#         prompt = Prompt.objects.create(
#             history_id=1,
#             user_message="user message test",
#             answer="answer test"
#         )

#         response = self.client.delete('/history/histories/prompts/1', content_type='application/json')

#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.json(), {
#             'is_success': True,
#             'result': { 'history_id':1,
#                         'user_message':"user message test",
#                         'answer':"answer test"
#             }
#         })

#     def test_prompt_delete_view_if_prompt_does_not_exists(self):

#         data = {
#             'user_id': 'ejcho',
#             'name': '은주',
#             'is_active': True,
#             'password': '12345678'
#         }

#         response = client.post('/user/signup/', json.dumps(data), content_type='application/json')

#         user = get_object_or_404(CustomUser, pk=1)
#         client.force_authenticate(user=user)

#         prompt = Prompt.objects.create(
#             history_id=1,
#             user_message="user message test",
#             answer="answer test"
#         )

#         response = self.client.delete('/history/histories/prompts/2', content_type='application/json')

#         self.assertEqual(response.status_code, 400)
#         self.assertEqual(response.json(), {
#             'is_success': False,
#             'result': {'message': 'Prompt-answer delete fail..'}
#         })

