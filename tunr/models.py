from django.db import models

class Venue(models.Model):
    venue_name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    venue_description = models.CharField(max_length=500)

    def __str__(self):
        return self.venue_name

class Event(models.Model):
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='events')
    event_name = models.CharField(max_length=100)
    performer_name = models.CharField(max_length=50)
    performer_description = models.CharField(max_length=500)
    event_dateAndTime = models.CharField(max_length=50)
    event_price = models.IntegerField(max_length=100)

    def __str__(self):
        return self.event_name