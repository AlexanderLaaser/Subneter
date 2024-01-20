from flask import Flask, request 
from calculator import get_start_iP, get_end_ip
app = Flask(__name__)

@app.route("/start_ip")
def hello_world():
    ip = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return get_start_iP(ip, subnet_mask)

@app.route("/end_ip")
def hello_world():
    ip = request.args.get('ip') 
    subnet_mask = request.args['subnet_mask']
    return get_end_ip(ip, subnet_mask)