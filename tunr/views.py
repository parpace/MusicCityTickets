from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import VenueSerializer, EventSerializer, UserSerializer, UserEventSerializer
from .models import Venue, Event, User

class VenueList(generics.ListCreateAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class VenueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
def add_event_to_user(request, user_id):
    user = User.objects.get(id=user_id)
    serializer = UserEventSerializer(data=request.data)
    if serializer.is_valid():
        event_id = serializer.validated_data['event_id']
        event = Event.objects.get(id=event_id)
        user.events.add(event)
        return Response({'status': 'Event added'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def remove_event_from_user(request, user_id):
    user = User.objects.get(id=user_id)
    serializer = UserEventSerializer(data=request.data)
    if serializer.is_valid():
        event_id = serializer.validated_data['event_id']
        event = Event.objects.get(id=event_id)
        user.events.remove(event)
        return Response({'status': 'Event removed'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)