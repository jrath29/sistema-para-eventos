from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.
class ClientListView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class EventListView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EnrollmentListView(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        """
        Opcionalmente restringe o queryset retornado,
        filtrando por 'client_id' se fornecido na URL.
        """
        queryset = Enrollment.objects.all()
        client_id = self.request.query_params.get('client_id', None)
        if client_id is not None:
            queryset = queryset.filter(client__id=client_id)
        return queryset