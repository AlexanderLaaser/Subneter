import ipaddress

#Calculating first ip
def get_start_iP(ipaddress_cidr):
    network = ipaddress.ip_network(ipaddress_cidr, strict=True)
    return str(network.network_address)

#Calculating last ip
def get_end_ip(ipaddress_cidr):
    network = ipaddress.ip_network(ipaddress_cidr, strict=True)
    return str(network.broadcast_address)

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

def compare_vnet_range_with_subnet_ranges_used(vnet_range, ip_ranges_used ): 
    vnet_network_object = ipaddress.ip_network(vnet_range, strict=True)
    total_vnet_addresses = vnet_network_object.num_addresses
    total_subnet_addresses = sum(ipaddress.ip_network(subnet).num_addresses for subnet in ip_ranges_used)
    return total_vnet_addresses >= total_subnet_addresses