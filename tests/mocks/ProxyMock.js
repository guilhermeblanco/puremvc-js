var ProxyMock = function (proto)
{
    var MyProxy = function () {
        org.puremvc.js.patterns.proxy.Proxy.call(this, proto.name, proto.data);
    }, _p;

    Object.extend(MyProxy, org.puremvc.js.patterns.proxy.Proxy);

    _p = MyProxy.prototype;

    _p.onRegister = function ()
    {
        if (typeof proto.onRegister === 'function') {
            proto.onRegister();
        }
    };

    _p.onRemove = function ()
    {
        if (typeof proto.onRemove === 'function') {
            proto.onRemove();
        }
    }

    if (typeof proto.methods === 'object') {
        for (var method in proto.methods) {
            MyProxy.prototype[method] = proto.methods[method];
        }
    }

    return MyProxy;
};