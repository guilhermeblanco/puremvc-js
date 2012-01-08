/**
 * A Singleton <code>Model</code> implementation.
 * 
 * <P>
 *   In PureMVC, the <code>Model</code> class provides access to model objects (Proxies) by named lookup. 
 * </P>
 * 
 * <P>
 *   The <code>Model</code> assumes these responsibilities:
 * </P>
 * 
 * <UL>
 *   <LI>Maintain a cache of <code>Proxy</code> instances.</LI>
 *   <LI>Provide methods for registering, retrieving, and removing <code>Proxy</code> instances.</LI>
 * </UL>
 * 
 * <P>
 *   Your application must register <code>Proxy</code> instances with the <code>Model</code>. 
 *   Typically, you use an <code>Command</code> to create and register <code>Proxy</code> instances once 
 *   the <code>Facade</code> has initialized the Core actors.
 * </P>
 *
 * @see org.puremvc.js.patterns.proxy.Proxy Proxy
 */
Object.declare('org.puremvc.js.core.Model');

/**
 * Constructor. 
 * 
 * <P>
 *   This <code>Model</code> implementation is a Singleton, so you should not call the constructor 
 *   directly, but instead call the static Singleton Factory method <code>Model.getInstance()</code>
 * </P>
 * 
 * @throws Error Error if Singleton instance has already been constructed
 */
org.puremvc.js.core.Model = function () 
{
    if (org.puremvc.js.core.Model.instance !== null) {
        throw new Error(org.puremvc.js.core.Model.SINGLETON_MESSAGE);
    }
    
    org.puremvc.js.core.Model.instance = this;
    
    this._proxyMap = {};
    
    this._initializeModel();
};

// Singleton instance
org.puremvc.js.core.Model.instance = null;

// Contant messages
org.puremvc.js.core.Model.SINGLETON_MESSAGE = 'Model Singleton already constructed!';

/**
 * <code>Model</code> Singleton Factory method.
 * 
 * @return Model the Singleton instance of <code>Model</code>
 */
org.puremvc.js.core.Model.getInstance = function () 
{
    if (org.puremvc.js.core.Model.instance === null) {
        org.puremvc.js.core.Model.instance = new org.puremvc.js.core.Model();
    }
    
    return org.puremvc.js.core.Model.instance;
};

var _p = org.puremvc.js.core.Model.prototype;

// Mapping of proxyNames to Proxy instances
_p._proxyMap = null;

/**
 * Initialize the Singleton <code>Model</code> instance.
 * 
 * <P>
 *   Called automatically by the constructor, this is your opportunity to initialize the Singleton
 *   instance in your subclass without overriding the constructor.
 * </P>
 * 
 * @return void
 */
_p._initializeModel = function ()
{
    
};

/**
 * Register an <code>Proxy</code> with the <code>Model</code>.
 * 
 * @param proxy A <code>Proxy</code> to be held by the <code>Model</code>.
 * 
 * @return void
 */
_p.registerProxy = function (proxy)
{
    this._proxyMap[proxy.getProxyName()] = proxy;
    
    if (typeof proxy.onRegister === 'function') {
        proxy.onRegister();
    }
};

/**
 * Retrieve a <code>Proxy</code> from the <code>Model</code>.
 * 
 * @param proxyName
 * 
 * @return Proxy The <code>Proxy</code> instance previously registered with the given <code>proxyName</code>.
 */
_p.retrieveProxy = function (proxyName)
{
    return this._proxyMap[proxyName];
};

/**
 * Check if a Proxy is registered
 * 
 * @param proxyName
 * 
 * @return whether a Proxy is currently registered with the given <code>proxyName</code>.
 */
_p.hasProxy = function (proxyName)
{
    return (typeof this._proxyMap[proxyName] !== 'undefined');
};

/**
 * Remove a <code>Proxy</code> from the <code>Model</code>.
 * 
 * @param proxyName Name of the <code>Proxy</code> instance to be removed.
 * 
 * @return Proxy The <code>Proxy</code> that was removed from the <code>Model</code>.
 */
_p.removeProxy = function (proxyName)
{
    var proxy = null;
    
    if (this.hasProxy(proxyName)) {
        proxy = this.retrieveProxy(proxyName);
        
        this._proxyMap[proxyName] = null;
        delete this._proxyMap[proxyName];
        
        if (typeof proxy.onRemove === 'function') {
            proxy.onRemove();
        }
    }
    
    return proxy;
};