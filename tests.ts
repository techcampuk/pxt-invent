{
    // Drive 1000 ms forward
    invent.motor(InventMotor.all, MotorDirection.forward, 100);
    basic.pause(1000);

    // Drive 1000 ms reverse
    invent.motor(InventMotor.all, MotorDirection.reverse, 100);
    basic.pause(1000);

    // Drive 1000 ms forward on left and reverse on right
    invent.motor(InventMotor.left, MotorDirection.forward, 100);
    invent.motor(InventMotor.right, MotorDirection.reverse, 100);
    basic.pause(1000);
}
