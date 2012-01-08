/**
 * A Base <code>Notifier</code> implementation.
 * 
 * <P>
 *   <code>MacroCommand, Command, Mediator</code> and <code>Proxy</code> all have a need to send 
 *   <code>Notifications</code>.
 * </P>
 * 
 * <P>
 *   The <code>Notifier</code> interface provides a common method called <code>sendNotification</code> 
 *   that relieves implementation code of the necessity to actually construct <code>Notifications</code>.
 * </P>
 * 
 * <P>
 *   The <code>Notifier</code> class, which all of the above mentioned classes extend, provides an 
 *   initialized reference to the <code>Facade</code> Singleton, which is required for the convienience 
 *   method for sending <code>Notifications</code>, but also eases implementation as these classes have 
 *   frequent <code>Facade</code> interactions and usually require access to the facade anyway.
 * </P>
 * 
 * @see org.puremvc.js.patterns.facade.Facade
 * @see org.puremvc.js.patterns.mediator.Mediator
 * @see org.puremvc.js.patterns.proxy.Proxy
 * @see org.puremvc.js.patterns.command.SimpleCommand
 * @see org.puremvc.js.patterns.command.MacroCommand
 */
Object.declare('org.puremvc.js.patterns.observer.Notifier');

org.puremvc.js.patterns.observer.Notifier = function ()
{
    this._initializeFacade();
};

var _p = org.puremvc.js.patterns.observer.Notifier.prototype;

// Façade
_p._facade = null;

/**
 * Initialize the Singleton Façade instance.
 * 
 * <P>
 *   Called automatically by the constructor, this is your opportunity to initialize the Singleton
 *   instance in your subclass without overriding the constructor.
 * </P>
 * 
 * @return void
 */
_p._initializeFacade = function ()
{
    this._facade = org.puremvc.js.patterns.facade.Facade.getInstance();
};

/**
 * Get the Notifier's <code>Facade</code>.
 * 
 * @return org.puremvc.js.patterns.facade.Facade The associated Notifier's Facade
 */
_p.getFacade = function ()
{    
    return this._facade;
};

/**
 * Create and send a <code>Notification</code>.
 * 
 * <P>
 *   Keeps us from having to construct new <code>Notification</code> instances in our implementation code.
 * </P>
 * 
 * @param notificationName The name of the notiification to send
 * @param body The body of the notification (optional)
 * @param type the type of the notification (optional)
 * 
 * @return void
 */ 
_p.sendNotification = function (notificationName, body, type)
{
    this._facade.sendNotification(notificationName, body, type);
};