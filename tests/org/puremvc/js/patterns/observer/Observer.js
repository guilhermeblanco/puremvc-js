module('org.puremvc.js.core.patterns.observer.Observer');


test('Test setters and getters', 2, function () {
    var patterns      = org.puremvc.js.patterns,
        notifyContext = { appName: 'MyApp' },
        notifyMethod  = function () {},
        observer      = new patterns.observer.Observer(notifyMethod, notifyContext);

    equals(observer.getNotifyContext(), notifyContext);
    equals(observer.getNotifyMethod(), notifyMethod);
});


test('Test notifyObserver', 2, function () {
    var patterns      = org.puremvc.js.patterns,
        notification  = 'MyNotification',
        notifyContext = { appName: 'MyApp' },
        notifyMethod,
        observer;

    notifyMethod  = function (note)
    {
        equals(this, notifyContext);
        equals(note, notification);
    };

    observer = new patterns.observer.Observer(notifyMethod, notifyContext);
    observer.notifyObserver(notification);
});


test('Test compareNotifyContext', 2, function () {
    var patterns      = org.puremvc.js.patterns,
        notifyContext = { appName: 'MyApp' },
        notifyMethod  = function () {},
        observer      = new patterns.observer.Observer(notifyMethod, notifyContext);

    equals(true, observer.compareNotifyContext(notifyContext));
    equals(false, observer.compareNotifyContext(notifyMethod));
});