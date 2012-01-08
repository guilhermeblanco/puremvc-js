module('org.puremvc.js.core.Model', {
    teardown: function ()
    {
        org.puremvc.js.core.Model.instance = null;
    }
});


test('Test singleton', 1, function () {
    var mvc = org.puremvc.js,
        model;

    org.puremvc.js.core.Model.instance = null;

    model = new mvc.core.Model();

    equals(model, mvc.core.Model.getInstance());
});


test('Test multiple creation throws error', 1, function () {
    var mvc = org.puremvc.js,
        model;

    try {
        model = new mvc.core.Model();
        model = new mvc.core.Model();
    } catch (e) {
        ok(true, e.message);
    }
});


test('Test registerProxy', 1, function () {
    var model = org.puremvc.js.core.Model.getInstance(),
        MyProxy,
        proxy;

    MyProxy = new ProxyMock({
        name:       'myProxy',
        onRegister: function () {
            ok(true, 'proxy.onRegister() called successfully');
        }
    });

    proxy = new MyProxy();

    model.registerProxy(proxy);
});


test('Test hasProxy', 2, function () {
    var model = org.puremvc.js.core.Model.getInstance(),
        MyProxy,
        proxy;

    MyProxy = new ProxyMock({
        name: 'myProxy'
    });

    proxy = new MyProxy();

    model.registerProxy(proxy);

    equals(true, model.hasProxy(proxy.getProxyName()));
    equals(false, model.hasProxy('invalidProxy'));
});


test('Test retrieveProxy', 2, function () {
    var model = org.puremvc.js.core.Model.getInstance(),
        MyProxy,
        proxy;

    MyProxy = new ProxyMock({
        name: 'myProxy'
    });

    proxy = new MyProxy();

    model.registerProxy(proxy);

    equals(proxy, model.retrieveProxy(proxy.getProxyName()));
    equals(null, model.retrieveProxy('invalidProxy'));
});


test('Test removeProxy', 3, function () {
    var model = org.puremvc.js.core.Model.getInstance(),
        MyProxy,
        proxy,
        removedProxy;

    MyProxy = new ProxyMock({
        name:     'myProxy',
        onRemove: function () {
            ok(true, 'proxy.onRemove() called successfully');
        }
    });

    proxy = new MyProxy();

    model.registerProxy(proxy);

    removedProxy = model.removeProxy(proxy.getProxyName());

    equals(proxy, removedProxy);

    removedProxy = model.removeProxy('invalidProxy');

    equals(null, removedProxy);
});