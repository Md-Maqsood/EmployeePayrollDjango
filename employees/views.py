from django.shortcuts import render
from .models import Employee
# Create your views here.
def employeesList(request):
    employees=Employee.objects.all()
    return render(request,'Employees_List.html',{'employees':employees})