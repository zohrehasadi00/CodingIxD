// fade function from https://gitlab.kh-berlin.de/elab/examples/arduino-sine-fade/-/blob/main/sine_fade/sine_fade.ino
#include <AccelStepper.h>  // from https://www.airspayce.com/mikem/arduino/AccelStepper/

AccelStepper stepper1(AccelStepper::DRIVER, 18, 5);  //STEP then DIR

const float MS = 16.00;    // Put the Number of Microsteps defined through the 3 pins on the A4988 here. remember to add two decimals: "xx.00"
const float SPR = 200.00;  // Put the Number of Steps your specific stepper takes per revolution. remember to add two decimals: "xx.00"

//The Ratio allows to input the desired position in revolutions instead of steps.
const float Ratio1 = ((MS * (SPR / 360.00)) * 360.00);  //((MicroSteps * (full steps per revolution / full revolution in degrees)) || Decimal places for more precise float values

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

int pinR = 15;
int pinG = 2;
int pinB = 4;

bool fadeON = false;
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

void setup() {
  Serial.begin(115200);

  //For Motor
  stepper1.setMaxSpeed(2000);
  stepper1.setAcceleration(3000.00);

  //For LED
  pinMode(pinR, OUTPUT);
  pinMode(pinG, OUTPUT);
  pinMode(pinB, OUTPUT);

  analogWrite(pinB, 255);
  stepper1.moveTo(2.00 * Ratio1);  //go to a new position, in this case 5 revolutions clockwise.
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

void loop() {
  stepper1.run();

  if (stepper1.distanceToGo() == 0) {
    if (!fadeON) {
      fade(pinR, pinG, 0, 255, 3000);
      stepper1.moveTo(0.00 * Ratio1);  //go to a new position, in this case 5 revolutions clockwise.
      fadeON = true;
    } else {
      fade(pinR, pinG, 255, 0, 3000);
      stepper1.moveTo(2.00 * Ratio1);  //go to a new position, in this case 5 revolutions clockwise.
      fadeON = false;
    }
  }
}

void fade(int pinA, int pinB, byte brightB, byte brightA, int fadeTime) {

  for (int i = 90; i < 180 + 90; i++) {
    float angle = radians(i);
    int t = (255 / 2) + (255 / 2) * sin(angle);
    byte brightness = map(t, 0, 255, brightA, brightB);
    analogWrite(pinA, brightness);
    brightness = constrain(brightness, 0, 220);
    analogWrite(pinB, brightness);


      // Serial.print(255);
      // Serial.print(",");
      // Serial.print(fadeTime / 180.00);
      // Serial.print(",");
      // Serial.println(brightness);


    delay(fadeTime / 180.00);
  }
}