# Generated by Django 3.2.5 on 2022-10-21 12:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Audio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('path', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Tablature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField()),
                ('audio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='audio.audio')),
            ],
        ),
    ]
