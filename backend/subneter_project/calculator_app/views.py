from django.shortcuts import render # type: ignore
from django.http import JsonResponse # type: ignore
from django.views.decorators.http import require_http_methods # type: ignore
from .calculations.calculation import (get_start_iP, get_end_ip, count_ipaddresses, 
                                    generate_next_subnet, compare_vnet_range_with_subnet_ranges_used)
from .models import Vnet, Subnet
from .serializers import VnetSerializer, SubnetSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

@api_view(['GET'])
def endpoint_start_ip(request):
    ipaddress_cidr = request.GET.get('ipaddress_cidr')
    return JsonResponse({"start_ip": get_start_iP(ipaddress_cidr)})

@api_view(['GET'])
def endpoint_end_ip(request):
    ipaddress_cidr = request.GET.get('ipaddress_cidr')
    return JsonResponse({"end_ip": get_end_ip(ipaddress_cidr)})

@api_view(['GET'])
def endpoint_address_space(request):
    ipaddress_cidr = request.GET.get('ipaddress_cidr') 
    return JsonResponse({"address_space": f"{get_start_iP(ipaddress_cidr)} - {get_end_ip(ipaddress_cidr)}"})

@api_view(['GET'])
def endpoint_count_ipaddresses(request):
    subnet_mask = request.GET.get('subnet_mask')
    count = count_ipaddresses(subnet_mask)
    return JsonResponse({'count': count})


@api_view(['POST'])
def endpoint_generate_next_subnet(request):
    vnet_cidr = request.data['vnet_cidr']
    new_suffix_length = request.data['new_suffix_length']
    ip_ranges_used = request.data['ip_ranges_used']
    next_subnet = generate_next_subnet(vnet_cidr, new_suffix_length, ip_ranges_used)
    return JsonResponse({'nextSubnetRange': f"{get_start_iP(next_subnet)} - {get_end_ip(next_subnet)}"})

@api_view(['POST'])
def endpoint_compare_vnet_range_with_subnet_ranges_used(request):
    vnet_cidr = request.data['vnet_cidr']
    ip_ranges_used = request.data['ip_ranges_used']
    result = compare_vnet_range_with_subnet_ranges_used(vnet_cidr, ip_ranges_used)
    return JsonResponse({'result': result})

class VnetViewSet(viewsets.ModelViewSet):
    queryset = Vnet.objects.all()
    serializer_class = VnetSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

class SubnetViewSet(viewsets.ModelViewSet):
    queryset = Subnet.objects.all()
    serializer_class = SubnetSerializer

    def get_queryset(self):
        return self.queryset.filter(vnet__user=self.request.user)


