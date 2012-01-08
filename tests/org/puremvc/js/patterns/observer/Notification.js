module('org.puremvc.js.core.patterns.observer.Notification');


test('Test getters after instantiation', 3, function () {
    var patterns         = org.puremvc.js.patterns,
        notificationName = 'myNotification',
        notificationBody = { appName: 'MyApp' },
        notificationType = 'Foo',
        notification     = new patterns.observer.Notification(notificationName, notificationBody, notificationType);

    equals(notification.getName(), notificationName);
    equals(notification.getBody(), notificationBody);
    equals(notification.getType(), notificationType);
});


test('Test string representation', 3, function () {
    var patterns         = org.puremvc.js.patterns,
        notificationName = 'myNotification',
        notificationBody = { appName: 'MyApp' },
        notificationType = 'Foo',
        notification     = new patterns.observer.Notification(notificationName, notificationBody, notificationType),
        strNotification  = String(notification);

    equals(true, strNotification.indexOf(notificationName) !== -1);
    equals(true, strNotification.indexOf(String(notificationBody)) !== -1);
    equals(true, strNotification.indexOf(notificationType) !== -1);
});