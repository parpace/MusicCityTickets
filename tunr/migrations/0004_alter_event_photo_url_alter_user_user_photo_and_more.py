# Generated by Django 5.0.7 on 2024-07-17 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tunr', '0003_event_photo_url_user_user_photo_venue_photo_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='photo_url',
            field=models.ImageField(default='defaultEvent.jpg', upload_to='images'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_photo',
            field=models.ImageField(default='defaultUser.jpg', upload_to='images'),
        ),
        migrations.AlterField(
            model_name='venue',
            name='photo_url',
            field=models.ImageField(default='defaultVenue.jpg', upload_to='images'),
        ),
    ]