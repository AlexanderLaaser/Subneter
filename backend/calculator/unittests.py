from calculator.calculation import get_start_iP, get_end_ip, count_ipaddresses, generate_next_subnet

def test_generate_next_subnet():
    vnet_cidr = "192.168.1.0/24"
    new_prefix_length = 25
    last_ip_ranges_used = ["192.168.1.0/25"]
    assert generate_next_subnet(vnet_cidr, new_prefix_length, last_ip_ranges_used) == "192.168.1.128/25"
