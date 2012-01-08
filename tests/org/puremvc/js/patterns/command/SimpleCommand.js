module('org.puremvc.js.core.patterns.command.SimpleCommand');


test('Test base execute must be extended', 1, function () {
    var patterns     = org.puremvc.js.patterns,
        command      = new patterns.command.SimpleCommand(),
        notification = {};

    try {
        command.execute(notification);
    } catch (e) {
        ok(true, e.message);
    }
});