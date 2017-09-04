from datetime import datetime
from rest_framework import serializers
from apps.main.serializers import DynamicFieldsModelSerializer

from apps.kalite.models import Punteo, Evaluacion, Visita, Grado, EjerciciosGrado


class PunteoSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    multiplicador = serializers.IntegerField(read_only=True)

    class Meta:
        model = Punteo
        fields = '__all__'
        read_only_fields = ('id', 'evaluacion', 'indicador', 'multiplicador')


class EvaluacionSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    promedio = serializers.FloatField(read_only=True)

    class Meta:
        model = Evaluacion
        fields = '__all__'
        read_only_fields = ('id', 'visita', 'rubrica')


class VisitaSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    promedio = serializers.FloatField(read_only=True)

    class Meta:
        model = Visita
        fields = '__all__'
        read_only_fields = ('id', 'escuela')


class VisitaCalendarSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    url = serializers.URLField(source='get_absolute_url')
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()
    title = serializers.CharField(source='escuela')
    tip_title = serializers.SerializerMethodField()
    tip_text = serializers.SerializerMethodField()
    color = serializers.CharField(source='capacitador.perfil.color')

    class Meta:
        model = Visita
        fields = ('id', 'start', 'end', 'url', 'title', 'tip_title', 'tip_text', 'color')

    def get_start(self, object):
        return datetime.combine(object.fecha, object.hora_inicio)

    def get_end(self, object):
        return datetime.combine(object.fecha, object.hora_fin)

    def get_tip_title(self, object):
        return 'Visita {} - {}'.format(object.numero, object.capacitador.get_full_name())

    def get_tip_text(self, object):
        return str(object.escuela.municipio)


class EjerciciosGradoSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    url = serializers.CharField(source='get_api_url', read_only=True)
    grado_url = serializers.CharField(source='grado.get_api_url', read_only=True)

    class Meta:
        model = EjerciciosGrado
        fields = '__all__'


class GradoSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    url = serializers.CharField(source='get_api_url', read_only=True)
    ejercicios = EjerciciosGradoSerializer(many=True, read_only=True)
    alcanzados = serializers.IntegerField(read_only=True)
    nivelar = serializers.IntegerField(read_only=True)
    total_estudiantes = serializers.IntegerField(read_only=True)
    total_ejercicios = serializers.IntegerField(read_only=True)
    promedio_ejercicios = serializers.FloatField(read_only=True)
    promedio_alcanzados = serializers.FloatField(read_only=True)

    class Meta:
        model = Grado
        fields = '__all__'
