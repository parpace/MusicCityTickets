# Generated by Django 5.0.7 on 2024-07-17 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tunr', '0012_alter_event_photo_url_alter_user_user_photo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_photo',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='venue',
            name='photo_url',
            field=models.CharField(max_length=200),
        ),
    ]