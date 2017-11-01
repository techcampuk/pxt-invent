
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

        if (speed > 100) {
            speed = 100;
        } else if (speed < 0) {
            speed = 0;
        }
     
       var sMax = 100;
       var aMax = 1023;

       var percent = speed/sMax;
       var aSpeed = percent * aMax;

        if ((motor == InventMotor.Left) || (motor == InventMotor.All)) {
            pins.analogWritePin(AnalogPin.P14, aSpeed);
            if(direction==InventMotorDir.forward){
                pins.digitalWritePin(DigitalPin.P13,1);
            }
            else {
                pins.digitalWritePin(DigitalPin.P13,0);
            }
        }

        if ((motor == InventMotor.Right) || (motor == InventMotor.All)) {
            pins.analogWritePin(AnalogPin.P16, aSpeed);
            if(direction==InventMotorDir.forward){
                pins.digitalWritePin(DigitalPin.P15,1);
            }
            else {
                pins.digitalWritePin(DigitalPin.P15,0);
            }
        }
    }
}
