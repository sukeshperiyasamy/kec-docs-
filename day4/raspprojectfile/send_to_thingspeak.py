import time
import requests
import board
import adafruit_dht

WRITE_API_KEY = "YOUR_WRITE_API_KEY"
THINGSPEAK_URL = "https://api.thingspeak.com/update"

dht = adafruit_dht.DHT11(board.D4)  # GPIO4

while True:
    try:
        temperature = dht.temperature
        humidity = dht.humidity

        if temperature is not None and humidity is not None:
            payload = {
                "api_key": WRITE_API_KEY,
                "field1": temperature,
                "field2": humidity
            }

            requests.post(THINGSPEAK_URL, data=payload)
            print(f"Sent → Temp: {temperature}°C  Humidity: {humidity}%")

    except Exception as e:
        print("Sensor error:", e)

    time.sleep(15)  # ThingSpeak minimum interval
