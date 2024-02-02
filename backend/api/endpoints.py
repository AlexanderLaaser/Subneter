from flask import Flask, request
from flask_cors import CORS
from calculator.calculation import get_start_iP, get_end_ip, count_ipaddresses
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Server is running!"

@app.route("/api/start_ip")
def get_start_iP_route():
    ip = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return get_start_iP(ip, subnet_mask)

@app.route("/api/end_ip")
def get_end_iP_route():
    ip = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return get_end_ip(ip, subnet_mask)

@app.route("/api/address_space")
def call_address_space():
    ip = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return get_start_iP(ip, subnet_mask) + "-" + get_end_ip(ip, subnet_mask)

@app.route("/api/count_ipaddresses")
def call_count_ipaddresses():
    ip = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return count_ipaddresses(ip, subnet_mask)