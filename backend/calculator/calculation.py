import ipaddress
import math

#Calculating first ip
def get_start_iP(ip, suffix):
    network = ipaddress.ip_network(f"{ip}/{suffix}", strict=False)
    return str(network.network_address)

#Calculating last ip
def get_end_ip(ip, suffix):
    network = ipaddress.ip_network(f"{ip}/{suffix}", strict=False)
    return str(network.broadcast_address)

# suffix needs to be a string
def count_ipaddresses(suffix):
    return 2 ** (32 - int(suffix))

def generate_next_subnet(ip_range, new_prefix_length, last_ip_ranges_used):
    network = ipaddress.ip_network(ip_range, strict=False)
    
    if new_prefix_length <= network.prefixlen:
        raise ValueError("Desired subnet prefix length is too big or equal to the given IP range prefix length.")

    # Konvertieren der letzten genutzten IP-Ranges in ipaddress.IPv4Network Objekte
    allocated_subnets = [ipaddress.ip_network(subnet, strict=False) for subnet in last_ip_ranges_used]

    def allocate_next_subnet():
        for potential_subnet in network.subnets(new_prefix=new_prefix_length):
            if not any(potential_subnet.overlaps(allocated_subnet) for allocated_subnet in allocated_subnets):
                allocated_subnets.append(potential_subnet)
                return potential_subnet
        return None

    next_subnet = allocate_next_subnet()
    #next_subnet_start = get_start_iP()
    return str(next_subnet) if next_subnet else None

# Beispielaufruf der Funktion
ip_range = "192.168.1.0/24"
new_prefix_length = 25  # Neue Subnetzgröße als Präfixlänge
last_ip_ranges_used = ["192.168.1.0/25"]  # Beispiel für bereits genutzte Bereiche

next_subnet = generate_next_subnet(ip_range, new_prefix_length, last_ip_ranges_used)
print("Next available subnet:", next_subnet)

#Testing 
print(get_start_iP("127.0.0.0","23"))
print(get_end_ip("127.0.0.0","25"))
print(count_ipaddresses(20))
