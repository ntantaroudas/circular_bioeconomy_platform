from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('scenarios-analysis', views.scenarios_analysis, name='scenarios-analysis'),
    path('best-practices/', views.best_practices, name='best_practices'),
    path('faq/', views.faq, name='faq'),
]
