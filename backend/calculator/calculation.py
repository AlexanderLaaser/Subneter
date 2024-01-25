import ipaddress

#Calculating first ip
def get_start_iP(ip, suffix):
    network = ipaddress.ip_network(f"{ip}/{suffix}", strict=False)
    return str(network.network_address)

#Calculating last ip
def get_end_ip(ip, suffix):
    network = ipaddress.ip_network(f"{ip}/{suffix}", strict=False)
    return str(network.broadcast_address)

#Calculating amount of hosts
def calculate_number_of_hosts(subnet_mask):
    return 2 ** (32 - subnet_mask) - 2

#Testing 
print(get_start_iP("127.0.0.0","23"))
print(get_end_ip("127.0.0.0","25"))
print(calculate_number_of_hosts(25))