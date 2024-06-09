from rest_framework import serializers
from .models import Vnet, Subnet

class SubnetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    
    class Meta:
        model = Subnet
        fields = ['id', 'name', 'subnetmask', 'ips', 'range', 'created_at', 'updated_at']

class VnetSerializer(serializers.ModelSerializer):
    subnets = SubnetSerializer(many=True)

    class Meta:
        model = Vnet
        fields = ['id', 'name', 'networkaddress', 'subnetmask', 'subnets', 'created_at', 'updated_at']

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
        instance.subnetmask = validated_data.get('subnetmask', instance.subnetmask)
        instance.save()

        # Löschen von Subnets, die nicht mehr im neuen Bestand sind
        current_subnet_ids = [subnet.id for subnet in instance.subnets.all()]
        new_subnet_ids = [subnet_data.get('id') for subnet_data in subnets_data if subnet_data.get('id')]

        for subnet_id in current_subnet_ids:
            if subnet_id not in new_subnet_ids:
                Subnet.objects.filter(id=subnet_id).delete()

        for subnet_data in subnets_data:
            subnet_id = subnet_data.get('id')
            if subnet_id:
                
                subnet = Subnet.objects.get(id=subnet_id, vnet=instance)
                subnet.name = subnet_data.get('name', subnet.name)
                subnet.subnetmask = subnet_data.get('subnetmask', subnet.subnetmask)
                subnet.ips = subnet_data.get('ips', subnet.ips)
                subnet.range = subnet_data.get('range', subnet.range)
                subnet.save()
            else:
                # Neues Subnet erstellen
                Subnet.objects.create(vnet=instance, **subnet_data)

        return instance