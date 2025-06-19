from rest_framework import serializers
from .models import *

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    event = EventSerializer(read_only=True)
    
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), source='client', write_only=True
    )
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True
    )

    class Meta:
        model = Enrollment
        fields = ['id', 'client', 'event', 'client_id', 'event_id']
        # Opcional: Adicione esta restrição no Meta para garantir unicidade no nível do banco de dados
        # unique_together = (('client', 'event'),) 

    def validate(self, data):
        # Os campos 'client' e 'event' já foram populados pelo PrimaryKeyRelatedField
        # devido ao 'source' antes do método validate ser chamado.
        client = data.get('client')
        event = data.get('event')

        # Verifica se já existe uma inscrição para este cliente e evento
        # Excluímos a instância atual da verificação em caso de atualização (PUT/PATCH)
        # Embora para inscrições, uma atualização de client/event pode não fazer sentido.
        # Mas é uma boa prática.
        if self.instance: # Se estiver atualizando uma instância existente
            if Enrollment.objects.filter(client=client, event=event).exclude(pk=self.instance.pk).exists():
                raise serializers.ValidationError("Este cliente já está inscrito neste evento.")
        else: # Se for uma nova criação
            if Enrollment.objects.filter(client=client, event=event).exists():
                raise serializers.ValidationError("Este cliente já está inscrito neste evento.")
        
        return data
