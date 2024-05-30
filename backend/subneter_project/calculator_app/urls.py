from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import VnetViewSet, SubnetViewSet

router = DefaultRouter()
router.register(r'vnets', VnetViewSet)
router.register(r'subnets', SubnetViewSet)


urlpatterns = [
    path('start_ip', views.endpoint_start_ip, name='start_ip'),
    path('end_ip', views.endpoint_end_ip, name='end_ip'),
    path('address_space', views.endpoint_address_space, name='address_space'),
    path('count_ipaddresses', views.endpoint_count_ipaddresses, name='count_ipaddresses'),
    path('generate_next_subnet', views.endpoint_generate_next_subnet, name='generate_next_subnet'),
    path('compare_vnet_range_with_subnet_ranges_used', views.endpoint_compare_vnet_range_with_subnet_ranges_used, name='compare_vnet_range'),
    path('', include(router.urls)),
]

