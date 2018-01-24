
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
}
