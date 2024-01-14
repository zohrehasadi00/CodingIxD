// fade function from https://gitlab.kh-berlin.de/elab/examples/arduino-sine-fade/-/blob/main/sine_fade/sine_fade.ino

int pinR = 13;
int pinG = 12;
int pinB = 14;

void setup() {
  pinMode(pinR, OUTPUT);
  pinMode(pinG, OUTPUT);
  pinMode(pinB, OUTPUT);

  Serial.begin(115200);
}

void loop() {
  analogWrite(pinB, 255);

  fade(pinR, pinG, 0, 255, 3000);
  fade(pinR, pinG, 255, 0, 3000);
}

void fade(int pinA, int pinB, byte brightB, byte brightA, int fadeTime) {

  for (int i = 90; i < 180 + 90; i++) {
    float angle = radians(i);
    int t = (255 / 2) + (255 / 2) * sin(angle);
    byte brightness = map(t, 0, 255, brightA, brightB);
    analogWrite(pinA, brightness);
    brightness = constrain(brightness, 0, 220);
    analogWrite(pinB, brightness);

    // if (printFade) {
      // Serial.print(255);
      // Serial.print(",");
      // Serial.print(fadeTime / 180.00);
      // Serial.print(",");
      // Serial.println(brightness);
    // }

    delay(fadeTime / 180.00);
  }
}