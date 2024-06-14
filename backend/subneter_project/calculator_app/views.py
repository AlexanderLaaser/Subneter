from django.shortcuts import render # type: ignore
from django.http import JsonResponse # type: ignore
from django.views.decorators.http import require_http_methods # type: ignore
from .calculations.calculation import (get_start_iP, get_end_ip, count_ipaddresses, 
                                    generate_next_subnet, compare_vnet_range_with_subnet_ranges_used)
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Vnet, Subnet
from .serializers import VnetSerializer

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
    vnet_cidrs = request.data['vnet_cidrs']
    ip_ranges_used = request.data['ip_ranges_used']
    result = compare_vnet_range_with_subnet_ranges_used(vnet_cidrs, ip_ranges_used)
    return JsonResponse({'result': result})

from .models import Vnet, AddressSpace, Subnet
from .serializers import VnetSerializer

class VnetViewSet(viewsets.ModelViewSet):
    queryset = Vnet.objects.all()
    serializer_class = VnetSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Serialisieren und validieren des Anfragetexts
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Speichern der Vnet-Daten
        self.perform_update(serializer)

        # Extrahieren der gesendeten AddressSpaces und Subnets
        addressspaces_data = request.data.get('addressspaces', [])
        subnets_data = request.data.get('subnets', [])

        # IDs der gesendeten AddressSpaces und Subnets
        sent_addressspace_ids = [addressspace['id'] for addressspace in addressspaces_data if 'id' in addressspace]
        sent_subnet_ids = [subnet['id'] for subnet in subnets_data if 'id' in subnet]

        # Bestehende AddressSpaces und Subnets, die in der Anfrage nicht vorhanden sind, löschen
        instance.addressspaces.exclude(id__in=sent_addressspace_ids).delete()
        instance.subnets.exclude(id__in=sent_subnet_ids).delete()

        # Aktualisieren und Erstellen von AddressSpaces
        for addressspace_data in addressspaces_data:
            addressspace_id = addressspace_data.pop('id', None)
            if addressspace_id:
                addressspace_instance = AddressSpace.objects.filter(id=addressspace_id, vnet=instance).first()
                if addressspace_instance:
                    for attr, value in addressspace_data.items():
                        setattr(addressspace_instance, attr, value)
                    addressspace_instance.save()
                else:
                    AddressSpace.objects.create(vnet=instance, **addressspace_data)
            else:
                AddressSpace.objects.create(vnet=instance, **addressspace_data)

        # Aktualisieren und Erstellen von Subnets
        for subnet_data in subnets_data:
            subnet_id = subnet_data.pop('id', None)
            if subnet_id:
                subnet_instance = Subnet.objects.filter(id=subnet_id, vnet=instance).first()
                if subnet_instance:
                    for attr, value in subnet_data.items():
                        setattr(subnet_instance, attr, value)
                    subnet_instance.save()
                else:
                    Subnet.objects.create(vnet=instance, **subnet_data)
            else:
                Subnet.objects.create(vnet=instance, **subnet_data)

        return Response(serializer.data)


