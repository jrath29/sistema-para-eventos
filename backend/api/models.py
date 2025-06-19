from django.db import models

# Create your models here.

class Client(models.Model):
    name = models.CharField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField()
    date = models.DateTimeField()
    address = models.CharField()

    def __str__(self):
        return self.name

class Enrollment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    class Meta:
        # Esta linha garante que a combinação de client e event seja única no banco de dados
        unique_together = ('client', 'event')
        verbose_name = "Inscrição"
        verbose_name_plural = "Inscrições"

    def __str__(self):
        return f"{self.client.name} - {self.event.name}"
