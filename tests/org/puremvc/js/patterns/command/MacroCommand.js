module('org.puremvc.js.core.patterns.command.MacroCommand');


test('Test execute() of SubCommands are called', 2, function () {
    var patterns      = org.puremvc.js.patterns,
        command       = new patterns.command.MacroCommand(),
        notification  = {},
        SimpleCommand;

    SimpleCommand = function ()
    {
        // Do nothing
    };

    SimpleCommand.prototype.execute = function (n)
    {
        equals(notification, n);

        ok(true, 'execute() of SubCommand was called');
    };

    command.addSubCommand(SimpleCommand);
    command.execute(notification);
});