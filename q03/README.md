# Q03 Routing and SSR

<!-- References to code will be made in markdown by using: See more in line XX in [name of snippet]("PATH_TO_FILE") -->

**Questions:**

- Explain how routing works in Angular
- Explain module routing and lazy-loading
- Explain how to get route information in the navigated to component
- Explain how to protect routes with guards
- Explain why and how to use Server-Side Rendering (SSR)

( ng serve -o)

## Routing and module routing

Single page applications are very useful as they allow the user to only load what is needed. Not only does this improve the user experience but it is also good for performance.

Routing is the process of navigating between different components. It is used to create a single page application (SPA) with multiple views.

Angular has a powerful module used to route between different components.

Routing in Angular is done by using the RouterModule and the RouterLink directives. The RouterModule is used to configure the router and the RouterLink is used to navigate to a specific route.

The route uses a first match wins strategy which means that more specific routes should be placed before less specific routes. You simply add a RouterLink directive to link to a route.

See more in line 4-9 in [Router directive](./src/app/pick/pick.component.html)

You have to be sure that the routes you have specified with the RouterLink directive are defined in the RoutingModule.

See more in line 16-19 in [Defining routes](./src/app/app-routing.module.ts)

2 routers have been created where one is used for the app and one is used for the lazy loaded module. This means that there is a internal router and a external router. The internal router is used for the lazy loaded module and the external router is used for the app.  

See more in line 7-11 in [Internal routing](./src/app/lazy/lazy-routing.module.ts)

You can also define wildcard routes to handle routes that do not exist.

See more in line 27 in [Wildcard routes](./src/app/app-routing.module.ts)

## Lazy-loading

Modules are early loaded by default. This means that all modules are loaded when the application is loaded. This is not optimal as it can lead to performance issues.

Lazy-loading is a technique that allows you to load modules only when they are needed. You configure routes to only load when needed. Since the bundle size is smaller on the initial load it will improve the user experience significantly. Lazy loading in the router is implemented by using the loadChildren property.

See more in line 13 in [Lazy-loading](./src/app/app-routing.module.ts)

## Route information in the navigated to component

In order to access route information in the navigated to component you need to inject the ActivatedRoute service in the constructor of the component. The ActivatedRoute service contains information about the route.

See more in line 12 in [ActivatedRoute](./src/app/number/number.component.ts)

For applications where you need to know where you are in the specific component this can be useful. In our case we simply print the number of the route in the component.

See more in line 4 in [Route information in the navigated to component](./src/app/number/number.component.html)

## Route guards

Route guards are used to prevent unauthorized users from accessing certain routes. There are four types of route guards: CanActivate, CanActivateChild, CanDeactivate and CanLoad. CanActivate is used to prevent unauthorized users from accessing a route. CanActivateChild is used to prevent unauthorized users from accessing a child route. CanDeactivate is used to prevent users from leaving a route. CanLoad is used to prevent unauthorized users from loading a module.

The guard can either be synchronous or asynchronous. A synchronous guard returns a boolean value. An asynchronous guard returns an observable or a promise.

When implementing a guard you need to implement the CanActivate interface. The CanActivate interface contains a canActivate method that returns a boolean value, an observable or a promise. The canActivate method takes two parameters: the activated route snapshot and the router state snapshot. The activated route snapshot contains information about the route. The router state snapshot contains information about the router. You can also chose to implement the CanActivateChild, CanDeactivate or CanLoad interface.

See more in line 4 in [Route guards](./src/app/pick.guard.ts)

In order to use a guard in the router you need to add it to the canActivate, canActivateChild, canDeactivate or canLoad property.

See more in line 24 in [Using guards in the router](./src/app/app-routing.module.ts)

## Server-Side Rendering (SSR)

Server-Side Rendering (SSR) is a technique that allows you to render your application on the server instead of the client. This is useful for SEO and performance reasons as it allows the search engine to crawl your applications HTML.

### Pre-rendering

Pre-rendering allows you to run a client side application at build time to capture its state.

### Rehydration

Rehydration is the process of "booting up" JavaScript views on the client such that they use the server side generated HTML's DOM tree as well as the data.

### How to

Add the ssr package `ng add @angular/ssr`
Run `npm run dev:ssr` to start the app with server side rendering