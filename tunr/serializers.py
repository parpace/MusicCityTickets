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
    events = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='event_detail',
        read_only=True
    )

    class Meta:
       model = User
       fields = ('id', 'user_name', 'password', 'email', 'user_photo', 'events')

class UserEventSerializer(serializers.Serializer):
    event_id = serializers.IntegerField()

    def validate_event_id(self, value):
        if not Event.objects.filter(id=value).exists():
            raise serializers.ValidationError("Event does not exist")
        return value