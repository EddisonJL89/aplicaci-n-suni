# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2020-08-06 12:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Bienestar', '0002_auto_20200804_1213'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='colaborador',
            name='direccion',
        ),
        migrations.AddField(
            model_name='colaborador',
            name='email',
            field=models.CharField(blank=True, max_length=150, null=True, verbose_name='Correo Electronico'),
        ),
        migrations.AlterField(
            model_name='colaborador',
            name='usuario',
            field=models.CharField(blank=True, max_length=150, null=True, verbose_name='Nombre'),
        ),
    ]
