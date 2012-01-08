/**
 * A base <code>Notification</code> implementation.
 * 
 * <P>
 *   PureMVC does not rely upon underlying event models such as the one provided with Flash, 
 *   and ActionScript 3 does not have an inherent event model.
 * </P>
 * 
 * <P>
 *   The Observer Pattern as implemented within PureMVC exists to support event-driven communication 
 *   between the application and the actors of the MVC triad.
 * </P>
 * 
 * <P>
 *   Notifications are not meant to be a replacement for Events in JavaScript. Generally, 
 *   <code>Mediator</code> implementors place event listeners on their view components, which they
 *   then handle in the usual way. This may lead to the broadcast of <code>Notification</code>s to 
 *   trigger <code>Command</code>s or to communicate with other <code>Mediators</code>. 
 *   <code>Proxy</code> and <code>Command</code> instances communicate with each other and 
 *   <code>Mediator</code>s by broadcasting <code>Notification</code>s.
 * </P>
 * 
 * <P>
 *   A key difference between Flash <code>Event</code>s and PureMVC <code>Notification</code>s is that 
 *   <code>Event</code>s follow the 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy 
 *   until some parent component handles the <code>Event</code>, while PureMVC <code>Notification</code>s 
 *   follow a 'Publish/Subscribe' pattern. PureMVC classes need not be related to each other in a parent/child 
 *   relationship in order to communicate with one another using <code>Notification</code>s.
 * </P>
 * 
 * @see org.puremvc.js.patterns.observer.Observer
 */
Object.declare('org.puremvc.js.patterns.observer.Notification');

/**
 * Constructor. 
 * 
 * @param name Name of the <code>Notification</code> instance. (required)
 * @param body The <code>Notification</code> body. (optional)
 * @param type The type of the <code>Notification</code> (optional)
 */
org.puremvc.js.patterns.observer.Notification = function (name, body, type)
{
    this._name = name;
    this._body = body;
    this._type = type;
};

var _p = org.puremvc.js.patterns.observer.Notification.prototype;

// The name of the notification instance
_p._name = '';

// The type of the notification instance
_p._type = '';

// The body of the notification instance
_p._body = null;

/**
 * Get the name of the <code>Notification</code> instance.
 * 
 * @return string The name of the <code>Notification</code> instance.
 */
_p.getName = function ()
{
    return this._name;
};

/**
 * Set the body of the <code>Notification</code> instance.
 * 
 * @param body Notification body object
 * 
 * @return void
 */
_p.setBody = function (body)
{
    this._body = body;
};

/**
 * Get the body of the <code>Notification</code> instance.
 * 
 * @return object The body object. 
 */
_p.getBody = function ()
{
    return this._body;
};

/**
 * Set the type of the <code>Notification</code> instance.
 * 
 * @param type Notification type
 * 
 * @return void
 */
_p.setType = function (type)
{
    this._type = type;
};

/**
 * Get the type of the <code>Notification</code> instance.
 * 
 * @return string The Notification type  
 */
_p.getType = function ()
{
    return this._type;
};

/**
 * Get the string representation of the <code>Notification</code> instance.
 * 
 * @return string String representation of the <code>Notification</code> instance.
 */
_p.toString = function ()
{
    var msg = 'Notification Name: ' + this.getName();
    
    msg += "\r\nBody:" + ((this._body === null) ? "null" : this._body.toString());
    msg += "\r\nType:" + ((this._type === null) ? "null" : this._type);
    
    return msg;
};