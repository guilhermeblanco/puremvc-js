/**
 * A Singleton <code>Controller</code> implementation.
 * 
 * <P>
 *   In PureMVC, the <code>Controller</code> class follows the 'Command and Controller' strategy, and assumes 
 *   these responsibilities:
 * 
 *   <UL>
 *     <LI> 
 *       Remembering which <code>Command</code>s are intended to handle which <code>Notifications</code>.
 *     </LI>
 *     
 *     <LI>
 *       Registering itself as an <code>Observer</code> with the <code>View</code> for each 
 *       <code>Notification</code> that it has an <code>Command</code> mapping for.
 *     </LI>
 *     
 *     <LI>
 *       Creating a new instance of the proper <code>Command</code> to handle a given <code>Notification</code> 
 *       when notified by the <code>View</code>.
 *     </LI>
 *     
 *     <LI>
 *       Calling the <code>Command</code>'s <code>execute</code> method, passing in the <code>Notification</code>.
 *     </LI> 
 *   </UL>
 * </P>
 * 
 * <P>
 *   Your application must register <code>Command</code>s with the Controller.
 * </P>
 * 
 * <P>
 *   The simplest way is to subclass <code>Facade</code>, and use its <code>_initializeController</code> method 
 *   to add your registrations. 
 * </P>
 * 
 * @see org.puremvc.js.core.View
 * @see org.puremvc.js.patterns.observer.Observer
 * @see org.puremvc.js.patterns.observer.Notification
 * @see org.puremvc.js.patterns.command.SimpleCommand
 * @see org.puremvc.js.patterns.command.MacroCommand
 */
Object.declare('org.puremvc.js.core.Controller');

/**
 * Constructor. 
 * 
 * <P>
 *   This <code>Controller</code> implementation is a Singleton, so you should not call the constructor 
 *   directly, but instead call the static Singleton Factory method <code>Controller.getInstance()</code>
 * </P>
 * 
 * @throws Error Error if Singleton instance has already been constructed
 */
org.puremvc.js.core.Controller = function () 
{
    if (org.puremvc.js.core.Controller.instance !== null) {
        throw new Error(org.puremvc.js.core.Controller.SINGLETON_MESSAGE);
    }
    
    org.puremvc.js.core.Controller.instance = this;
    
    this._commandMap = {};
    
    this._initializeController();
};

// Singleton instance
org.puremvc.js.core.Controller.instance = null;

// Contant messages
org.puremvc.js.core.Controller.SINGLETON_MESSAGE = 'Controller Singleton already constructed!';

/**
 * <code>Controller</code> Singleton Factory method.
 * 
 * @return Controller the Singleton instance of <code>Controller</code>
 */
org.puremvc.js.core.Controller.getInstance = function () 
{
    if (org.puremvc.js.core.Controller.instance === null) {
        org.puremvc.js.core.Controller.instance = new org.puremvc.js.core.Controller();
    }
    
    return org.puremvc.js.core.Controller.instance;
};

var _p = org.puremvc.js.core.Controller.prototype;

// Mapping of Notification names to Command Class references
_p._commandMap = null;

// Local reference to View 
_p._view = null;

/**
 * Initialize the Singleton <code>Controller</code> instance.
 * 
 * <P>Called automatically by the constructor.</P> 
 * 
 * <P>Note that if you are using a subclass of <code>View</code>
 * in your application, you should <i>also</i> subclass <code>Controller</code>
 * and override the <code>_initializeController</code> method in the 
 * following way:</P>
 * 
 * <listing>
 *        // ensure that the Controller is talking to my View implementation
 *        _p._initializeController = function ()
 *        {
 *            this._view = MyView.getInstance();
 *        };
 * </listing>
 * 
 * @return void
 */
_p._initializeController = function ()
{
    this._view = org.puremvc.js.core.View.getInstance();
};

/**
 * If an <code>Command</code> has previously been registered to handle a the given 
 * <code>Notification</code>, then it is executed.
 * 
 * @param notification <code>Notification</code>
 * 
 * @return void
 */
_p.executeCommand = function (notification)
{
    var notificationName = notification.getName(),
        commandClassRef, 
        commandInstance;
    
    if ( ! this.hasCommand(notificationName)) {
        return;
    }
    
    commandClassRef = this._commandMap[notificationName],
    commandInstance = new commandClassRef();
    
    commandInstance.execute(notification);
};

/**
 * Register a particular <code>Command</code> class as the handler for a particular 
 * <code>Notification</code>.
 * 
 * <P>
 *   If an <code>Command</code> has already been registered to handle <code>Notification</code>s 
 *   with this name, it is no longer used, the new <code>Command</code> is used instead.
 * </P>
 * 
 * <P>
 *   The Observer for the new ICommand is only created if this the first time an ICommand has been 
 *   regisered for this Notification name.
 * </P>
 * 
 * @param notificationName the name of the <code>Notification</code>
 * @param commandClassRef the <code>Class</code> of the <code>Command</code>
 * 
 * @return void
 */
_p.registerCommand = function (notificationName, commandClassRef)
{
    if ( ! this.hasCommand(notificationName)) {
        this._view.registerObserver(
            notificationName, 
            new org.puremvc.js.patterns.observer.Observer(this.executeCommand, this)
        );
    }
    
    this._commandMap[notificationName] = commandClassRef;
};

/**
 * Check if a Command is registered for a given Notification 
 * 
 * @param notificationName
 * 
 * @return boolean Whether a Command is currently registered for the given <code>notificationName</code>.
 */
_p.hasCommand = function (notificationName)
{
    return (typeof this._commandMap[notificationName] !== 'undefined');
};

/**
 * Remove a previously registered <code>Command</code> to <code>Notification</code> mapping.
 * 
 * @param notificationName The name of the <code>Notification</code> to remove the <code>Command</code> mapping for.
 * 
 * @return void
 */
_p.removeCommand = function (notificationName)
{
    // If the Command is registered...
    if (this.hasCommand(notificationName)) {
        // Remove the observer
        this._view.removeObserver(notificationName, this);
        
        // Remove the command
        this._commandMap[notificationName] = null;
        delete this._commandMap[notificationName];
    }
};