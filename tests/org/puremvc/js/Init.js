module('org.puremvc.js.Init');


test('Test declared namespaces', 5, function () {
    equals('object', typeof org);
    equals('object', typeof org.puremvc);
    equals('object', typeof org.puremvc.js);
    equals('object', typeof org.puremvc.js.core);
    equals('object', typeof org.puremvc.js.patterns);
});


test('Test Object.extend', 4, function () {
    var Foo, Bar, fooInstance, barInstance;

    Foo = function () {
        this.name = 'Foo';
    }

    Foo.prototype.name = 'Original';

    Bar = function () {
        Foo.call(this);

        this.name = 'Bar';
    }

    Object.extend(Bar, Foo);

    fooInstance = new Foo();
    barInstance = new Bar();

    equals('Foo', fooInstance.name);
    equals('Bar', barInstance.name);

    equals('Original', Foo.prototype.name);
    equals('Original', Bar.prototype.name);
});


test('Test Object.declare basic', 1, function () {
    Object.declare('com.myapp.js');

    equals('object', typeof com.myapp.js);
});


test('Test Object.declare object bind', 1, function () {
    var appName = 'MKX2';

    Object.declare('com.myapp.js', {
        appName: appName
    });

    equals(appName, com.myapp.js.appName);
});


test('Test Object.declare object scope', 1, function () {
    Object.declare('com.myapp');

    Object.declare('helpers.Browser', {
        isIE: function (str)
        {
            return /msie/i.test(navigator.userAgent);
        }
    }, com.myapp);

    equals('function', typeof com.myapp.helpers.Browser.isIE);
});