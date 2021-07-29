import scapy.all as scapy

def scan(ip):
    scapy.arpping(ip)

scan('10.0.0.1/24')