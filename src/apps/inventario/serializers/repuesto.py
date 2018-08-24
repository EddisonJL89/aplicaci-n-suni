from rest_framework import serializers
from django.urls import reverse_lazy
from apps.inventario import models as inv_m


class RepuestoInventarioSerializer(serializers.ModelSerializer):
    """ Serializer para la :class:`Repuesto`
    """
    No = serializers.StringRelatedField(source='__str__')
    tipo = serializers.StringRelatedField(source='tipo.__str__')

    class Meta:
        model = inv_m.Repuesto
        fields = '__all__'
