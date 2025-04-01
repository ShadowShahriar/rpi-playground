import RPi.GPIO as GPIO
import subprocess

pinLED1 = 20
pinLED2 = 26
pinButton = 21

# === using GPIO pin numbers ===
GPIO.setmode(GPIO.BCM) 

# === setup LEDs ===
GPIO.setup(pinLED1, GPIO.OUT)
GPIO.setup(pinLED2, GPIO.OUT)

# === button with built-in pull-up resistor ===
GPIO.setup(pinButton, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# === green ON, red OFF ===
GPIO.output(pinLED1, GPIO.HIGH)
GPIO.output(pinLED2, GPIO.LOW)

# === wait for interrupt in the button pin ===
GPIO.wait_for_edge(pinButton, GPIO.FALLING)

# === green OFF, red ON ===
GPIO.output(pinLED1, GPIO.LOW)
GPIO.output(pinLED2, GPIO.HIGH)

print("Goodbye")

# === shutdown using command ===
subprocess.call(['sudo', 'shutdown', '-h', 'now'], shell=False)