module('org.puremvc.js.core.patterns.proxy.Proxy');


test('Test no arguments', 2, function () {
    var patterns = org.puremvc.js.patterns,
        proxy    = new patterns.proxy.Proxy();

    equals(patterns.proxy.Proxy.NAME, proxy.getProxyName());
    equals(null, proxy.getData());
});


test('Test name', 2, function () {
    var patterns  = org.puremvc.js.patterns,
        proxyName = 'MyProxy',
        proxy     = new patterns.proxy.Proxy(proxyName);

    equals(proxyName, proxy.getProxyName());
    equals(null, proxy.getData());
});


test('Test data', 2, function () {
    var patterns  = org.puremvc.js.patterns,
        proxyName = 'MyProxy',
        proxyData = { appName: 'MyApp' },
        proxy     = new patterns.proxy.Proxy(proxyName, proxyData);

    equals(proxyName, proxy.getProxyName());
    equals(proxyData, proxy.getData());
});


test('Test set/get data', 3, function () {
    var patterns  = org.puremvc.js.patterns,
        proxyName = 'MyProxy',
        proxyData = { appName: 'MyApp' },
        proxy     = new patterns.proxy.Proxy(proxyName);

    equals(proxyName, proxy.getProxyName());
    equals(null, proxy.getData());

    proxy.setData(proxyData);

    equals(proxyData, proxy.getData());
});