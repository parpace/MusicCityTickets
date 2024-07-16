from django.contrib import admin

from .models import Event, Venue, User

admin.site.register(Event)
admin.site.register(Venue)
admin.site.register(User)