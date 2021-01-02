from django.urls import path
from .views import employeesList, addEmployee, editEmployee, removeEmployee

urlpatterns=[
    path('',employeesList),
    path('add/',addEmployee),
    path('edit/<int:pk>/',editEmployee),
    path('delete/<int:pk>/',removeEmployee),
]