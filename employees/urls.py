from django.urls import path
from .views import employeesList

urlpatterns=[
    path('',employeesList),
]