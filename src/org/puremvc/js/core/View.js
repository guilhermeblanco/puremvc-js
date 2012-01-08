/**
 * A Singleton <code>View</code> implementation.
 * 
 * <P>
 *   In PureMVC, the <code>View</code> class assumes these responsibilities:
 * 
 *   <UL>
 *     <LI>Maintain a cache of <code>Mediator</code> instances.</LI>
 *     <LI>Provide methods for registering, retrieving, and removing <code>Mediator</code>s.</LI>
 *     <LI>Notifiying <code>Mediator</code>s when they are registered or removed.</LI>
 *     <LI>Managing the observer lists for each <code>Notification</code> in the application.</LI>
 *     <LI>Providing a method for attaching <code>Observer</code>s to an <code>Notification</code>'s observer list.</LI>
 *     <LI>Providing a method for broadcasting an <code>Notification</code>.</LI>
 *     <LI>Notifying the <code>Observer</code>s of a given <code>Notification</code> when it broadcast.</LI>
 *   </UL>
 * </P>
 * 
 * @see org.puremvc.js.patterns.mediator.Mediator
 * @see org.puremvc.js.patterns.observer.Observer
 * @see org.puremvc.js.patterns.observer.Notification
 */
Object.declare('org.puremvc.js.core.View');

/**
 * Constructor. 
 * 
 * <P>
 *   This <code>View</code> implementation is a Singleton, so you should not call the constructor 
 *   directly, but instead call the static Singleton Factory method <code>View.getInstance()</code>
 * </P>
 * 
 * @throws Error Error if Singleton instance has already been constructed
 */
org.puremvc.js.core.View = function () 
{
    if (org.puremvc.js.core.View.instance !== null) {
        throw new Error(org.puremvc.js.core.View.SINGLETON_MESSAGE);
    }
    
    org.puremvc.js.core.View.instance = this;
    
    this._mediatorMap = {};
    this._observerMap = {};
    
    this._initializeView();
};

// Singleton instance
org.puremvc.js.core.View.instance = null;

// Contant messages
org.puremvc.js.core.View.SINGLETON_MESSAGE = 'View Singleton already constructed!';

/**
 * <code>View</code> Singleton Factory method.
 * 
 * @return View the Singleton instance of <code>View</code>
 */
org.puremvc.js.core.View.getInstance = function () 
{
    if (org.puremvc.js.core.View.instance === null) {
        org.puremvc.js.core.View.instance = new org.puremvc.js.core.View();
    }
    
    return org.puremvc.js.core.View.instance;
};

var _p = org.puremvc.js.core.View.prototype;

// Mapping of Mediator names to Mediator instances
_p._mediatorMap = null;

// Mapping of Notification names to Observer lists
_p._observerMap = null;

/**
 * Initialize the Singleton View instance.
 * 
 * <P>
 *   Called automatically by the constructor, this is your opportunity to initialize the Singleton
 *   instance in your subclass without overriding the constructor.
 * </P>
 * 
 * @return void
 */
_p._initializeView = function ()
{
    
};

/**
 * Register a <code>Observer</code> to be notified of <code>Notifications</code> with a given name.
 * 
 * @param notificationName the name of the <code>Notifications</code> to notify this <code>Observer</code> of
 * @param observer The <code>Observer</code> to register
 * 
 * @return void
 */
_p.registerObserver = function (notificationName, observer)
{
    if (typeof this._observerMap[notificationName] === 'undefined') {
        this._observerMap[notificationName] = new Array();
    }
    
    this._observerMap[notificationName].push(observer);
};

/**
 * Notify the <code>Observers</code> for a particular <code>Notification</code>.
 * 
 * <P>
 *   All previously attached <code>Observers</code> for this <code>Notification</code>'s list are notified 
 *   and are passed a reference to the <code>Notification</code> in the order in which they were registered.
 * </P>
 * 
 * @param notification The <code>Notification</code> to notify <code>Observers</code> of.
 * 
 * @return void
 */
_p.notifyObservers = function (notification)
{
    var notificationName = notification.getName(),
        observersMapRef  = null, 
        observersMap     = [], 
        i, length;
    
    if (typeof this._observerMap[notificationName] !== 'undefined') {
        // Get a reference to the observers list for this notification name
        observersMapRef = this._observerMap[notificationName];
        
        // Copy observers from reference array to working array, 
        // since the reference array may change during the notification loop
        for (i = 0, length = observersMapRef.length; i < length; i += 1) {
            observersMap.push(observersMapRef[i]);
        }
        
        // Notify Observers from the working array
        for (i = 0, length = observersMap.length; i < length; i += 1) {
            observersMap[i].notifyObserver(notification);
        }
    }
};

/**
 * Remove the observer for a given notifyContext from an observer list for a given Notification name.
 * 
 * @param notificationName which observer list to remove from 
 * @param notifyContext remove the observer with this object as its notifyContext
 * 
 * @return void
 */
_p.removeObserver = function (notificationName, notifyContext)
{
    var observersMapRef,
        i, length;
    
    if (typeof this._observerMap[notificationName] !== 'undefined') {
        // The observer list for the notification under inspection
        observersMapRef = this._observerMap[notificationName];
        
        // Find the observer for the notifyContext
        for (i = 0, length = observersMapRef.length; i < length; i += 1) {
            if (observersMapRef[i].compareNotifyContext(notifyContext) === true) {
                // There can only be one Observer for a given notifyContext 
                // in any given Observer list, so remove it and break
                observersMapRef.splice(i, 1);
                
                break;
            }
        }
        
        // When a Notification's Observer list length falls to zero, delete the notification key from map
        if (observersMapRef.length === 0) {
            this._observerMap[notificationName] = null;
            delete this._observerMap[notificationName];
        }
    }
};

/**
 * Register a <code>Mediator</code> instance with the <code>View</code>.
 * 
 * <P>
 *   Registers the <code>Mediator</code> so that it can be retrieved by name, and further interrogates the 
 *   <code>Mediator</code> for its <code>Notification</code> interests.
 * </P>
 * 
 * <P>
 *   If the <code>Mediator</code> returns any <code>Notification</code> names to be notified about, 
 *   an <code>Observer</code> is created encapsulating the <code>Mediator</code> instance's 
 *   <code>handleNotification</code> method and registering it as an <code>Observer</code> for all 
 *   <code>Notifications</code> the <code>Mediator</code> is interested in.
 * </P>
 * 
 * @param mediator Reference to the <code>Mediator</code> instance
 * 
 * @return void
 */
_p.registerMediator = function (mediator)
{
    var mediatorName = mediator.getMediatorName(),
        interests,
        observer,
        i, length;
    
    // Do not allow re-registration (you must to removeMediator first)
    if (this.hasMediator(mediatorName)) {
        return;
    }
    
    // Register the Mediator for retrieval by name
    this._mediatorMap[mediatorName] = mediator;
    
    // Alert the mediator to initialize itself for registering on view
    mediator.onRegisterInitialize();
    
    // Get Notification interests, if any.
    interests = mediator.listNotificationInterests();
    
    // Register Mediator as an observer for each of its notification interests
    if (typeof interests === 'object' && typeof interests.length === 'number' && interests.length > 0) {
        length = interests.length;
        
        // Create Observer referencing this mediator's handlNotification method
        observer = new org.puremvc.js.patterns.observer.Observer(mediator.handleNotification, mediator);
        
        // Register Mediator as Observer for its list of Notification interests
        for (i = 0; i < length; i += 1) {
            this.registerObserver(interests[i], observer);
        } 
    }

    // Alert the mediator that it has been registered
    mediator.onRegister();
};

/**
 * Retrieve a <code>Mediator</code> from the <code>View</code>.
 * 
 * @param mediatorName the name of the <code>Mediator</code> instance to retrieve.
 * 
 * @return Mediator The <code>Mediator</code> instance previously registered with the given <code>mediatorName</code>.
 */
_p.retrieveMediator = function (mediatorName)
{
    if (this.hasMediator(mediatorName)) {
        return this._mediatorMap[mediatorName];
    }
    
    return null;
};

/**
 * Remove a <code>Mediator</code> from the <code>View</code>.
 * 
 * @param mediatorName Name of the <code>Mediator</code> instance to be removed.
 * 
 * @return Mediator The <code>Mediator</code> that was removed from the <code>View</code>.
 */
_p.removeMediator = function (mediatorName)
{
    var mediator,
        interests,
        i, length;
    
    if (this.hasMediator(mediatorName)) {
        // Retrieve the named mediator
        mediator  = this._mediatorMap[mediatorName];
        interests = mediator.listNotificationInterests();
        length    = interests.length;
        
        // For every notification this mediator is interested in...
        for (i = 0; i < length; i += 1) {
            // Remove the observer linking the mediator to the notification interest
            this.removeObserver(interests[i], mediator);
        }
        
        // Remove the mediator from the map
        this._mediatorMap[mediatorName] = null;
        delete this._mediatorMap[mediatorName];
        
        // Alert the mediator that it has been removed
        mediator.onRemove();
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
    return (typeof this._mediatorMap[mediatorName] !== 'undefined');
};