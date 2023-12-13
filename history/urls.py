from django.urls import path
from history.views import HistoryView

app_name = 'history'

urlpatterns = [
    path('histories/', HistoryView.as_view(), name='History'),
]