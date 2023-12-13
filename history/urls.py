from django.urls import path
from . import views

app_name = 'history'

urlpatterns = [
    path('/histories/prompts', views.PromptPostView.as_view(), name="prompt_create"),
    path('histories/prompts/<int:prompt_id>', views.PromptDeleteView.as_view(), name="prompt_delete")
]