module('org.puremvc.js.core.View', {
    teardown: function ()
    {
        org.puremvc.js.core.View.instance = null;
    }
});


test('Test singleton', 1, function () {
    var mvc  = org.puremvc.js,
        view;

    org.puremvc.js.core.View.instance = null;

    view = new mvc.core.View();

    equals(view, mvc.core.View.getInstance());
});


test('Test registerObserver/notifyObserver', 2, function () {
    var mvc              = org.puremvc.js,
        notificationName = 'myNotification',
        notifyContext    = { appName: 'MyApp' },
        notifyMethod,
        view             = new mvc.core.View();

    notifyMethod = function (notification)
    {
        equals(notificationName, notification.getName());
        equals(notifyContext, this);
    };

    view.registerObserver(notificationName, new mvc.patterns.observer.Observer(notifyMethod, notifyContext));

    view.notifyObservers(new org.puremvc.js.patterns.observer.Notification(notificationName, {}, null));
});


test('Test removeObserver', 1, function () {
    var mvc              = org.puremvc.js,
        notificationName = 'myNotification',
        notifyContext    = { appName: 'MyApp' },
        notifyMethod,
        view             = new mvc.core.View();

    notifyMethod = function (notification)
    {
        ok(false, 'Observer should be removed when calling removeObserver');
    };

    view.registerObserver(notificationName, new mvc.patterns.observer.Observer(notifyMethod, notifyContext));
    view.removeObserver(notificationName, notifyContext);

    view.notifyObservers(new mvc.patterns.observer.Notification(notificationName, {}, null));

    ok(true);
});


test('Test mediator.onRegister', 1, function () {
    var mvc           = org.puremvc.js,
        mediatorName  = 'Mymediator',
        view          = new mvc.core.View(),
        mediator;

    mediator = new mvc.patterns.mediator.Mediator(mediatorName, view);

    mediator.onRegister = function () {
        ok(true);
    };

    view.registerMediator(mediator);
});


test('Test retrieveMediator', 3, function () {
    var mvc           = org.puremvc.js,
        mediatorName  = 'Mymediator',
        view          = new mvc.core.View(),
        mediator;

    mediator = new mvc.patterns.mediator.Mediator(mediatorName, view);

    view.registerMediator(mediator);

    equals('object', typeof view.retrieveMediator(mediatorName));
    equals(mediator.getMediatorName(), view.retrieveMediator(mediatorName).getMediatorName());

    equals(null, view.retrieveMediator(mediatorName + 'invalid'));
});


test('Test removeMediator', 2, function () {
    var mvc           = org.puremvc.js,
        mediatorName  = 'Mymediator',
        view          = new mvc.core.View(),
        mediator;

    mediator = new mvc.patterns.mediator.Mediator(mediatorName, view);

    view.registerMediator(mediator);

    equals('object', typeof view.retrieveMediator(mediatorName));

    view.removeMediator(mediatorName);

    equals(null, view.retrieveMediator(mediatorName));
});


test('Test mediator.onRemove', 1, function () {
    var mvc           = org.puremvc.js,
        mediatorName  = 'Mymediator',
        view          = new mvc.core.View(),
        mediator;

    mediator = new mvc.patterns.mediator.Mediator(mediatorName, view);

    mediator.onRemove = function () {
        ok(true);
    }

    view.registerMediator(mediator);

    view.removeMediator(mediatorName);
});


test('Test hasMediator', 2, function () {
    var mvc           = org.puremvc.js,
        mediatorName  = 'Mymediator',
        view          = new mvc.core.View(),
        mediator;

    mediator = new mvc.patterns.mediator.Mediator(mediatorName, view);

    view.registerMediator(mediator);

    equals(true, view.hasMediator(mediatorName));
    equals(false, view.hasMediator(mediatorName + 'invalid'));
});