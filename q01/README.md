# Q01 Angular in general

<!-- If not enough: Angular data binding (Angular Components) -->

<!-- References to the code will be made in markdown by using: See more in line XX in [Name of snippet]("PATH_TO_FILE") -->

**Quesitons:**

- Explain the basic Angular concepts (components, directives, modules, services, pipes)
- Explain how dependency injection is used in Angular
- Explain how to component-to-component communication can be implemented

Angular is an open-source JavaScript client side MVC framework developed and maintained by Google. Angular is a complete rewrite of its popular predecessor AngularJS. Angular applications are primarily implemented by using TypeScript, HTML and CSS. Angular is a component based framework, where components are the main building blocks of an Angular application. Components are reusable and can be nested inside each other. Components are also the main way of communicating between different parts of an Angular application. Angular applications are built by using a combination of components, directives, modules, services and pipes.

Angular is a complete framework and has a CLI that can be used to create and manage Angular applications.

## Angular concepts

### Angular components

Angular components are defined by a Typescript class as well as an HTML template. The component class contains the data and logic for the component, while the HTML template contains the view. The component class is decorated with the `@Component` decorator, which contains metadata about the component. The `@Component` decorator contains the selector, which is used to identify the component in the HTML template, the template URL, which is the path to the HTML template, and the style URL, which is the path to the CSS file for the component.

Whenever an Angular application is created there will always be an App component that serves as the root component.

The structure can be seen in the directory called `example-component` in the `src/app` folder.

Angular components can be craeted with the CLI by using `ng g component [componentName]` but have the functionality to be standalone. Standalone components reduce the need for ngModules and can be used to create reusable components. They specify their own dependencies and can be used in any Angular application. The difference between standalone components and regular components is that standalone components are not declared in an ngModule.

### Angular directives

There are three different types of directives in Angular: component directives, attribute directives and structural directives.

**Component directives:**
A component is simply a directive with a template.

**Attribute directives:**
Change the appearance or behavior of an element, component, or another directive.

Some of these include: `NgClass` and `NgStyle` which can be used to dynamically add or remove CSS classes and styles to an element, `NgModel` which can be used to bind an input, select or textarea element to a property on the component class.
To use an attribute directive, it must be added to an element as an attribute.

See more in line 1 in [Styling using NgClass](./src/app/example-component/example-component.component.html)

**Structural directives:**
Change the DOM layout by adding and removing DOM elements.

Some of these include `NgIf` which can be used to add or remove an element from the DOM based on a condition, `NgFor` which can be used to repeat a template for each item in a list, and `NgSwitch` which can be used to conditionally display elements based on a value.

See more in line 14 and 16 in [List or no list](./src/app/example-component/example-component.component.html)

### Angular services and dependency injection

A service can be any value, function or feature that an application needs. A service is typically a class with a narrow purpose. You register a service with the Angular injector, which is responsible for creating and delivering instances of the service when needed.

You can create a service with the CLI by using `ng g service [serviceName]`

Code that is not directly interacting with the view should be placed in a service. Often you would have an asynchronous service that talks to a back end api. Services are also used to share data between unrelated components.

To create a service you have to use the `@Injectable` decorator. This decorator tells Angular that the class can be used with dependency injection. The `@Injectable` decorator is not strictly required if the service has no dependencies and does not need to be injected anywhere, but it is considered good practice to always use it. The `@Injectable` has a providedIn property, which is used to specify the provider of the service. The providedIn property can be set to root, which means that the service is provided in the root injector. This means that the service is available everywhere in the application. The providedIn property can also be set to a specific module, which means that the service is only available in that module.

See more in line 8 in [Logger service](./src/app/logger.service.ts) which is injected in line 17 in [Example component](./src/app/example-component/example-component.component.ts)

DI requires that the service or value or function is asked for by the consumer. The consumer is the component that needs the service. The consumer must ask for the service in the constructor.

### Angular pipes

Angular pipes are like any other pipe in programming. They take some input and transform it to some output. Pipes are used to format data for display. Angular comes with a set of built-in pipes, but you can also create your own custom pipes.

Pipes can be used by the pipe operator `|` and can be chained to other pipes.

See more in line 23 in [Example HTML](./src/app/example-component/example-component.component.html)

There are two forms of pipes in Angular: pure and impure pipes. Pure pipes are only called when Angular detects a change in the value or the parameters passed to a pipe. Impure pipes are called for every change detection cycle, which can be very expensive. A pure pipe must use a pure function, which is one that processes inputs and returns values without side effects
    – In other words, given the same input, a pure function should always return the same output

Angular also allows for costum pipes. A custom pipe can be made with the CLI by using `ng g pipe [pipeName]`. In order to implement a costum pipe you have to implement the `PipeTransform` interface. The `PipeTransform` interface has a transform method that takes a value and an optional set of parameters and returns the transformed value. The transform method is called whenever the value or the parameters change.

### Angular modules

Angular modules are used to organize an application into cohesive blocks of functionality. An Angular application is defined by a root module, which is the AppModule. When you create a new component with the CLI, the CLI automatically adds the component to the AppModule. The AppModule is the root module of the application and is the entry point for the application. The AppModule is decorated with the `@NgModule` decorator, which contains metadata about the module. The `@NgModule` decorator contains the declarations, which is an array of the components, directives and pipes that belong to the module, the imports, which is an array of the modules that the module depends on, the providers, which is an array of the services that the module provides, and the bootstrap, which is an array of the components that are bootstrapped when the application starts.

See [AppModule](./src/app/app.module.ts)

You can also import an angular module or standalone component into another module.

## Component-to-component communication

Component to component communication can be achieved by using the `@Input`. Let's take an example with a parent and a child component that need to communicate. The parent component passes a value to the child components variable that is decorated with the `@Input` decorator. The child component can then use this value and display it. Don't forget to check the module and make sure everything is imported correctly.

See more in line 26 in [Parent HTML](./src/app/example-component/example-component.component.html) and line 12 in [Child @Input](./src/app/display-count/display-count.component.ts)
