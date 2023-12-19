import json

from django.test import TestCase, Client
from rest_framework.test import force_authenticate, APIClient
from django.shortcuts import get_object_or_404
from .models import CustomUser

# Create your tests here.
client = APIClient()
user = CustomUser.objects.create_user(user_id='ehdwlsdlwkd22', name='조동진', password='password123')
client.force_authenticate(user=user)

# 회원가입 테스트
class SignupTest(TestCase):
    # 회원가입 성공
    def test_signup_success(self):
        data = {
            'user_id': 'ehdwlsdlwkd222',
            'name': '조동진',
            'is_active': True,
            'password': 'password123'
        }

        response = client.post('/user/signup/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'is_success': True,
            'result': {
                'user_id': 'ehdwlsdlwkd222',
                'name': '조동진'
            }
        })

    # 회원가입 실패
    def test_signup_failed(self):
        data = {
            'user_id': 'ehdwlsdlwkd222',
            'name': '조동진',
            'is_active': True,
            'password': 'password123'
        }

        response = client.post('/user/signup/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'is_success': True,
            'result': {
                'user_id': 'ehdwlsdlwkd222',
                'name': '조동진'
            }
        })

        response = client.post('/user/signup/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {
            'is_success': False,
            'message': {
                'user_id': ['custom user의 user id은/는 이미 존재합니다.']
            }
        })

#
class CheckUserIdTest(TestCase):
    def test_check_user_id_success(self):
        data = {
            'user_id': 'ehdwlsdlwkd',
            'name': '조동진',
            'is_active': True,
            'password': 'password123'
        }

        response = client.post('/user/signup/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)

        data = {
            'user_id': 'ehdwlsdlwkd123'
        }

        response = client.post('/user/check-user-id/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'is_success': True,
            'result': {
                'is_duplicate': False
            }
        })
    def test_check_user_id_failed(self):
        data = {
            'user_id': 'ehdwlsdlwkd',
            'name': '조동진',
            'is_active': True,
            'password': 'password123'
        }

        response = client.post('/user/signup/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)

        data = {
            'user_id': 'ehdwlsdlwkd'
        }

        response = client.post('/user/check-user-id/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'is_success': True,
            'result': {
                'is_duplicate': True
            }
        })


class LoginTest(TestCase):
    def test_login_success(self):
        data = {
            'user_id': 'ehdwlsdlwkd222',
            'name': '조동진',
            'is_active': True,
            'password': 'password123'
        }

        response = client.post('/user/signup/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)

        data = {
            'user_id': 'ehdwlsdlwkd222',
            'password': 'password123'
        }

        response = client.post('/user/login/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)

    def test_login_failed(self):
        data = {
            'user_id': 'ehdwlsdlwkd',
            'password': 'password123'
        }

        response = client.post('/user/login/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 400)

class LogoutTest(TestCase):
    def test_logout_success(self):
        data = {
            'user_id': 'ehdwlsdlwkd222',
            'name': '조동진',
            'is_active': True,
            'password': 'password123'
        }

        response = client.post('/user/signup/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)

        data = {
            'user_id': 'ehdwlsdlwkd222',
            'password': 'password123'
        }

        response = client.post('/user/login/', json.dumps(data), content_type='application/json')

        # response에서 refresh_token 파싱
        refresh = response.json()['result']['tokens']['refresh']

        # Authorization 설정
        data = {
            'refresh': refresh
        }
        response = client.post('/user/logout/', json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 205)

#test