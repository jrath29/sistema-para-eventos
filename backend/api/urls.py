from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include

router = DefaultRouter()
router.register(r'clients', ClientListView)
router.register(r'events', EventListView)

urlpatterns = [
    path('', include(router.urls)),
]