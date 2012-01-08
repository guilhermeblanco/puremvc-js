/**
 * A base <code>Proxy</code> implementation. 
 * 
 * <P>
 *   In PureMVC, <code>Proxy</code> classes are used to manage parts of the application's data model.
 * </P>
 * 
 * <P>
 *   A <code>Proxy</code> might simply manage a reference to a local data object, in which case interacting 
 *   with it might involve setting and getting of its data in synchronous fashion.
 * </P>
 * 
 * <P>
 *   <code>Proxy</code> classes are also used to encapsulate the application's interaction with remote 
 *   services to save or retrieve data, in which case, we adopt an asynchronous idiom; setting data (or calling 
 *   a method) on the <code>Proxy</code> and listening for a <code>Notification</code> to be sent when the 
 *   <code>Proxy</code> has retrieved the data from the service.
 * </P>
 * 
 * @see org.puremvc.js.core.Model
 */
Object.declare('org.puremvc.js.patterns.proxy.Proxy');

/**
 * Constructor
 * 
 * @param proxyName Proxy name
 * @param data Proxy data object
 */
org.puremvc.js.patterns.proxy.Proxy = function (proxyName, data)
{
    org.puremvc.js.patterns.observer.Notifier.call(this);
    
    this._proxyName = proxyName || org.puremvc.js.patterns.proxy.Proxy.NAME;
    
    if (data !== undefined) {
        this.setData(data);
    }
};

Object.extend(org.puremvc.js.patterns.proxy.Proxy, org.puremvc.js.patterns.observer.Notifier);

org.puremvc.js.patterns.proxy.Proxy.NAME = 'Proxy';

var _p = org.puremvc.js.patterns.proxy.Proxy.prototype;

// The Proxy name
_p._proxyName = '';

// Proxy data
_p._data = null;

/**
 * Get the Proxy name
 *
 * @return string
 */
_p.getProxyName = function ()
{
    return this._proxyName;
};

/**
 * Set the data object
 *
 * @param data Data object
 * 
 * @return void
 */
_p.setData = function (data)
{
    this._data = data;
};

/**
 * Get the data object
 * 
 * @return object Data object
 */
_p.getData = function ()
{
    return this._data;
};

/**
 * Called by the Model when the Proxy is registered
 * 
 * @return void
 */
_p.onRegister = function ()
{
    
};

/**
 * Called by the Model when the Proxy is removed
 * 
 * @return void
 */
_p.onRemove = function ()
{
    
};