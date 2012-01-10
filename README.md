An old-style JavaScript implementation for PureMVC: http://puremvc.org

# About PureMVC

The PureMVC is a lightweight, MVC framework, designed to help implementing
scalable and maintainable applications. It was originally written in
ActionScript 3, and now it's been ported to a wide variety of platforms,
including C#, Java, PHP, Ruby and JavaScript.

Basically, it relies on well known and proven design patterns, which allows
communication between the different tiers (`Model`, `View` and `Controller`) and
components, and hides the complexity from the developer.
Here's a quick overview:

  - **Model**
    A Singleton that caches named references to Proxies.
    - **Proxies**
      Helps to expose an API for manipulating the Data Model.
  - **View**
    A Singleton that caches named references to Mediators.
    - **Mediators**
      Create, adapt or reuse existing user interface components.
  - **Controller**
    A Singleton that maintains named mappings to Commands.
    - **Commands**
      Contains business-logic and orchestrate complex or system-wide activities.
      May retrieve and interact with `Proxies`, communicate with `Mediators` or
      execute other `Commands`. May be a `SimpleCommand` (triggered by a
      `Notification` or `MacroCommand`), or a `MacroCommand` (executes multiples
      `SimpleCommands`).
  - **Façade**
     A Singleton that initializes and caches the Core actors (`Model`, `View`
     and `Controller`), and provides a single place to access all of their
     public methods.

The `Proxies`, `Mediators` and `Commands` communicate with each other through
`Notifications`. Even on platforms with native Event implementations (like
JavaScript or Flash), `Notifications` are important to:

  - Ensure that the framework works without relying on an specific language;
  - Provide a standard way of communication, leaving native Events to listen and
    trigger native interactions (like the `click` or `mouseover` events in JS).

In PureMVC's context:

  - `Proxies` broadcast, but do not listen for `Notifications`
  - `Mediators` broadcast AND listen for `Notifications`
  - `Commands` broadcast AND are triggered by `Notifications`

The `Observer` pattern is responsible for carrying a reference to an object
which wishes to be notified, and the method that should be called when when a
`Notification` is broadcast. The `View` maps the `Notification` names to
`Observers`, and notify them when a `Notification` is broadcast.

The MVC design and the JavaScript implementation allow the construction of
complex interfaces built with several visual components and data retrieved from
the server.

Most of the PureMVC implementation is internal to the framework, so you don't
need to worry about dealing with all patterns. Regarding PureMVC's framework,
you will only be working with:

  - **Proxies**
    Handling AJAX requests and Data Objects.
  - **Mediators**
    Initializing plugins, listing and handling `Notifications`.
  - **SimpleCommands**
    Initializing a `Widget`, by registering `Mediators` and `Proxies`, and
    creating `ViewComponents` - more on those later.
  - **MacroCommands**
    Setups a page, initializing `Widgets` by calling their `SimpleCommands`.
  - **Façade**
    Starts the application, calling the correct `MacroCommand`. Is referenced
    by `Proxies`, `Mediators` and `Commands` to send `Notifications` and
    register/remove them.

Read more about the PureMVC:

  - [Goals and Benefits](http://puremvc.org/component/option,com_wrapper/Itemid,31/)
  - [Conceptual Diagram](http://puremvc.org/component/option,com_wrapper/Itemid,34/)
  - [Framework Overview with UML Diagrams](http://puremvc.org/component/option,com_wrapper/Itemid,35/)
  - [Best Practices](http://puremvc.org/component/option,com_wrapper/Itemid,174/)