from rest_framework import serializers
from .models import Venue, Event, User

class EventSerializer(serializers.HyperlinkedModelSerializer):
    venue = serializers.HyperlinkedRelatedField(
        view_name='venue_detail',
        read_only=True
    )

    venue_id = serializers.PrimaryKeyRelatedField(
        queryset=Venue.objects.all(),
        source='venue'
    )

    class Meta:
       model = Event
       fields = ('id', 'venue', 'venue_id', 'event_name', 'performer_name', 'performer_description', 'event_dateAndTime', 'event_price', 'photo_url')

class VenueSerializer(serializers.HyperlinkedModelSerializer):
    events = EventSerializer(
        many=True,
        read_only=True
    )

    venue_url = serializers.ModelSerializer.serializer_url_field(
        view_name='venue_detail'
    )

    class Meta:
       model = Venue
       fields = ('id', 'venue_url', 'venue_name', 'address', 'venue_description', 'photo_url', 'events')

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
       model = User
       fields = ('id', 'user_name', 'password', 'email', 'user_photo')
