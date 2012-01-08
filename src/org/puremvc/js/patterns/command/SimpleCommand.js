/**
 * A base <code>Command</code> implementation.
 * 
 * <P>
 *   Your subclass should override the <code>execute</code> method where your business logic 
 *   will handle the <code>Notification</code>.
 * </P>
 * 
 * @see org.puremvc.js.core.Controller
 * @see org.puremvc.js.patterns.observer.Notification
 * @see org.puremvc.js.patterns.command.MacroCommand
 */
Object.declare('org.puremvc.js.patterns.command.SimpleCommand');

org.puremvc.js.patterns.command.SimpleCommand = function ()
{
    org.puremvc.js.patterns.observer.Notifier.call(this);
};

Object.extend(org.puremvc.js.patterns.command.SimpleCommand, org.puremvc.js.patterns.observer.Notifier);

var _p = org.puremvc.js.patterns.command.SimpleCommand.prototype;

/**
 * Fulfill the use-case initiated by the given <code>Notification</code>.
 * 
 * <P>
 *   In the Command Pattern, an application use-case typically begins with some user action, 
 *   which results in an <code>Notification</code> being broadcast, which is handled by business 
 *   logic in the <code>execute</code> method of an <code>Command</code>.
 * </P>
 * 
 * @param notification The <code>Notification</code> to handle.
 * 
 * @return void
 */
_p.execute = function (notification)
{
    throw new Error('execute() method must be overwritten by command implementation');
};