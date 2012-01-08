var CommandMock = function (proto)
{
    var MyCommand = function () {
        org.puremvc.js.patterns.command.SimpleCommand.call(this);
    }, _p;

    Object.extend(MyCommand, org.puremvc.js.patterns.command.SimpleCommand);

    _p = MyCommand.prototype;

    _p.execute = function (notification)
    {
        if (typeof proto.execute === 'function') {
            proto.execute(notification);
        }
    };

    if (typeof proto.methods === 'object') {
        for (var method in proto.methods) {
            MyCommand.prototype[method] = proto.methods[method];
        }
    }

    return MyCommand;
};