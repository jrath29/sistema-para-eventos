from django.db import models

# Create your models here.

class Client(models.Model):
    name = models.CharField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)

class Event(models.Model):
    name = models.CharField()
    date = models.DateTimeField()
    address = models.CharField()


class Enrollment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
