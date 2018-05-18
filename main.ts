
/**
  * Enumeration of motors.
  */
enum InventMotor {
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="all"
    All
}

enum InventMotorDir {
  //% block="forward"
  Forward,
  //% block="reverse"
  Reverse
}

enum InventLineSensor {
  //% block="left (P1)"
  Left,
  //% block="right(P0)"
  Right
}

/**
 * Custom blocks
 */
//% weight=10 color=#ea4e1b icon="\uf12e"
namespace invent {

    /**
      * Drive motor(s) forward or reverse.
      *
      * @param motor motor to drive.
      * @param direction direction to drive
      * @param speed speed of motor
      */
    //% blockId="invent_motor" block="drive motor %motor|direction %direction|speed %speed"
    //% weight=100
    export function motor(motor: InventMotor, direction: InventMotorDir, speed: number): void {

        let aSpeed=0
        if (speed > 100) {
            aSpeed = 1023;
        } 
        else if (speed < -100) {
            aSpeed = 1023;
        }
        else {
            if (speed>0){
               aSpeed = (speed*1023) / 100;
            }
            if (speed<0){
               aSpeed = (-speed*1023) / 100;
            }
        }  
        
        if (direction==InventMotorDir.Reverse){
            speed=speed*-1;
        }
 
        if ((motor == InventMotor.Left) || (motor == InventMotor.All)) {
            pins.analogWritePin(AnalogPin.P14, aSpeed);
            if(speed>0){
                pins.digitalWritePin(DigitalPin.P13,0);
            }
            else {
                pins.digitalWritePin(DigitalPin.P13,1);
            }
        }

        if ((motor == InventMotor.Right) || (motor == InventMotor.All)) {
            pins.analogWritePin(AnalogPin.P16, aSpeed);
            if(speed>0){
                pins.digitalWritePin(DigitalPin.P15,1);
            }
            else {
                pins.digitalWritePin(DigitalPin.P15,0);
            }
        }
    }
    
    /** Line sensor global variables
    */
    
    let item = 0
    let time = 0
    let r_min = 0
    let l_min = 0
    let r_max = 0
    let l_max = 0
    let l_thr = 0
    let r_thr = 0
    
    /**
      * Calibrate line sensors on P1 (left) and P0 (right)
      */
    //% blockId="invent_calibrate_line_sensors" block="calibrate line sensors"
    //% weight=100
    export function calibrate_line_sensors(): void {
      l_max = 0
      r_max = 0
      l_min = 1023
      r_min = 1023
      invent.motor(InventMotor.Left, InventMotorDir.Reverse, 50)
      invent.motor(InventMotor.Right, InventMotorDir.Forward, 50)
      time = input.runningTime()
      while (input.runningTime() - time < 1000) {
          item = pins.analogReadPin(AnalogPin.P1)
          if (item > l_max) {
              l_max = item
          }
          if (item < l_min) {
              l_min = item
          }
          item = pins.analogReadPin(AnalogPin.P0)
          if (item > r_max) {
              r_max = item
          }
          if (item < r_min) {
              r_min = item
          }
      }
      invent.motor(InventMotor.Left, InventMotorDir.Forward, 50)
      invent.motor(InventMotor.Right, InventMotorDir.Reverse, 50)
      time = input.runningTime()
      while (input.runningTime() - time < 2000) {
          item = pins.analogReadPin(AnalogPin.P1)
          if (item > l_max) {
              l_max = item
          }
          if (item < l_min) {
              l_min = item
          }
          item = pins.analogReadPin(AnalogPin.P0)
          if (item > r_max) {
              r_max = item
          }
          if (item < r_min) {
              r_min = item
          }
      }
      l_thr = (l_max + l_min) / 2
      r_thr = (r_max + r_min) / 2
      invent.motor(InventMotor.Left, InventMotorDir.Reverse, 100)
      invent.motor(InventMotor.Right, InventMotorDir.Forward, 100)
      basic.pause(400)
      while (pins.analogReadPin(AnalogPin.P0) > r_thr && pins.analogReadPin(AnalogPin.P1) > l_thr) {
          invent.motor(InventMotor.Left, InventMotorDir.Reverse, 40)
          invent.motor(InventMotor.Right, InventMotorDir.Forward, 40)
      }
    
    }
    
    /**
      * Digital Read Line Sensors
      *
      * @param sensor sensor to read
      */
    //% blockId="invent_line_sensor_digital" block="digital read line sensor %sensor"
    //% weight=100
    export function line_sensor_digital(sensor: InventLineSensor): int {
      if (sensor == InventLineSensor.Left){  
       if(pins.analogReadPin(AnalogPin.P1)>l_thr){
         return 1
       }
       else {
        return 0
       }
      } 
      else {
       if(pins.analogReadPin(AnalogPin.P0)>r_thr){
         return 1
       }
       else {
        return 0
       }
      }
    }
     
    /**
      * Analog Read Line Sensors
      *
      * @param sensor sensor to read
      */
    //% blockId="invent_line_sensor_analog" block="analog read line sensor %sensor"
    //% weight=100
    export function line_sensor_analog(sensor: InventLineSensor): int {
      if (sensor == InventLineSensor.Left){  
       l_anl = pins.map(
         pins.analogReadPin(AnalogPin.P1),
         l_min,
         l_max,
         0,
         100
         )
       return l_anl
      } 
      else {
       r_anl = pins.map(
         pins.analogReadPin(AnalogPin.P0),
         r_min,
         r_max,
         0,
         100
         )
       return r_anl
      }
}
}
