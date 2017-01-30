# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-01-30 15:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tpe', '0002_auto_20161111_1610'),
    ]

    operations = [
        migrations.CreateModel(
            name='EquipamientoTipoRed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='equipamiento',
            name='cantidad_equipo',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='equipamiento',
            name='carta',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='equipamiento',
            name='edulibre',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='equipamiento',
            name='fotos',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='equipamiento',
            name='manual',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='equipamiento',
            name='red',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='equipamiento',
            name='tipo_red',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tpe.EquipamientoTipoRed'),
        ),
    ]
