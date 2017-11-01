{
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
}
