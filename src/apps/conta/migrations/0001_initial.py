# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-06-11 17:58
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inventario', '0007_auto_20180605_1546'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MovimientoDispositivo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(default=django.utils.timezone.now)),
                ('tipo_movimiento', models.IntegerField(choices=[(-1, 'Baja'), (1, 'Alta')], default=1)),
                ('precio', models.DecimalField(decimal_places=2, default=0.0, max_digits=14)),
                ('referencia', models.CharField(blank=True, max_length=30, null=True)),
                ('observaciones', models.TextField(blank=True, null=True)),
                ('dispositivo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventario.Dispositivo')),
            ],
            options={
                'verbose_name': 'Movimiento de dispositivo',
                'verbose_name_plural': 'Movimientos de dispositivos',
            },
        ),
        migrations.CreateModel(
            name='MovimientoRepuesto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(default=django.utils.timezone.now)),
                ('tipo_movimiento', models.IntegerField(choices=[(-1, 'Baja'), (1, 'Alta')], default=1)),
                ('precio', models.DecimalField(decimal_places=2, default=0.0, max_digits=14)),
                ('referencia', models.CharField(blank=True, max_length=30, null=True)),
                ('observaciones', models.TextField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Movimiento de repuesto',
                'verbose_name_plural': 'Movimientos de repuestos',
            },
        ),
        migrations.CreateModel(
            name='PeriodoFiscal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_inicio', models.DateField()),
                ('fecha_fin', models.DateField()),
                ('actual', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Periodo fiscal',
                'verbose_name_plural': 'Periodos fiscales',
            },
        ),
        migrations.CreateModel(
            name='PrecioDispositivo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('precio', models.DecimalField(decimal_places=2, default=0.0, max_digits=14)),
                ('activo', models.BooleanField(default=True)),
                ('fecha_creacion', models.DateField(default=django.utils.timezone.now)),
                ('dispositivo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='precios', to='inventario.Dispositivo')),
                ('periodo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='precios_dispositivo', to='conta.PeriodoFiscal')),
            ],
            options={
                'verbose_name': 'Precio de dispositivo',
                'verbose_name_plural': 'Precios de dispositivos',
            },
        ),
        migrations.CreateModel(
            name='PrecioEstandar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activo', models.BooleanField(default=True)),
                ('precio', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
                ('inventario', models.CharField(choices=[('dispositivo', 'Dispositivo'), ('repuesto', 'Repuesto')], default='dispositivo', max_length=12)),
                ('creado_por', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('periodo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='precios', to='conta.PeriodoFiscal')),
                ('tipo_dispositivo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='precios', to='inventario.DispositivoTipo')),
            ],
            options={
                'verbose_name': 'Precio estándar',
                'verbose_name_plural': 'Precios estándar',
            },
        ),
        migrations.CreateModel(
            name='PrecioRepuesto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('precio', models.DecimalField(decimal_places=2, default=0.0, max_digits=14)),
                ('activo', models.BooleanField(default=True)),
                ('fecha_creacion', models.DateField(default=django.utils.timezone.now)),
                ('periodo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='precios_repuesto', to='conta.PeriodoFiscal')),
                ('repuesto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='precios', to='inventario.Repuesto')),
            ],
            options={
                'verbose_name': 'Precio de repuesto',
                'verbose_name_plural': 'Precios de repuestos',
            },
        ),
        migrations.AddField(
            model_name='movimientorepuesto',
            name='periodo_fiscal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='movimientos_repuesto', to='conta.PeriodoFiscal'),
        ),
        migrations.AddField(
            model_name='movimientorepuesto',
            name='repuesto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventario.Repuesto'),
        ),
        migrations.AddField(
            model_name='movimientodispositivo',
            name='periodo_fiscal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='movimientos_dispositivo', to='conta.PeriodoFiscal'),
        ),
        migrations.AlterUniqueTogether(
            name='preciorepuesto',
            unique_together=set([('repuesto', 'periodo')]),
        ),
        migrations.AddIndex(
            model_name='precioestandar',
            index=models.Index(fields=['inventario'], name='conta_preci_inventa_f1cdf7_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='precioestandar',
            unique_together=set([('periodo', 'tipo_dispositivo')]),
        ),
        migrations.AlterUniqueTogether(
            name='preciodispositivo',
            unique_together=set([('dispositivo', 'periodo')]),
        ),
    ]
