import RPi.GPIO as GPIO
import time
import subprocess

class SmartMirrorController:
    def __init__(self):
        self.PIR_PIN = 4
        self.TRIG = 23
        self.ECHO = 24
        self.setup_gpio()

    def setup_gpio(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.PIR_PIN, GPIO.IN)
        GPIO.setup(self.TRIG, GPIO.OUT)
        GPIO.setup(self.ECHO, GPIO.IN)

    def get_distance(self):
        GPIO.output(self.TRIG, True)
        time.sleep(0.00001)
        GPIO.output(self.TRIG, False)
        
        pulse_start = time.time()
        pulse_end = time.time()

        while GPIO.input(self.ECHO) == 0:
            pulse_start = time.time()
        while GPIO.input(self.ECHO) == 1:
            pulse_end = time.time()
            
        return (pulse_end - pulse_start) * 17150

    def toggle_display(self, state):
        if state:
            subprocess.run(["vcgencmd", "display_power", "1"])
        else:
            subprocess.run(["vcgencmd", "display_power", "0"])

    def run(self):
        try:
            while True:
                if GPIO.input(self.PIR_PIN):
                    self.toggle_display(True)
                    distance = self.get_distance()
                    if distance < 40:
                        # Close proximity detected
                        pass
                else:
                    self.toggle_display(False)
                time.sleep(2)
        except KeyboardInterrupt:
            GPIO.cleanup()

if __name__ == "__main__":
    controller = SmartMirrorController()
    controller.run()