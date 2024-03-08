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

def count_ipaddresses(suffix):
    return str(2 ** (32 - int(suffix)))


# Param origin_ip_address, origin_ip_range, used_subnets, new_ip_address, new_ip_range
# Function should calculate next subnet size in range of original vnet size

def generate_subnets_within_range(ip_range, desired_subnet_size):
    network = ipaddress.ip_network(ip_range, strict=False)
    new_prefix_length = 32 - int(math.log2(desired_subnet_size))
    if new_prefix_length <= network.prefixlen:
        raise ValueError("Die Subnet-Größe ist zu groß für die angegebene IP-Range.")
    
    # Initialisiere die Liste für bereits genutzte Subnetze- Test
    allocated_subnets = []

    def allocate_next_subnet():
        # Durchsuche alle möglichen Subnetze innerhalb des Hauptnetzwerks
        for potential_subnet in network.subnets(new_prefix=new_prefix_length):
            # Überprüfe, ob das potenzielle Subnetz mit bereits zugewiesenen Subnetzen kollidiert
            if not any(potential_subnet.overlaps(allocated_subnet) for allocated_subnet in allocated_subnets):
                allocated_subnets.append(potential_subnet)
                return potential_subnet
        # Wenn kein Subnetz verfügbar ist, gib None zurück
        return None

    # Generiere und weise Subnetze zu, bis keine weiteren Subnetze mehr verfügbar sind
    while True:
        next_subnet = allocate_next_subnet()
        if next_subnet is None:
            break  # Keine weiteren Subnetze verfügbar
        yield next_subnet

# Beispiel: Generiere Subnetze aus der IP-Range 192.168.1.0/24 mit einer Größe von 64 Adressen
ip_range = "192.168.1.0/24"
subnet_size = 64

for subnet in generate_subnets_within_range(ip_range, subnet_size):
    string1 = str(subnet);
    print (string1);

#Testing 
print(get_start_iP("127.0.0.0","23"))
print(get_end_ip("127.0.0.0","25"))
print(count_ipaddresses("20"))
