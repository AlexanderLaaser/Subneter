from rest_framework import serializers
from .models import Vnet, Subnet

class SubnetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    
    class Meta:
        model = Subnet
        fields = ['id', 'name', 'mask', 'ips', 'range', 'created_at', 'updated_at']

class VnetSerializer(serializers.ModelSerializer):
    subnets = SubnetSerializer(many=True)

    class Meta:
        model = Vnet
        fields = ['id', 'name', 'networkaddress', 'mask', 'subnets', 'created_at', 'updated_at']

    def create(self, validated_data):
        subnets_data = validated_data.pop('subnets')
        user = self.context['request'].user
        
        if 'user' in validated_data:
            validated_data.pop('user')
        
        vnet = Vnet.objects.create(user=user, **validated_data)
        for subnet_data in subnets_data:
            Subnet.objects.create(vnet=vnet, **subnet_data)
        return vnet
    
    def update(self, instance, validated_data):
        subnets_data = validated_data.pop('subnets')
        instance.name = validated_data.get('name', instance.name)
        instance.networkaddress = validated_data.get('networkaddress', instance.networkaddress)
        instance.mask = validated_data.get('mask', instance.mask)
        instance.save()

        for subnet_data in subnets_data:
            subnet_id = subnet_data.get('id')
            print(subnet_id)
            if subnet_id:
                # Existierendes Subnet aktualisieren
                subnet = Subnet.objects.get(id=subnet_id, vnet=instance)
                subnet.name = subnet_data.get('name', subnet.name)
                subnet.mask = subnet_data.get('mask', subnet.mask)
                subnet.ips = subnet_data.get('ips', subnet.ips)
                subnet.range = subnet_data.get('range', subnet.range)
                subnet.save()
            else:
                
                Subnet.objects.create(vnet=instance, **subnet_data)

        return instance
