from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('scenario-analysis/', views.scenario_analysis, name='scenario_analysis'),
    path('best-practices/', views.best_practices, name='best_practices'),
    path('contact/', views.contact, name='contact'),
    path('vacant-buildings/', views.vacant_buildings, name='vacant_buildings'),
    path('express-interest/<int:building_id>/', views.express_interest, name='express_interest'),
]
