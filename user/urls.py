from django.urls import path
from user.views import SignUpView, LoginView, LogoutView, TestView

app_name = 'user'

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('test/', TestView.as_view(), name='test')
]