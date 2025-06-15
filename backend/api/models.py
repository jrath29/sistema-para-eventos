from django.db import models

# Create your models here.

class Client(models.Model):
    name = models.CharField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)

class Person(models.Model):
    name = models.CharField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)

class (models.Model):
    name = models.CharField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
