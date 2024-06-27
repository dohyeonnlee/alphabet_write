from django.urls import path
from . import views


urlpatterns = [
    # 따라쓰기
    path('uppera/', views.main_A_page, name='main_A_page'),
    path('lowera/', views.main_a_page, name='main_a_page'),
    path('upperb/', views.main_B_page, name='main_B_page'),
    path('lowerb/', views.main_b_page, name='main_b_page'),

    # 직접쓰기
    path('upper-a/', views.upperA, name='A'),
    path('lower-a/', views.lowera, name='a'),
    path('upper-b/', views.upperB, name='B'),
    path('lower-b/', views.lowerb, name='b'),

]