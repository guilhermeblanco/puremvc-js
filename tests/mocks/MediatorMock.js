var MediatorMock = function (proto)
{
    var MyMediator = function () {
            org.puremvc.js.patterns.mediator.Mediator.call(this, proto.name, proto.viewComponent);
        }, _p;

    Object.extend(MyMediator, org.puremvc.js.patterns.mediator.Mediator);

    _p = MyMediator.prototype;

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
            MyMediator.prototype[method] = proto.methods[method];
        }
    }

    return MyMediator;
};