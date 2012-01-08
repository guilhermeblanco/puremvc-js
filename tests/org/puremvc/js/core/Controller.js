module('org.puremvc.js.core.Controller', {
    teardown: function ()
    {
        org.puremvc.js.core.Controller.instance = null;
        org.puremvc.js.core.View.instance = null;
    }
});


test('Test singleton', 1, function () {
    var mvc        = org.puremvc.js,
        controller;

    org.puremvc.js.core.Controller.instance = null;

    controller = new mvc.core.Controller();

    equals(controller, mvc.core.Controller.getInstance());
});


test('Test registerCommand/hasCommand', 2, function () {
    var mvc              = org.puremvc.js,
        notificationName = 'myNotification',
        controller       = new mvc.core.Controller(),
        Command;

    Command = CommandMock(function () {});

    controller.registerCommand(notificationName, Command);

    equals(true, controller.hasCommand(notificationName));
    equals(false, controller.hasCommand(notificationName + 'invalid'));
});


test('Test removeCommand', 2, function () {
    var mvc              = org.puremvc.js,
        notificationName = 'myNotification',
        controller       = new mvc.core.Controller(),
        Command;

    Command = CommandMock(function () {});

    controller.registerCommand(notificationName, Command);

    equals(true, controller.hasCommand(notificationName));

    controller.removeCommand(notificationName);

    equals(false, controller.hasCommand(notificationName));
});


test('Test executeCommand', 1, function () {
    var mvc              = org.puremvc.js,
        notificationName = 'myNotification',
        notificationBody = { appName: 'MyApp' },
        controller       = new mvc.core.Controller(),
        MyCommand;

    MyCommand = CommandMock({
        execute: function (notification) {
        equals(notificationName, notification.getName());
        }
    });

    controller.registerCommand(notificationName, MyCommand);
    controller.executeCommand(new mvc.patterns.observer.Notification(notificationName, notificationBody, null));
});