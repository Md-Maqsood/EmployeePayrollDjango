from django.urls import path
from .views import employeesList, addEmployee

urlpatterns=[
    path('',employeesList),
    path('add/',addEmployee),
]