from django.urls import path
from . import views

app_name = 'history'

urlpatterns = [
    path('/histories', views.HistoryView.create_history),
    path('/histories', views.HistoryView.get_all_histories)
]