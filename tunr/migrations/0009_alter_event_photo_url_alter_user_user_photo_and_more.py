# Generated by Django 5.0.7 on 2024-07-17 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tunr', '0008_alter_event_photo_url_alter_user_user_photo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='photo_url',
            field=models.ImageField(default='images/defaultEvent.jpg', upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_photo',
            field=models.ImageField(default='images/defaultUser.jpg', upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='venue',
            name='photo_url',
            field=models.ImageField(default='images/defaultVenue.jpg', upload_to='images/'),
        ),
    ]
