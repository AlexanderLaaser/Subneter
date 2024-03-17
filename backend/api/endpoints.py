from flask import Flask, jsonify, request
from flask_cors import CORS
from calculator.calculation import get_start_iP, get_end_ip, count_ipaddresses, generate_next_subnet
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Server is running!"

@app.route("/api/start_ip", methods=['GET'])
def endpoint_start_ip():
    ipaddress_cidr = request.args.get('ipaddress_cidr')
    return get_start_iP(ipaddress_cidr)

@app.route("/api/end_ip", methods=['GET'])
def endpoint_end_ip():
    ipaddress_cidr = request.args.get('ipaddress_cidr')
    return get_end_ip(ipaddress_cidr)

@app.route("/api/address_space", methods=['GET'])
def endpoint_address_space():
    ipaddress_cidr = request.args.get('ipaddress_cidr') 
    return get_start_iP(ipaddress_cidr) + " - " + get_end_ip(ipaddress_cidr)

@app.route("/api/count_ipaddresses", methods=['GET'])
def endpoint_count_ipaddresses():
    subnet_mask = request.args.get('subnet_mask')
    count = count_ipaddresses(subnet_mask)
    return jsonify({'count': count})

@app.route("/api/generate_next_subnet", methods=['POST'])
def endpoint_generate_next_subnet():
    data = request.json
    ipaddress_cidr = data['ipaddress_cidr']
    new_suffix_length = data['new_suffix_length']
    last_ip_ranges_used = data['last_ip_ranges_used']  

    next_subnet = generate_next_subnet(ipaddress_cidr, new_suffix_length, last_ip_ranges_used)
    nextSubnetRange = get_start_iP(next_subnet) + " - " + get_end_ip(next_subnet)
    
    return jsonify({'nextSubnetRange': nextSubnetRange})