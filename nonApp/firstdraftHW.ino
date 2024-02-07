#include <AccelStepper.h>  // from https://www.airspayce.com/mikem/arduino/AccelStepper/

// https://www.circuitstate.com/tutorials/how-to-write-parallel-multitasking-applications-for-esp32-using-freertos-arduino/ relate to this for concurrency

// https://www.rapidtables.com/web/color/RGB_Color.html for the colour codes

AccelStepper stepper1(AccelStepper::DRIVER, 18, 5);  //STEP then DIR

const float MS = 16.00;    // Put the Number of Microsteps defined through the 3 pins on the A4988 here. remember to add two decimals: "xx.00"
const float SPR = 200.00;  // Put the Number of Steps your specific stepper takes per revolution. remember to add two decimals: "xx.00"

//The Ratio allows to input the desired position in revolutions instead of steps.
const float Ratio1 = ((MS * (SPR / 360.00)) * 360.00);  //((MicroSteps * (full steps per revolution / full revolution in degrees)) || Decimal places for more precise float values

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//LED Setup

int pinR = 15;
int pinG = 2;
int pinB = 4;

byte ValR = 0; // red value for fadetocolour
byte ValG = 0; // green value for fadetocolour
int counter = 0; //counter for offset for fadetocolour function

bool isWhite = true; // bool for termination check which needs to be fixed later


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// trial rates 

//Pulse

int HR = 125; // trial heart rate
int baserate = 60; //trial base rate

// scalation for switch cases for heart rate.

int IR = (int)HR / baserate * 100; // computes individual pulse index

// Perceived Stress level

float stress = 1.5; // test value
int SR = (int) stress * 100; // stress rate calc

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


// Colour stages for intialisation - to be adjusted later

// Stage 1: 

int R1 = 0;
int G1 = 0;
int BE1 = 255;

// Stage 2:

int R2 = 0;
int G2 = 0;
int B2 = 255;

// Stage 3:

int R3 = 51;
int G3 = 51;
int B3 = 255;

// Stage 4:

int R4 = 102;
int G4 = 102;
int B4 = 255;


// Stage 5: 

int R5 = 255;
int G5 = 255;
int B5 = 255;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//Acceleration

float AC = 3000.00; // init for acceleration
byte stepcount = 1;

// Stress rates have to be implemented later

//float stress = 1.5; // test value
//int SR = (int) (stress * 100); // stress rate calc



//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//Mutex Semaphore init

SemaphoreHandle_t taskMutex;


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

void setup() {
    Serial.begin (115200);

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

      //For LED
     pinMode(pinR, OUTPUT);
     pinMode(pinG, OUTPUT);
     pinMode(pinB, OUTPUT);

  // depending on IR switch state - maybe needs to be adjusted for fine tune later; also refer to IR calc.
  
      switch(IR){
    
      case 50 ... 99:
        ValR = R1;
        ValG = G1;
        analogWrite(pinR, R1);
        analogWrite(pinG, G1);
        analogWrite(pinB, BE1);
        break;

      case 100 ... 129:
        ValR = R2;
        ValG = G2;
        analogWrite(pinR, R2);
        analogWrite(pinG, G2);
        analogWrite(pinB, B2);
        break;

      case 130 ... 159:
        ValR = R3;
        ValG = G3;
        analogWrite(pinR, R3);
        analogWrite(pinG, G3);
        analogWrite(pinB, B3);   
        break;

      case 160 ... 189:
        ValR = R4;
        ValG = G4;
        analogWrite(pinR, R4);
        analogWrite(pinG, G4);
        analogWrite(pinB, B4);    
        break;

      case 190 ... 500:
        ValR = R5;
        ValG = G5;
        analogWrite(pinR, R5);
        analogWrite(pinG, G5);
        analogWrite(pinB, B5);     
        break;
      }
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// for rotation velocity

//    switch(SR){
//
//      case 0 ... 99:
//        AC = 2000.00;
//
//      case 100 ... 199:
//        AC = 3000.00;
//
//      case 200 ... 299:
//        AC = 4000.00;
//
//      case 300 ... 399:
//        AC = 5000.00;
//
//      case 400 ... 500:
//        AC = 6000.00;
//    }
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    //For Motor -> needs to be adjusted for different rotation speeds
    stepper1.setMaxSpeed(2000);
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

    stepper1.run();
    stepper1.moveTo(stepcount * Ratio1);  //go to a new position, in this case always 1 rotation further in same direction
    stepcount = stepcount + 1;            //adjust stepcount accordingly

    xSemaphoreGive(taskMutex);
  }
}

void leds(void *pvParameters) {
  
  while (1) {
    
    xSemaphoreTake(taskMutex, portMAX_DELAY);

    if (isWhite) {
      counter = counter + 15;   // bigger offset for easy checks
      fadetocolour(pinR, pinG);
    } else{
      
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


void fadetocolour (int pinA, int pinB) { //gradually decreases both green and red light so everything turns bluer and bluer
  byte ValA = ValR - counter;
  byte ValB = ValG - counter;
  if (ValA <= 15 || ValB <= 15){ // break condition
    isWhite = false;
  }
  analogWrite(pinA, ValA);
  analogWrite(pinB, ValB);
  }
