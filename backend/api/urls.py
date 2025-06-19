from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include

router = DefaultRouter()
router.register(r'clients', ClientListView)
router.register(r'events', EventListView)
router.register(r'enrollments', EnrollmentListView)

urlpatterns = [
    path('', include(router.urls)),
]