# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-07-28 17:48
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cyd', '0015_auto_20170728_1708'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='grupo',
            unique_together=set([('sede', 'numero', 'curso')]),
        ),
    ]
