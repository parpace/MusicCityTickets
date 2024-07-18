

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tunr', '0002_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_price',
            field=models.IntegerField(),
        ),
    ]
