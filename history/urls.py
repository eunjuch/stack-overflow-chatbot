from django.urls import path
from history.views import HistoryView, HistoryDeleteGetView

app_name = 'history'

urlpatterns = [
    path('histories/', HistoryView.as_view(), name='History'),
    path('histories/<int:history_id>', HistoryDeleteGetView.as_view(), name='History_delete_get')
]