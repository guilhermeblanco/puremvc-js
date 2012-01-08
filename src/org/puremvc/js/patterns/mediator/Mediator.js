/**
 * A base <code>Mediator</code> implementation. 
 * 
 * @see org.puremvc.js.core.View
 */
Object.declare('org.puremvc.js.patterns.mediator.Mediator');

/**
 * Constructor.
 *
 * @param mediatorName Mediator name
 * @param view View
 */
org.puremvc.js.patterns.mediator.Mediator = function (mediatorName, view)
{
    org.puremvc.js.patterns.observer.Notifier.call(this);
    
    this._mediatorName = mediatorName || org.puremvc.js.patterns.mediator.Mediator.NAME;
    this._view         = view;
};

Object.extend(org.puremvc.js.patterns.mediator.Mediator, org.puremvc.js.patterns.observer.Notifier);

/**
 * The name of the <code>Mediator</code>. 
 * 
 * <P>
 *   Typically, a <code>Mediator</code> will be written to serve one specific control or group controls 
 *   and so, will not have a need to be dynamically named.
 * </P>
 */
org.puremvc.js.patterns.mediator.Mediator.NAME = 'Mediator';

var _p = org.puremvc.js.patterns.mediator.Mediator.prototype;

// The mediator name
_p._mediatorName = '';

// The view component
_p._view = null;

/**
 * Get the name of the <code>Mediator</code>.
 * 
 * @return string The Mediator name
 */        
_p.getMediatorName = function ()
{    
    return this._mediatorName;
};

/**
 * Set the <code>Mediator</code>'s view component.
 * 
 * @param view The view component
 * 
 * @return void
 */
_p.setViewComponent = function (view)
{
    this._view = view;
};

/**
 * Get the <code>Mediator</code>'s view component.
 * 
 * @return View The view component
 */
_p.getViewComponent = function ()
{    
    return this._view;
};

/**
 * List the <code>Notification</code> names this <code>Mediator</code> is interested in being notified of.
 * 
 * @return Array The list of <code>Notification</code> names 
 */
_p.listNotificationInterests = function () 
{
    return [];
};

/**
 * Handle <code>Notification</code>s.
 * 
 * <P>
 *   Typically this will be handled in a switch statement, with one 'case' entry per <code>Notification</code>
 *   the <code>Mediator</code> is interested in.
 * </P>
 * 
 * @param notification Notification
 * 
 * @return void
 */ 
_p.handleNotification = function (notification)
{
    throw new Error('handleNotification() should be extended on concrete implementations of Mediator');
};

/**
 * Called by the View when the Mediator is about to retrieve notification interests.
 * 
 * @return void
 */ 
_p.onRegisterInitialize = function ()
{
    
};

/**
 * Called by the View when the Mediator is registered
 * 
 * @return void
 */ 
_p.onRegister = function ()
{
    
};

/**
 * Called by the View when the Mediator is removed
 * 
 * @return void
 */ 
_p.onRemove = function ()
{
    
};