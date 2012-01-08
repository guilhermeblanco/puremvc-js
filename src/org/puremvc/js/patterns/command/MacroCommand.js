/**
 * A base <code>Command</code> implementation that executes other <code>Command</code>s.
 *  
 * <P>
 *   A <code>MacroCommand</code> maintains an list of <code>ICommand</code> 
 *   Class references called <i>SubCommands</i>.
 * </P>
 * 
 * <P>
 *   When <code>execute</code> is called, the <code>MacroCommand</code> instantiates and calls 
 *   <code>execute</code> on each of its <i>SubCommands</i> turn. Each <i>SubCommand</i> will be passed 
 *   a reference to the original <code>INotification</code> that was passed to the <code>MacroCommand</code>'s 
 *   <code>execute</code> method.
 * </P>
 * 
 * <P>
 *   Unlike <code>SimpleCommand</code>, your subclass should not override <code>execute</code>, but instead, 
 *   should override the <code>initializeMacroCommand</code> method, calling <code>addSubCommand</code> once 
 *   for each <i>SubCommand</i> to be executed.
 * </P>
 * 
 * @see org.puremvc.js.core.Controller
 * @see org.puremvc.js.patterns.observer.Notification
 * @see org.puremvc.js.patterns.command.SimpleCommand
 */
Object.declare('org.puremvc.js.patterns.command.MacroCommand');

/**
 * Constructor. 
 * 
 * <P>
 *   You should not need to define a constructor, instead, override the <code>initializeMacroCommand</code> method.
 * </P>
 * 
 * <P>
 *   If your subclass does define a constructor, be sure to call <code>super()</code>.
 * </P>
 */
org.puremvc.js.patterns.command.MacroCommand = function ()
{
    org.puremvc.js.patterns.observer.Notifier.call(this);
    
    this._subCommands = new Array();
    
    this._initializeMacroCommand();
};

Object.extend(org.puremvc.js.patterns.command.MacroCommand, org.puremvc.js.patterns.observer.Notifier);

var _p = org.puremvc.js.patterns.command.MacroCommand.prototype;

// Mapping of Commands
_p._subCommands = null;

/**
 * Initialize the <code>MacroCommand</code>.
 * 
 * <P>
 *   In your subclass, override this method to initialize the <code>MacroCommand</code>'s 
 *   <i>SubCommand</i> list with <code>Command</code> class references like this:
 * </P>
 * 
 * <listing>
 *        // Initialize MyMacroCommand
 *        _p._initializeMacroCommand = function ()
 *        {
 *            this.addSubCommand(MyApp.Controller.FirstCommand);
 *            this.addSubCommand(MyApp.Controller.SecondCommand);
 *            this.addSubCommand(MyApp.Controller.ThirdCommand);
 *        };
 * </listing>
 * 
 * <P>
 *   Note that <i>SubCommand</i>s may be any <code>Command</code> implementor, <code>MacroCommand</code>s 
 *   or <code>SimpleCommands</code> are both acceptable.
 * </P>
 * 
 * @return void
 */
_p._initializeMacroCommand = function ()
{
    
};

/**
 * Add a <i>SubCommand</i>.
 * 
 * <P>
 *   The <i>SubCommands</i> will be called in First In/First Out (FIFO) order.
 * </P>
 * 
 * @param commandClassRef A reference to the <code>Class</code> of the <code>Command</code>.
 * 
 * @return void
 */
_p.addSubCommand = function (commandClassRef)
{
    this._subCommands.push(commandClassRef);
};

/** 
 * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
 * 
 * <P>
 *   The <i>SubCommands</i> will be called in First In/First Out (FIFO) order.
 * </P>
 * 
 * @param notification The <code>Notification</code> object to be passsed to each <i>SubCommand</i>.
 * 
 * @return void
 */
_p.execute = function (notification)
{
    var commandClassRef,
        commands = [],
        i, length;
    
    // We need to initialize them first...
    for (i = 0, length = this._subCommands.length; i < length; i += 1) {
        commandClassRef = this._subCommands[i];
        commands.push(new commandClassRef());
    }
    
    // ...and then we can execute (constructors may subscribe to events)
    for (i = 0, length = commands.length; i < length; i += 1) {
        commands[i].execute(notification);
    }
};