/**
 * A base <code>Observer</code> implementation.
 * 
 * <P> 
 *   An <code>Observer</code> is an object that encapsulates information about an interested object 
 *   with a method that should be called when a particular <code>INotification</code> is broadcast. 
 * </P>
 * 
 * <P>
 *   In PureMVC, the <code>Observer</code> class assumes these responsibilities:
 *   
 *   <UL>
 *     <LI>Encapsulate the notification (callback) method of the interested object.</LI>
 *     <LI>Encapsulate the notification context (this) of the interested object.</LI>
 *     <LI>Provide methods for setting the notification method and context.</LI>
 *     <LI>Provide a method for notifying the interested object.</LI>
 *   </UL>
 * </P>
 * 
 * @see org.puremvc.js.core.View
 * @see org.puremvc.js.patterns.observer.Notification
 */
Object.declare('org.puremvc.js.patterns.observer.Observer');

/**
 * Constructor. 
 * 
 * <P>
 *   The notification method on the interested object should take one parameter of type <code>Notification</code>
 * </P>
 * 
 * @param notifyMethod The notification method of the interested object
 * @param notifyContext The notification context of the interested object
 */
org.puremvc.js.patterns.observer.Observer = function (notifyMethod, notifyContext)
{
    this.setNotifyMethod(notifyMethod);
    this.setNotifyContext(notifyContext);
};

var _p = org.puremvc.js.patterns.observer.Observer.prototype;

// Observer notify method
_p._notify = null;

// Observer context
_p._context = null;

/**
 * Set the notification method.
 * 
 * <P>
 *   The notification method should take one parameter of type <code>Notification</code>.
 * </P>
 * 
 * @param notifyMethod The notification (callback) method of the interested object.
 * 
 * @return void
 */
_p.setNotifyMethod = function (notifyMethod)
{
    this._notify = notifyMethod;
};

/**
 * Get the notification method.
 * 
 * @return function The notification (callback) method of the interested object.
 */
_p.getNotifyMethod = function ()
{
    return this._notify;
};

/**
 * Set the notification context.
 * 
 * @param notifyContext The notification context (this) of the interested object.
 * 
 * @return void
 */
_p.setNotifyContext = function (notifyContext)
{
    this._context = notifyContext;
};

/**
 * Get the notification context.
 * 
 * @return object The notification context (<code>this</code>) of the interested object.
 */
_p.getNotifyContext = function ()
{
    return this._context;
};

/**
 * Notify the interested object.
 * 
 * @param notification The <code>Notification</code> to pass to the interested object's notification method.
 * 
 * @return void
 */
_p.notifyObserver = function (notification)
{
    this.getNotifyMethod().apply(this.getNotifyContext(), [notification]);
};

/**
 * Compare an object to the notification context. 
 * 
 * @param obj The object to compare
 * 
 * @return boolean Indicating if the object and the notification context are the same
 */
_p.compareNotifyContext = function (obj)
{
    return (this._context === obj);
};