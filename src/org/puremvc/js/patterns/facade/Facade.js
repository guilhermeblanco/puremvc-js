/**
 * A base Singleton <code>Facade</code> implementation.
 * 
 * <P>
 *   In PureMVC, the <code>Facade</code> class assumes these responsibilities:
 *   
 *   <UL>
 *     <LI>Initializing the <code>Model</code>, <code>View</code> and <code>Controller</code> Singletons.</LI> 
 *     <LI>Providing all the methods defined by the <code>Model, View, & Controller</code> interfaces.</LI>
 *     <LI>
 *       Providing the ability to override the specific <code>Model</code>, 
 *       <code>View</code> and <code>Controller</code> Singletons created.
 *     </LI> 
 *     <LI>
 *       Providing a single point of contact to the application for registering <code>Commands</code> and 
 *       notifying <code>Observers</code>
 *     </LI>
 *   </UL>
 * </P>
 * 
 * <P>
 *   Example usage:
 * 
 *   <listing>
 *     public class MyFacade extends Facade
 *     {
 *         // Notification constants. The Facade is the ideal
 *         // location for these constants, since any part
 *         // of the application participating in PureMVC 
 *         // Observer Notification will know the Facade.
 *         public static const GO_COMMAND:String = "go";
 *         
 *         // Override Singleton Factory method 
 *         public static function getInstance() : MyFacade {
 *             if (instance == null) instance = new MyFacade();
 *             return instance as MyFacade;
 *         }
 *         
 *         // optional initialization hook for Facade
 *         override public function initializeFacade() : void {
 *             super.initializeFacade();
 *             // do any special subclass initialization here
 *         }
 *    
 *         // optional initialization hook for Controller
 *         override public function initializeController() : void {
 *             // call super to use the PureMVC Controller Singleton. 
 *             super.initializeController();
 *  
 *             // Otherwise, if you're implmenting your own
 *             // IController, then instead do:
 *             // if ( controller != null ) return;
 *             // controller = MyAppController.getInstance();
 *         
 *             // do any special subclass initialization here
 *             // such as registering Commands
 *             registerCommand( GO_COMMAND, com.me.myapp.controller.GoCommand )
 *         }
 *    
 *         // optional initialization hook for Model
 *         override public function initializeModel() : void {
 *             // call super to use the PureMVC Model Singleton. 
 *             super.initializeModel();
 * 
 *             // Otherwise, if you're implmenting your own
 *             // IModel, then instead do:
 *             // if ( model != null ) return;
 *             // model = MyAppModel.getInstance();
 *          
 *             // do any special subclass initialization here
 *             // such as creating and registering Model proxys
 *             // that don't require a facade reference at
 *             // construction time, such as fixed type lists
 *             // that never need to send Notifications.
 *             regsiterProxy( new USStateNamesProxy() );
 *             
 *             // CAREFUL: Can't reference Facade instance in constructor 
 *             // of new Proxys from here, since this step is part of
 *             // Facade construction!  Usually, Proxys needing to send 
 *             // notifications are registered elsewhere in the app 
 *             // for this reason.
 *         }
 *    
 *         // optional initialization hook for View
 *         override public function initializeView() : void {
 *             // call super to use the PureMVC View Singleton. 
 *             super.initializeView();
 * 
 *             // Otherwise, if you're implmenting your own
 *             // IView, then instead do:
 *             // if ( view != null ) return;
 *             // view = MyAppView.getInstance();
 *         
 *             // do any special subclass initialization here
 *             // such as creating and registering Mediators
 *             // that do not need a Facade reference at construction
 *             // time.
 *             registerMediator( new LoginMediator() ); 
 * 
 *             // CAREFUL: Can't reference Facade instance in constructor 
 *             // of new Mediators from here, since this is a step
 *             // in Facade construction! Usually, all Mediators need 
 *             // receive notifications, and are registered elsewhere in 
 *             // the app for this reason.
 *         }
 *     }
 *   </listing>
 * </P>
 * 
 * @see org.puremvc.js.core.Model
 * @see org.puremvc.js.core.View
 * @see org.puremvc.js.core.Controller
 * @see org.puremvc.js.patterns.observer.Notification
 * @see org.puremvc.js.patterns.mediator.Mediator
 * @see org.puremvc.js.patterns.proxy.Proxy
 * @see org.puremvc.js.patterns.command.SimpleCommand
 * @see org.puremvc.js.patterns.command.MacroCommand
 */
Object.declare('org.puremvc.js.patterns.facade.Facade');

/**
 * Constructor. 
 * 
 * <P>
 *   This <code>IFacade</code> implementation is a Singleton, so you should not call the constructor 
 *   directly, but instead call the static Singleton Factory method <code>Facade.getInstance()</code>
 * </P>
 * 
 * @throws Error Error if Singleton instance has already been constructed
 */
org.puremvc.js.patterns.facade.Facade = function ()
{
    if (org.puremvc.js.patterns.facade.Facade.instance !== null) {
        throw new Error(org.puremvc.js.patterns.facade.Facade.SINGLETON_MESSAGE);
    }
    
    org.puremvc.js.patterns.facade.Facade.instance = this;
    
    this._initializeFacade();
};

// Singleton instance
org.puremvc.js.patterns.facade.Facade.instance = null;

// Contant messages
org.puremvc.js.patterns.facade.Facade.SINGLETON_MESSAGE = 'Facade Singleton already constructed!';

/**
 * Facade Singleton Factory method
 * 
 * @return Facade The Singleton instance of the Facade
 */
org.puremvc.js.patterns.facade.Facade.getInstance = function () 
{
    if (org.puremvc.js.patterns.facade.Facade.instance === null) {
        org.puremvc.js.patterns.facade.Facade.instance = new org.puremvc.js.patterns.facade.Facade();
    }
    
    return org.puremvc.js.patterns.facade.Facade.instance;
};

var _p = org.puremvc.js.patterns.facade.Facade.prototype;

// Private references to Model, View and Controller
_p._controller = null;

_p._model = null;

_p._view = null;

/**
 * Initialize the Singleton <code>Facade</code> instance.
 * 
 * <P>
 *   Called automatically by the constructor. Override in your subclass to do any subclass specific 
 *   initializations. Be sure to call <code>super.initializeFacade()</code>, though.
 * </P>
 * 
 * @return void
 */
_p._initializeFacade = function ()
{
    this._initializeModel();
    this._initializeController();
    this._initializeView();
};

/**
 * Initialize the <code>Controller</code>.
 * 
 * <P>
 *   Called by the <code>initializeFacade</code> method. Override this method in your subclass of 
 *   <code>Facade</code> if one or both of the following are true:
 *   
 *   <UL>
 *     <LI>You wish to initialize a different <code>Controller</code>.</LI>
 *     <LI>You have <code>Commands</code> to register with the <code>Controller</code> at startup.</code>.</LI>          
 *   </UL>
 *   
 *   If you don't want to initialize a different <code>IController</code>, call 
 *   <code>super.initializeController()</code> at the beginning of your method, then register <code>Command</code>s.
 * </P>
 * 
 * @return void
 */
_p._initializeController = function ()
{
    if (this._controller === null) {
        this._controller = org.puremvc.js.core.Controller.getInstance();
    }
};

/**
 * Initialize the <code>Model</code>.
 * 
 * <P>
 *   Called by the <code>initializeFacade</code> method. Override this method in your subclass of 
 *   <code>Facade</code> if one or both of the following are true:
 *   
 *   <UL>
 *     <LI> You wish to initialize a different <code>Model</code>.</LI>
 *     <LI> 
 *       You have <code>Proxy</code>s to register with the Model that do not retrieve a reference 
 *       to the Facade at construction time.</code>
 *     </LI> 
 *   </UL>
 *   
 *   If you don't want to initialize a different <code>IModel</code>, call <code>super.initializeModel()</code> 
 *   at the beginning of your method, then register <code>Proxy</code>s.
 * </P>
 * 
 * <P>
 *   Note: This method is <i>rarely</i> overridden; in practice you are more likely to use a 
 *   <code>Command</code> to create and register <code>Proxy</code>s with the <code>Model</code>, 
 *   since <code>Proxy</code>s with mutable data will likely need to send <code>Notification</code>s 
 *   and thus will likely want to fetch a reference to the <code>Facade</code> during their construction. 
 * </P>
 * 
 * @return void
 */
_p._initializeModel = function ()
{
    if (this._model === null) {
        this._model = org.puremvc.js.core.Model.getInstance();
    }
};

/**
 * Retrieve the associated Model to this Facade.
 * 
 * @return orm.puremvc.js.core.Model
 */
_p.getModel = function ()
{
    return this._model;
};

/**
 * Initialize the <code>View</code>.
 * 
 * <P>
 *   Called by the <code>initializeFacade</code> method. Override this method in your subclass of 
 *   <code>Facade</code> if one or both of the following are true:
 *   
 *   <UL>
 *     <LI> You wish to initialize a different <code>View</code>.</LI>
 *     <LI> You have <code>Observers</code> to register with the <code>View</code></LI>
 *   </UL>
 *   
 *   If you don't want to initialize a different <code>View</code>, call <code>super.initializeView()</code>
 *   at the beginning of your method, then register <code>Mediator</code> instances.
 * </P>
 * 
 * <P>
 *   Note: This method is <i>rarely</i> overridden; in practice you are more likely to use a 
 *   <code>Command</code> to create and register <code>Mediator</code>s with the <code>View</code>, 
 *   since <code>Mediator</code> instances will need to send <code>Notification</code>s and thus will 
 *   likely want to fetch a reference to the <code>Facade</code> during their construction. 
 * </P>
 * 
 * @return void
 */
_p._initializeView = function ()
{
    if (this._view === null) {
        this._view = org.puremvc.js.core.View.getInstance();
    }
};

/**
 * Retrieve the associated View to this Facade.
 * 
 * @return orm.puremvc.js.core.View
 */
_p.getView = function ()
{
    return this._view;
};

/**
 * Register an <code>Command</code> with the <code>Controller</code> by Notification name.
 * 
 * @param notificationName the name of the <code>Notification</code> to associate the <code>Command</code> with
 * @param commandClassRef a reference to the Class of the <code>Command</code>
 * 
 * @return void
 */
_p.registerCommand = function (notificationName, commandClassRef)
{
    this._controller.registerCommand(notificationName, commandClassRef);
};

/**
 * Remove a previously registered <code>Command</code> to <code>Notification</code> mapping from the Controller.
 * 
 * @param notificationName the name of the <code>Notification</code> to remove the <code>Command</code> mapping for
 * 
 * @return void
 */
_p.removeCommand = function (notificationName)
{
    this._controller.removeCommand(notificationName);
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
    return this._controller.hasCommand(notificationName);
};

/**
 * Register a <code>Proxy</code> with the <code>Model</code> by name.
 * 
 * @param proxy the <code>Proxy</code> instance to be registered with the <code>Model</code>.
 * 
 * @return void
 */
_p.registerProxy = function (proxy)
{
    this._initializeModel();
    
    this._model.registerProxy(proxy);
};

/**
 * Retrieve a <code>Proxy</code> from the <code>Model</code> by name.
 * 
 * @param proxyName The name of the proxy to be retrieved.
 * 
 * @return Proxy The <code>Proxy</code> instance previously registered with the given <code>proxyName</code>.
 */
_p.retrieveProxy = function (proxyName)
{
    this._initializeModel();
    
    return this._model.retrieveProxy(proxyName);
};

/**
 * Remove a <code>Proxy</code> from the <code>Model</code> by name.
 *
 * @param proxyName The <code>Proxy</code> to remove from the <code>Model</code>.
 * 
 * @return Proxy The <code>Proxy</code> that was removed from the <code>Model</code>
 */
_p.removeProxy = function (proxyName)
{
    var proxy = null;
    
    if (this._model !== null) {
        proxy = this._model.removeProxy(proxyName);
    }
    
    return proxy;
};

/**
 * Check if a Proxy is registered
 * 
 * @param proxyName
 * 
 * @return boolean Whether a Proxy is currently registered with the given <code>proxyName</code>.
 */
_p.hasProxy = function (proxyName)
{
    this._initializeModel();
    
    return this._model.hasProxy(proxyName);
};

/**
 * Register a <code>Mediator</code> with the <code>View</code>.
 * 
 * @param mediator a reference to the <code>Mediator</code>
 * 
 * @return void
 */
_p.registerMediator = function (mediator)
{
    this._initializeView();
    
    this._view.registerMediator(mediator);
};

/**
 * Retrieve a <code>Mediator</code> from the <code>View</code>.
 * 
 * @param mediatorName
 * 
 * @return Mediator The <code>Mediator</code> previously registered with the given <code>mediatorName</code>.
 */
_p.retrieveMediator = function (mediatorName)
{
    this._initializeView();
    
    return this._view.retrieveMediator(mediatorName);
};

/**
 * Remove a <code>Mediator</code> from the <code>View</code>.
 * 
 * @param mediatorName name of the <code>Mediator</code> to be removed.
 * 
 * @return Mediator The <code>Mediator</code> that was removed from the <code>View</code>
 */
_p.removeMediator = function (mediatorName)
{
    var mediator = null;
    
    if (this._view !== null) {
        mediator = this._view.removeMediator(mediatorName);
    }
    
    return mediator;
};

/**
 * Check if a Mediator is registered or not
 * 
 * @param mediatorName
 * 
 * @return boolean Whether a Mediator is registered with the given <code>mediatorName</code>.
 */
_p.hasMediator = function (mediatorName)
{
    this._initializeView();
    
    return this._view.hasMediator(mediatorName);
};

/**
 * Create and send a <code>Notification</code>.
 * 
 * <P>
 *   Keeps us from having to construct new notification instances in our implementation code.
 * </P>
 * 
 * @param notificationName The name of the notiification to send
 * @param body The body of the notification (optional)
 * @param type The type of the notification (optional)
 * 
 * @return void
 */ 
_p.sendNotification = function (notificationName, body, type)
{
    var notification;
    
    if (this._view !== null) {
        notification = new org.puremvc.js.patterns.observer.Notification(notificationName, body, type);
        
        this._view.notifyObservers(notification);
    }
};