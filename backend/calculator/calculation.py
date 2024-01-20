import ipaddress

#Calculating first ip
def get_start_iP(ip, suffix):
    network = ipaddress.ip_network(f"{ip}/{suffix}", strict=False)
    return network.network_address

#Calculating last ip
def get_end_ip(ip, suffix):
    network = ipaddress.ip_network(f"{ip}/{suffix}", strict=False)
    return network.broadcast_address

#Calculating amount of hosts
def calculate_number_of_hosts(subnet_mask):
    return 2 ** (32 - subnet_mask) - 2