from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Employee, Department
from datetime import datetime, timedelta

def employeesList(request):
    employees=Employee.objects.all()
    return render(request,'Employees_List.html',{'employees':employees})

def addEmployee(request):
    if request.method=='POST':
        employee=Employee()
        employee.name=request.POST['name']
        employee.gender=request.POST['gender']
        employee.salary=int(request.POST['salary'])
        employee.profile_pic=request.POST['profile_pic']
        employee.note=request.POST['note']
        employee.start_date=datetime.strptime(request.POST['start_date'], '%Y-%m-%d').date()
        employee.save()
        for departmentName in request.POST.getlist('departments'):
            try:
                department=Department.objects.get(department_name=departmentName)
            except Department.DoesNotExist:
                department=Department(department_name=departmentName)
                department.save()
            employee.departments.add(department)
        employee.save()
        return HttpResponseRedirect('/employees/')
    else:
        dateToday=datetime.now()
        dateMonthBefore=dateToday-timedelta(days=30)
        return render(request,'Employee_Form.html',{'minDate':dateMonthBefore.date(),'maxDate':dateToday.date()})

def editEmployee(request,pk):
    employee=Employee.objects.get(id=pk)
    if request.method=='POST':
        employee.name=request.POST['name']
        employee.gender=request.POST['gender']
        employee.salary=int(request.POST['salary'])
        employee.profile_pic=request.POST['profile_pic']
        employee.note=request.POST['note']
        employee.start_date=datetime.strptime(request.POST['start_date'], '%Y-%m-%d').date()
        departmentNames=request.POST.getlist('departments')
        initialDepartments=employee.departments.all()
        for departmentName in departmentNames:
            try:
                department=Department.objects.get(department_name=departmentName)
            except Department.DoesNotExist:
                department=Department(department_name=departmentName)
                department.save()
            employee.departments.add(department)
        for department in initialDepartments:
            if department.department_name not in departmentNames:
                employee.departments.remove(department)
        employee.save()
        return HttpResponseRedirect('/employees/')
    else:
        dateToday=datetime.now()
        dateMonthBefore=dateToday-timedelta(days=30)
        return render(request,'Employee_Form.html',{'minDate':dateMonthBefore.date(),'maxDate':dateToday.date(),'employee':employee})

def removeEmployee(request,pk):
    employee=Employee.objects.get(id=pk)
    employee.delete()
    return HttpResponseRedirect('/employees/')