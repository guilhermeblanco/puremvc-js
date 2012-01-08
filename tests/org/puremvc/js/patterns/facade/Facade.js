module('org.puremvc.js.patterns.facade.Facade', {
    teardown: function ()
    {
        org.puremvc.js.patterns.facade.Facade.instance = null;

        org.puremvc.js.core.Controller.instance = null;
        org.puremvc.js.core.Model.instance = null;
        org.puremvc.js.core.View.instance = null;
    }
});


test('Test singleton', 1, function () {
    var patterns = org.puremvc.js.patterns,
        facade;

    org.puremvc.js.patterns.facade.Facade.instance = null;

    facade = new patterns.facade.Facade();

    equals(facade, patterns.facade.Facade.getInstance());
});


test('Test multiple creation throws error', 1, function () {
    var patterns = org.puremvc.js.patterns,
        facade;

    try {
        facade   = new patterns.facade.Facade();
        facade   = new patterns.facade.Facade();
    } catch (e) {
        ok(true, e.message);
    }
});


test('Test registerCommand/hasCommand', 2, function () {
    var patterns         = org.puremvc.js.patterns,
        notificationName = 'myNotification',
        facade           = new patterns.facade.Facade(),
        MyCommand;

    MyCommand = CommandMock({
        execute: function () {}
    });

    facade.registerCommand(notificationName, MyCommand);

    equals(true, facade.hasCommand(notificationName));
    equals(false, facade.hasCommand(notificationName + 'invalid'));
});


test('Test removeCommand', 2, function () {
    var patterns         = org.puremvc.js.patterns,
        notificationName = 'myNotification',
        facade           = new patterns.facade.Facade(),
        MyCommand;

    MyCommand = CommandMock({
        execute: function () {}
    });

    facade.registerCommand(notificationName, MyCommand);

    equals(true, facade.hasCommand(notificationName));

    facade.removeCommand(notificationName);

    equals(false, facade.hasCommand(notificationName));
});


test('Test registerProxy', 1, function () {
    var patterns = org.puremvc.js.patterns,
        facade   = new patterns.facade.Facade(),
        MyProxy,
        proxy;

    MyProxy = ProxyMock({
        name: 'MyProxy',
        data: {},
        onRegister: function ()
        {
            ok(true, 'proxy.onRegister() called successfully');
        }
    });

    proxy = new MyProxy();

    facade.registerProxy(proxy);
});


test('Test hasProxy', 3, function () {
    var patterns = org.puremvc.js.patterns,
        facade   = new patterns.facade.Facade(),
        MyProxy,
        proxy;

    MyProxy = ProxyMock({
        name: 'MyProxy',
        data: {},
        onRegister: function ()
        {
            ok(true, 'proxy.onRegister() called successfully');
        }
    });

    proxy = new MyProxy();

    facade.registerProxy(proxy);

    equals(true, facade.hasProxy(proxy.getProxyName()));
    equals(false, facade.hasProxy('invalidProxy'));
});


test('Test retrieveProxy', 3, function () {
    var patterns = org.puremvc.js.patterns,
        facade   = new patterns.facade.Facade(),
        MyProxy,
        proxy;

    MyProxy = ProxyMock({
        name: 'MyProxy',
        data: {},
        onRegister: function ()
        {
            ok(true, 'proxy.onRegister() called successfully');
        }
    });

    proxy = new MyProxy();

    facade.registerProxy(proxy);

    // We cannot check equals(proxy, facade.retrieveProxy(...)) because it falls into a infinite recursion.
    // The reason for that is deep recursion comes from Notifier (parent class of Proxy):
    // - Notifier contains a Facade reference
    // - Facade contains a Model reference
    // - Model contains a reference for all Proxy(ies)
    equals(proxy.getProxyName(), facade.retrieveProxy(proxy.getProxyName()).getProxyName());
    equals(null, facade.retrieveProxy('invalidProxy'));
});


test('Test removeProxy', 3, function () {
    var patterns = org.puremvc.js.patterns,
        facade   = new patterns.facade.Facade(),
        MyProxy,
        proxy,
        removedProxy;

    MyProxy = ProxyMock({
        name: 'MyProxy',
        data: {},
        onRegister: function ()
        {
            ok(true, 'proxy.onRegister() called successfully');
        }
    });

    proxy = new MyProxy();

    facade.registerProxy(proxy);

    removedProxy = facade.removeProxy(proxy.getProxyName());

    equals(proxy.getProxyName(), removedProxy.getProxyName());

    removedProxy = facade.removeProxy('invalidProxy');

    equals(null, removedProxy);
});

test('Test registerMediator', 1, function () {
    var patterns = org.puremvc.js.patterns,
        facade   = new patterns.facade.Facade(),
        MyMediator,
        mediator;

    MyMediator = MediatorMock({
        name: 'MyMediator',
        viewComponent: $(window),
        onRegister: function ()
        {
            ok(true, 'mediator.onRegister() called successfully');
        }
    });

    mediator = new MyMediator();

    facade.registerMediator(mediator);
});


test('Test hasMediator', 2, function () {
    var patterns = org.puremvc.js.patterns,
        facade   = new patterns.facade.Facade(),
        MyMediator,
        mediator;

    MyMediator = MediatorMock({
        name: 'MyMediator',
        viewComponent: $(window)
    });

    mediator = new MyMediator();

    facade.registerMediator(mediator);

    equals(true, facade.hasMediator(mediator.getMediatorName()));
    equals(false, facade.hasMediator(mediator.getMediatorName() + 'invalid'));
});


test('Test retrieveMediator', 3, function () {
    var patterns     = org.puremvc.js.patterns,
        facade       = new patterns.facade.Facade(),
        mediatorName = 'MyMediator',
        MyMediator,
        mediator;

    MyMediator = MediatorMock({
        name: mediatorName,
        viewComponent: $(window)
    });

    mediator = new MyMediator();

    facade.registerMediator(mediator);

    equals('object', typeof facade.retrieveMediator(mediatorName));
    equals(mediator.getMediatorName(), facade.retrieveMediator(mediatorName).getMediatorName());

    equals(null, facade.retrieveMediator(mediatorName + 'invalid'));
});


test('Test removeMediator', 3, function () {
    var patterns = org.puremvc.js.patterns,
        facade   = new patterns.facade.Facade(),
        MyMediator,
        mediator;

    MyMediator = MediatorMock({
        name: 'MyMediator',
        viewComponent: $(window),
        onRemove: function ()
        {
            ok(true, 'mediator.onRegister() called successfully');
        }
    });

    mediator = new MyMediator();

    facade.registerMediator(mediator);

    equals('object', typeof facade.retrieveMediator(mediator.getMediatorName()));

    facade.removeMediator(mediator.getMediatorName());

    equals(null, facade.retrieveMediator(mediator.getMediatorName()));
});


test('Test sendNotification', 2, function () {
    var patterns         = org.puremvc.js.patterns,
        notificationName = 'myNotification',
        notificationBody = { appName: 'MyApp' },
        facade           = new patterns.facade.Facade(),
        MyCommand;

    MyCommand = CommandMock({
        execute: function (notification) {
            equals(notificationName, notification.getName());
            equals(notificationBody, notification.getBody());
        }
    });

    facade.registerCommand(notificationName, MyCommand);
    facade.sendNotification(notificationName, notificationBody, null);
});