from django.urls import path
from history.views import HistoryView, HistoryDeleteGetView, PromptPostView, PromptDeleteView

app_name = 'history'

urlpatterns = [
    path('histories/', HistoryView.as_view(), name='History'),
    path('histories/<int:history_id>', HistoryDeleteGetView.as_view(), name='History_delete_get'),
    path('histories/prompts/', PromptPostView.as_view(), name="prompt_create"),
    path('histories/prompts/<int:prompt_id>', PromptDeleteView.as_view(), name="prompt_delete")
]
