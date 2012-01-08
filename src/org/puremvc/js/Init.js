var org = {
        puremvc: {
            js: {
                core: {},
                patterns: {}
            }
        }
    },
    Relegate = {};

Object.extend = function (child, parent)
{
    var tmp = function () {};

    tmp.prototype   = parent.prototype;

    child.superClass = parent.prototype;
    child.prototype  = new tmp();

    child.prototype.constructor = child;
};

Object.declare = function (fqcn, obj, scope)
{
    var parts = fqcn.split('.'),
        curPart,
        curScope,
        curObj;

    scope = scope || window;
    obj   = obj || {};

    curScope = scope;

    while ((curPart = parts.shift()) !== undefined) {
        curObj = (parts.length > 0)
            ? ((typeof curScope[curPart] !== 'undefined') ? curScope[curPart] : {})
            : obj;

        curScope[curPart] = curObj;

        curScope = curScope[curPart];
    }

    return curScope;
};

Relegate.create = function (scope, func)
{
    var ctorParams = [],
        i, iLength;

    for (i = 2, iLength = arguments.length; i < iLength; i += 1) {
        ctorParams.push(arguments[i]);
    }

    return function ()
    {
        var funcParams = [],
            j, jLength;

        for (j = 0, jLength = arguments.length; j < jLength; j += 1) {
            funcParams.push(arguments[j]);
        }

        return func.apply(scope, funcParams.concat(ctorParams));
    };
};

Date.fromISO8601 = function (str)
{
    var regexp = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/,
        date   = new Date(),
        offset,
        match;

    if ( ! str.toString().match(new RegExp(regexp))) {
        date.setTime(Date.parse(str));

        return date;
    }

    match  = str.match(new RegExp(regexp));
    offset = 0;

    date.setUTCDate(1);
    date.setUTCFullYear(parseInt(match[1],10));
    date.setUTCMonth(parseInt(match[3],10) - 1);
    date.setUTCDate(parseInt(match[5],10));
    date.setUTCHours(parseInt(match[7],10));
    date.setUTCMinutes(parseInt(match[9],10));
    date.setUTCSeconds(parseInt(match[11],10));
    date.setUTCMilliseconds((match[12]) ? parseFloat(match[12]) * 1000 : 0);

    if (match[13] != 'Z') {
        offset = (match[15] * 60) + parseInt(match[17],10);
        offset *= ((match[14] == '-') ? -1 : 1);

        date.setTime(date.getTime() - offset * 60 * 1000);
    }

    return date;
};

Object.declare('org.puremvc.js.Init', function (d, path) {
    var lastPathChar   = path.substr(path.length - 1),
        scriptOpenTag  = '<script type="text/javascript" src="',
        scriptCloseTag = '"></script>',
        puremvcPath    = ((lastPathChar === '/' || lastPathChar === '\\') ? path : path + '/'),
        puremvcFiles   = [
            'org/puremvc/js/patterns/observer/Notifier.js',
            'org/puremvc/js/patterns/observer/Notification.js',
            'org/puremvc/js/patterns/observer/Observer.js',
            'org/puremvc/js/patterns/command/SimpleCommand.js',
            'org/puremvc/js/patterns/command/MacroCommand.js',
            'org/puremvc/js/patterns/mediator/Mediator.js',
            'org/puremvc/js/patterns/proxy/Proxy.js',
            'org/puremvc/js/patterns/facade/Facade.js',
            'org/puremvc/js/core/Model.js',
            'org/puremvc/js/core/View.js',
            'org/puremvc/js/core/Controller.js',
        ],
        filesLength = puremvcFiles.length,
        i;

    for (i = 0; i < filesLength; i = i + 1) {
        d.write(scriptOpenTag + puremvcPath + puremvcFiles[i] + scriptCloseTag);
    }
});