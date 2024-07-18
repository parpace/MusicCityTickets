from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('venues/', views.VenueList.as_view(), name='venue_list'),
    path('venues/<int:pk>', views.VenueDetail.as_view(), name='venue_detail'),
    path('events/', views.EventList.as_view(), name="event_list"),
    path('events/<int:pk>', views.EventDetail.as_view(), name="event_detail"),
    path('users/', views.UserList.as_view(), name="user_list"),
    path('users/<int:pk>', views.UserDetail.as_view(), name="user_detail"),
    path('users/<int:user_id>/add_event/', views.add_event_to_user, name='add_event_to_user'),
    path('users/<int:user_id>/remove_event/', views.remove_event_from_user, name='remove_event_from_user')
]