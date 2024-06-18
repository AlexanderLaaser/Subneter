from rest_framework import serializers
from .models import Vnet, AddressSpace, Subnet

class AddressSpaceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = AddressSpace
        fields = ['id', 'networkaddress', 'subnetmask', 'created_at', 'updated_at']

class SubnetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    
    class Meta:
        model = Subnet
        fields = ['id', 'name', 'subnetmask', 'ips', 'range', 'created_at', 'updated_at']

class VnetSerializer(serializers.ModelSerializer):
    addressspaces = AddressSpaceSerializer(many=True)
    subnets = SubnetSerializer(many=True)

    class Meta:
        model = Vnet
        fields = ['id', 'name', 'addressspaces', 'subnets', 'created_at', 'updated_at']

    def create(self, validated_data):
        addressspaces_data = validated_data.pop('addressspaces')
        subnets_data = validated_data.pop('subnets')
        user = self.context['request'].user

        # Ensure user is not in validated_data to avoid conflict
        validated_data.pop('user', None)
        
        vnet = Vnet.objects.create(user=user, **validated_data)
        
        for addressspace_data in addressspaces_data:
            AddressSpace.objects.create(vnet=vnet, **addressspace_data)
        
        for subnet_data in subnets_data:
            Subnet.objects.create(vnet=vnet, **subnet_data)
            
        return vnet
    
    def update(self, instance, validated_data):
        addressspaces_data = validated_data.pop('addressspaces')
        subnets_data = validated_data.pop('subnets')
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        # Update address spaces
        current_addressspace_ids = [addressspace.id for addressspace in instance.addressspaces.all()]
        new_addressspace_ids = [addressspace_data.get('id') for addressspace_data in addressspaces_data if addressspace_data.get('id')]

        for addressspace_id in current_addressspace_ids:
            if addressspace_id not in new_addressspace_ids:
                AddressSpace.objects.filter(id=addressspace_id).delete()

        for addressspace_data in addressspaces_data:
            addressspace_id = addressspace_data.get('id')
            if addressspace_id:
                addressspace = AddressSpace.objects.get(id=addressspace_id, vnet=instance)
                addressspace.networkaddress = addressspace_data.get('networkaddress', addressspace.networkaddress)
                addressspace.subnetmask = addressspace_data.get('subnetmask', addressspace.subnetmask)
                addressspace.save()
            else:
                AddressSpace.objects.create(vnet=instance, **addressspace_data)

        # Update subnets
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
                Subnet.objects.create(vnet=instance, **subnet_data)

        return instance
