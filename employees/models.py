from django.db import models

class Department(models.Model):
    department_name=models.CharField(max_length=100)

    def __str__(self):
        return self.department_name

class Employee(models.Model):
    name=models.CharField(max_length=50)
    profile_pic=models.CharField(max_length=200)
    gender=models.CharField(max_length=6)
    departments=models.ManyToManyField(Department)
    salary=models.PositiveIntegerField()
    start_date=models.DateField()
    note=models.TextField()

    class Meta:
        ordering=['name']

    def __str__(self):
        return self.name