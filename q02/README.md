# Q02 Reactive programming
<!-- References to code will be made in markdown by using: See more in line XX in [name of snippet]("PATH_TO_FILE") -->

**Questions:**

- Explain reactive programming using RxJS
- Explain how network communication is done in Angular according to best practices (use of HttpClientModule)

## Reactive programming using RxJS

Reactive extensions for JavaScript (RxJS) is a library for reactive programming using observables that makes it easier to compose asynchronous code.
Reactive programming is very useful when dealing with network protocols and requests since it is asynchronous by nature.

### Observables

An observable is a collection of values over time. It can be used to handle asynchronous operations and events. Observables are lazy, meaning that they only execute when they have a subscriber.

Hot observables are observables that are already producing values before a subscriber subscribes to it.
Cold observables are observables that start producing values when a subscriber subscribes to it.

It is common to use the dollar sign ($) at the end of the variable name to indicate that it is an observable.

### Subscriptions

A subscription is a connection between an observable and an observer. It is created by calling the subscribe method on an observable. A subscription can be used to unsubscribe from an observable.

### Operators

Operators are functions that can be used to manipulate the data emitted by an observable. There are two types of operators: pipeable operators and creation operators. Pipeable operators are used to manipulate the data emitted by an observable. Creation operators are used to create new observables.
Operators are simply put, functions.

There are many operators but here are some of the most common ones:

- of

```typescript
import { of } from 'rxjs';
 
of(1, 2, 3).subscribe(
  next => console.log('next:', next),
  err => console.log('error:', err),
  () => console.log('the end'),
);
 
// Logs:
// next: 1
// next: 2
// next: 3
// the end
```

- from

```typescript
import { from } from 'rxjs';
 
const array = [10, 20, 30];
const result = from(array);
 
result.subscribe(x => console.log(x));
 
// Logs:
// 10
// 20
// 30
```

- map with from (pipeable operator)

```typescript
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const array = [10, 20, 30];
const result = from(array).pipe(map(x => x * 2));

result.subscribe(x => console.log(x));

// Logs:
// 20
// 40
// 60
```

See example in line 23 in [Card service](./src/app/card.service.ts)

## Network communication

All webaps need to communicate with a server to get data. Angular provides the HttpClientModule to make it easier to communicate with a server. The HttpClientModule is a wrapper around the XMLHttpRequest interface. It is used to make HTTP requests to a server.

### HttpClientModule

The HttpClient is used to make HTTP requests to a server. It wraps requests in observables and provides methods for HTTP requests. The HttpClientModule is used by injecting the HttpClient into a component or service.

When using the HttpClientModule you can simply import it into your component and start using the endpoints.

See more in line 16 in [Card service injection](./src/app/app.component.ts)

The HttpClient is used in combination with RxJS operators to filter and transform the data received from the server. It is initiated with `subscribe()` or the `async` pipe.

See more in line 6 in [App.component.html](./src/app/app.component.html)

### Interceptors

When making http request to a server it is common to add headers to the request. This can be done by using interceptors. Interceptors are used to modify HTTP requests before they are sent to the server. They are also used to modify HTTP responses before they are sent to the application. So if you have an application with authentication you can use an interceptor to add the authentication token to the request. This makes it simple for the developer to create new requests without having to worry about adding the authentication token to the request.

You can also add other stuff to the request such as meta data or other headers.

See more in line 14 in [Interceptor](./src/app/request-logger.interceptor.ts) and line 13 in [App.module.ts](./src/app/app.module.ts)

### Error handling

Sine not all HttpRequests are succeful you might want to handle errors. This can be done by using the `catchError()` operator. It is used to catch errors and handle them. It is used in combination with the `throwError()` operator to throw an error.

See more in line 45 in [Error handling](./src/app/card.service.ts)
