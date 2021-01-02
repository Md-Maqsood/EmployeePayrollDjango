from django.urls import path
from .views import employeesList, addEmployee, editEmployee

urlpatterns=[
    path('',employeesList),
    path('add/',addEmployee),
    path('edit/<int:pk>/',editEmployee),
]