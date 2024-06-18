import ipaddress

#Calculating first ip
def get_start_iP(ipaddress_cidr):
    network = ipaddress.ip_network(ipaddress_cidr, strict=True)
    return str(network.network_address)

#Calculating last ip
def get_end_ip(ipaddress_cidr):
    network = ipaddress.ip_network(ipaddress_cidr, strict=True)
    return str(network.broadcast_address)

def get_ip_range(ipaddress_cidr):
    network = ipaddress.ip_network(ipaddress_cidr, strict=True)
    start_ip = network.network_address
    end_ip = network.broadcast_address
    return f"{start_ip} - {end_ip}"

def validate_cidr_overlap(new_range, existing_ranges):
    new_network = ipaddress.ip_network(new_range, strict=True)
    
    for range in existing_ranges:
        existing_network = ipaddress.ip_network(range, strict=True)
        if new_network.overlaps(existing_network):
            return True

    return False

# suffix needs to be a string
def count_ipaddresses(suffix):
    return 2 ** (32 - int(suffix))

def generate_next_subnet(vnet_range, new_prefix_length, ip_ranges_used):
    vnet_network_object = ipaddress.ip_network(vnet_range, strict=True)
    allocated_subnets = [ipaddress.ip_network(subnet, strict=True) for subnet in ip_ranges_used]
    def allocate_next_subnet():
        for potential_subnet in vnet_network_object.subnets(new_prefix=new_prefix_length):
            if not any(potential_subnet.overlaps(allocated_subnet) for allocated_subnet in allocated_subnets):
                allocated_subnets.append(potential_subnet)
                return potential_subnet
        return None

    next_subnet = allocate_next_subnet()
    return str(next_subnet) if next_subnet else None

def compare_vnet_range_with_subnet_ranges_used(vnet_ranges, ip_ranges_used):
    total_vnet_addresses = 0
    for vnet_range in vnet_ranges:
        vnet_network_object = ipaddress.ip_network(vnet_range, strict=True)
        total_vnet_addresses += vnet_network_object.num_addresses
    
    total_subnet_addresses = sum(ipaddress.ip_network(subnet).num_addresses for subnet in ip_ranges_used)
    return total_vnet_addresses >= total_subnet_addresses