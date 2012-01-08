module('org.puremvc.js.core.patterns.observer.Notifier');


test('Test sendNotification', 3, function () {
    var patterns         = org.puremvc.js.patterns,
        notificationName = 'myNotification',
        notificationBody = { appName: 'MyApp' },
        notificationType = 'Foo',
        notifier,
        oldSendNotification;

    // We need to override Facade.sendNotification method to actually test received parameters
    oldSendNotification = patterns.facade.Facade.prototype.sendNotification;

    patterns.facade.Facade.prototype.sendNotification = function (name, body, type)
    {
        equals(notificationName, name);
        equals(notificationBody, body);
        equals(notificationType, type);
    };

    notifier = new patterns.observer.Notifier();
    notifier.sendNotification(notificationName, notificationBody, notificationType);

    // Restore old Facade.sendNotification
    patterns.facade.Facade.prototype.sendNotification = oldSendNotification;
});