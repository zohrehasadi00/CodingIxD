#include <AccelStepper.h>  // from https://www.airspayce.com/mikem/arduino/AccelStepper/
#include <WiFi.h>

const char* ssid = "SSID"; //need to be adjusted accordingly
const char* password = "PASSWORD"; //need to be adjusted accordingly


// https://www.circuitstate.com/tutorials/how-to-write-parallel-multitasking-applications-for-esp32-using-freertos-arduino/ relate to this for concurrency

// https://www.rapidtables.com/web/color/RGB_Color.html for the colour codes

AccelStepper stepper1(AccelStepper::DRIVER, 18, 5);  //STEP then DIR

const float MS = 16.00;    // Put the Number of Microsteps defined through the 3 pins on the A4988 here. remember to add two decimals: "xx.00"
const float SPR = 200.00;  // Put the Number of Steps your specific stepper takes per revolution. remember to add two decimals: "xx.00"

//The Ratio allows to input the desired position in revolutions instead of steps.
const float Ratio1 = ((MS * (SPR / 360.00)) * 360.00);  //((MicroSteps * (full steps per revolution / full revolution in degrees)) || Decimal places for more precise float values

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// init for demonstration flag

bool isDemo = true;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//LED Setup

int pinR = 15;
int pinG = 2;
int pinB = 4;

byte ValR = 0; // red value for fadetocolour
byte ValG = 0; // green value for fadetocolour
int counter = 0; //counter for offset for fadetocolour function

bool isWhite = true; // bool for termination check leds
bool doesRotate = true; // bool for termination check motor

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// trial rates 

//Pulse

int HR = 125; // trial heart rate
int baserate = 60; //trial base rate

// scalation for switch cases for heart rate.

int IR = (int)HR / baserate * 100; // computes individual pulse index

// scalation for Perceived Stress level 

int stress = 100; // stress value for test

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


// Colour stages for intialisation - to be adjusted later

// Stage 1: 

int R1 = 0;
int G1 = 0;
int BE1 = 255;

// Stage 2:

int R2 = 51;
int G2 = 51;
int B2 = 255;

// Stage 3:

int R3 = 102;
int G3 = 102;
int B3 = 255;


// Stage 4: 

int R4 = 255;
int G4 = 160;
int B4 = 160;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//Acceleration

float AC = 3000.00; // init for acceleration
byte stepcount = 1;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//Mutex Semaphore init

SemaphoreHandle_t taskMutex;


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

void setup() {
  
    Serial.begin (115200);

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// Wifi setup


    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        Serial.println("Connecting...");
    }

    Serial.println("Connected to the WiFi network");


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––  

      //For LED
     pinMode(pinR, OUTPUT);
     pinMode(pinG, OUTPUT);
     pinMode(pinB, OUTPUT);


if (isDemo){

// led init with demonstration values; here stage 4

    ValR = R4;
    ValG = G4;
    analogWrite(pinR, R4);
    analogWrite(pinG, G4);
    analogWrite(pinB, B4);    

// rotation speed init, here for medium speed (2000)

    stepper1.setMaxSpeed(2000);
  
} else {

  // depending on IR switch state - maybe needs to be adjusted for fine tune later; also refer to IR calc.
  
      switch(IR){
    
      case 0 ... 69:
        ValR = 255;
        ValG = 0;
        analogWrite(pinR, 255);
        analogWrite(pinG, 0);
        analogWrite(pinB, 0);
        break;

      case 70 ... 114:
        ValR = R1;
        ValG = G1;
        analogWrite(pinR, R1);
        analogWrite(pinG, G1);
        analogWrite(pinB, BE1);
        break;

      case 115 ... 164:
        ValR = R2;
        ValG = G2;
        analogWrite(pinR, R2);
        analogWrite(pinG, G2);
        analogWrite(pinB, B2);   
        break;

      case 165 ... 204:
        ValR = R3;
        ValG = G3;
        analogWrite(pinR, R3);
        analogWrite(pinG, G3);
        analogWrite(pinB, B3);    
        break;

      case 205 ... 500:
        ValR = R4;
        ValG = G4;
        analogWrite(pinR, R4);
        analogWrite(pinG, G4);
        analogWrite(pinB, B4);     
        break;
      }
  
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// for rotation speed - updates max speed level in relation to the perceived stress level

    switch(stress){

      case 0 ... 19:
        stepper1.setMaxSpeed(1960);

      case 20 ... 39:
        stepper1.setMaxSpeed(1970);

      case 40 ... 59:
        stepper1.setMaxSpeed(1980);

      case 60 ... 79:
        stepper1.setMaxSpeed(1990);

      case 80 ... 100:
        stepper1.setMaxSpeed(2000);
    }

}   
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    //For Motor -> needs to be adjusted for different rotation speeds
    stepper1.setAcceleration(AC);
    stepper1.run();

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

 // init for concurrency
 
  taskMutex = xSemaphoreCreateMutex(); 

  xTaskCreatePinnedToCore(
      stepmotor,
      "stepmotor",
      1000,
      NULL,
      1,
      NULL,
      1);

  xTaskCreatePinnedToCore(
      leds,
      "leds",
      1000,
      NULL,
      0,
      NULL,
      0);
}


void stepmotor(void *pvParameters) {
  while (1) {
    xSemaphoreTake(taskMutex, portMAX_DELAY);

      if (doesRotate){
        stepper1.run();
        stepper1.moveTo(stepcount * Ratio1);  //go to a new position, in this case always 1 rotation further in same direction
        stepcount = stepcount + 1;            //adjust stepcount accordingly        
      } else {
        stepper1.stop();      
      }
    xSemaphoreGive(taskMutex);
  }
}

void leds(void *pvParameters) {
  
  while (1) {
    
    xSemaphoreTake(taskMutex, portMAX_DELAY);

    if (isWhite) {
      counter = counter + 3;   // normal offset, maybe needs to be adjusted for time
      fadetocolour(pinR, pinG);

    } else {

      // the last colour
      analogWrite(pinR, LOW);
      analogWrite(pinG, LOW);
      analogWrite(pinB, LOW);    
      
    }

    xSemaphoreGive(taskMutex);
    
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

void loop() {
}


void fadetocolour (int pin1, int pin2) { //gradually decreases both green and red light so everything turns bluer and bluer
  byte ValA = ValR - counter;
  byte ValB = ValG - counter;
  analogWrite(pin1, ValA);
  analogWrite(pin2, ValB);
  if (ValA <= 30 || ValB <= 30) { // break condition motor
    doesRotate = false;
  if (ValA <= 20 || ValB <= 20){ // break condition leds
    isWhite = false;
  }
  }
  }
