# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-11-02 15:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('escuela', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cooperante',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='EscuelaCooperante',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activa', models.BooleanField(default=True)),
                ('fecha_activacion', models.DateField(blank=True, default=django.utils.timezone.now, null=True)),
                ('fecha_anulacion', models.DateField(blank=True, null=True)),
                ('cooperante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='escuela_asignada', to='mye.Cooperante')),
                ('escuela', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asignacion_cooperante', to='escuela.Escuela')),
            ],
        ),
        migrations.CreateModel(
            name='EscuelaProyecto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activa', models.BooleanField(default=True)),
                ('fecha_activacion', models.DateField(blank=True, default=django.utils.timezone.now, null=True)),
                ('fecha_anulacion', models.DateField(blank=True, null=True)),
                ('escuela', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asignacion_proyecto', to='escuela.Escuela')),
            ],
        ),
        migrations.CreateModel(
            name='Medio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medio', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Requisito',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Solicitud',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('jornada', models.IntegerField()),
                ('edf', models.BooleanField()),
                ('lab_actual', models.BooleanField()),
                ('alumna', models.IntegerField()),
                ('alumno', models.IntegerField()),
                ('maestra', models.IntegerField()),
                ('maestro', models.IntegerField()),
                ('total_alumno', models.IntegerField(blank=True, null=True)),
                ('total_maestro', models.IntegerField(blank=True, null=True)),
                ('observacion', models.TextField(blank=True, null=True)),
                ('escuela', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='solicitud', to='escuela.Escuela')),
                ('medio', models.ManyToManyField(blank=True, to='mye.Medio')),
                ('requisito', models.ManyToManyField(blank=True, to='mye.Requisito')),
            ],
            options={
                'verbose_name_plural': 'Solicitudes',
                'verbose_name': 'Solicitud',
            },
        ),
        migrations.CreateModel(
            name='SolicitudVersion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('requisito', models.ManyToManyField(to='mye.Requisito')),
            ],
            options={
                'verbose_name_plural': 'Versiones de solicitud',
                'verbose_name': 'Versión de solicitud',
            },
        ),
        migrations.AddField(
            model_name='solicitud',
            name='version',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='solicitud', to='mye.SolicitudVersion'),
        ),
        migrations.AddField(
            model_name='escuelaproyecto',
            name='proyecto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='escuela_asignada', to='mye.Proyecto'),
        ),
    ]
