#!/bin/bash

echo "Updating system packages..."
sudo apt update

echo "Installing python3-pip..."
sudo apt install python3-pip -y

echo "Installing libgpiod2 (required for DHT sensor)..."
sudo apt install libgpiod2 -y

echo "Installing Python libraries..."
pip3 install adafruit-circuitpython-dht requests

echo ""
echo "✅ Raspberry Pi is ready!"
echo "Run 'python3 send_to_thingspeak.py' to start sending data."
