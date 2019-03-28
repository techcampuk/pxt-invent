# Invent Package for Microsoft PXT

This library provides a Microsoft PXT package for Invent, see
https://www.inventblocks.com

# Tech Camp
This library, and the Invent! Robotics system, is produced by Tech Camp. Tech Camp is the UK's original and longest-running engineering and coding Summer camp, with expert tutors studying at the UK's leading institutions. All our courses involve innovative take-home projects not available at any other camp so the learning and fun can continue at home. 

Learn skills in coding, 3D design, electronics, model-making, robotics and much more. Join other creative and like-minded students from around the UK and abroad for an experience like no other. To find out more about our Summer camps and courses, please vist https://www.techcamp.org.uk

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
