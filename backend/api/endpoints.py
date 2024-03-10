from flask import Flask, jsonify, request
from flask_cors import CORS
from calculator.calculation import get_start_iP, get_end_ip, count_ipaddresses, generate_next_subnet
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Server is running!"

@app.route("/api/start_ip", methods=['GET'])
def start_ip():
    ip_range = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return get_start_iP(ip_range, subnet_mask)

@app.route("/api/end_ip", methods=['GET'])
def end_ip():
    ip_range = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return get_end_ip(ip_range, subnet_mask)

@app.route("/api/address_space", methods=['GET'])
def address_space():
    ip = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return get_start_iP(ip, subnet_mask) + "-" + get_end_ip(ip, subnet_mask)

@app.route("/api/count_ipaddresses", methods=['GET'])
def count_ipaddresses():
    subnet_mask = int(request.args.get('subnet_mask'))
    count = count_ipaddresses(subnet_mask)
    return jsonify({'count': count})

@app.route("/api/generate_next_subnet", methods=['POST'])
def generate_next_subnet():
    data = request.json
    ip_range = data['ip_range']
    new_suffix_length = int(data['new_suffix_length'])
    last_ip_ranges_used = data['last_ip_ranges_used']  

    next_subnet = generate_next_subnet(ip_range, new_suffix_length, last_ip_ranges_used)
    return jsonify({'nextSubnet': next_subnet})