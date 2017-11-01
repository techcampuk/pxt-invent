# Invent Package for Microsoft PXT

This library provides a Microsoft PXT package for Invent, see
https://www.invent-ed.uk.

## Driving the motor

Use `invent.motor(..)` to drive motor either forward or reverse. The value
indicates speed and is between `0` to `100`. Direction sets forwards or reverse.

```blocks
// Drive 1000 ms forward
invent.motor(InventMotor.all, forwards, 100);
basic.pause(1000);

// Drive 1000 ms reverse
invent.motor(InventMotor.all, reverse, 100);
basic.pause(1000);

// Drive 1000 ms forward on left and reverse on right
invent.motor(InventMotor.left, forwards, 100);
invent.motor(InventMotor.right, reverse, 100);
basic.pause(1000);
```

## Supported targets

* for PXT/microbit
