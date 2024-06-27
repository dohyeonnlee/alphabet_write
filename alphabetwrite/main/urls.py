from django.urls import path
from . import views


urlpatterns = [
    # 인트로 화면
    path('', views.intro_page, name='intro_page'),
    path('menu/', views.menu_page, name='menu_page'),
    path('connection/', views.connection_page, name='connection_page'),
    path('outro/', views.outro_page, name='outro_page'),
]