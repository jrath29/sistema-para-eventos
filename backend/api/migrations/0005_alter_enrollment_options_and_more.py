# Generated by Django 5.2.1 on 2025-06-19 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_event_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='enrollment',
            options={'verbose_name': 'Inscrição', 'verbose_name_plural': 'Inscrições'},
        ),
        migrations.AlterUniqueTogether(
            name='enrollment',
            unique_together={('client', 'event')},
        ),
    ]
