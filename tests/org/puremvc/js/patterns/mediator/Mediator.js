module('org.puremvc.js.core.patterns.mediator.Mediator');


test('Test no name', 2, function () {
    var patterns = org.puremvc.js.patterns,
        view     = {},
        mediator = new patterns.mediator.Mediator(null, view);

    equals(patterns.mediator.Mediator.NAME, mediator.getMediatorName());
    equals(view, mediator.getViewComponent());
});


test('Test full instantiation', 2, function () {
    var patterns     = org.puremvc.js.patterns,
        mediatorName = 'MyMediator',
        view         = {},
        mediator     = new patterns.mediator.Mediator(mediatorName, view);

    equals(mediatorName, mediator.getMediatorName());
    equals(view, mediator.getViewComponent());
});


test('Test set/get view component', 2, function () {
    var patterns  = org.puremvc.js.patterns,
        view      = {},
        otherView = { appName: 'MyApp' },
        mediator  = new patterns.mediator.Mediator(null, view);

    equals(view, mediator.getViewComponent());

    mediator.setViewComponent(otherView);

    equals(otherView, mediator.getViewComponent());
});


test('Test base handleNotification must be extended', 1, function () {
    var patterns     = org.puremvc.js.patterns,
        notification = {},
        view         = {},
        mediator     = new patterns.mediator.Mediator(null, view);

    try {
        mediator.handleNotification(notification);
    } catch (e) {
        ok(true, e.message);
    }
});


test('Test base listNotificationInterests is an empty array', 1, function () {
    var patterns     = org.puremvc.js.patterns,
        notification = {},
        view         = {},
        mediator     = new patterns.mediator.Mediator(null, view);

    equals(0, mediator.listNotificationInterests().length);
});