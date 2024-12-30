# Question 10 - Native web component

**Questions:**

- Explain what a native web component is.
- Which functionality is required by the browser?
- Show how to build a native web component.
- How can Lit help with building web components?
- Discuss pros and cons of native web components.

## DELETE ME

useful when developing:
`npm install http-server -g`
`http-server -c-1` (to run the server without caching)

## What is a native web component and how to build one

A native web component is a component that can be used in any web application across frameworks (and without frameworks). It consists of a custom element, and can use the shadow DOM and HTML templates.

### Custom elements

Custom elements are a way to create your own HTML elements. They are defined using the `customElements.define()` method. The method takes two arguments: the name of the element and the class that defines the element.

A custom component is built as a class that extends HTMLElement.

Methods:

- **Constructor** happens once, when the component is instantiated. Is not connected to the DOM. 
- **ConnectedCallback** happens each time the custom element is appended into a document-connected element

### [Shadow DOM](./src/component-with-template.js)

Shadow DOM is a way to encapsulate the DOM and CSS of a component. It is defined using the `attachShadow()` method. The method takes one argument: the mode of the shadow DOM. The mode can be `open` or `closed`. If the mode is `open` the shadow DOM can be accessed from outside the component. If the mode is `closed` the shadow DOM can only be accessed from inside the component. The shadow DOM is rendered separately from the main DOM. This means that when a web component uses the shadow DOM the component does not collide with other elements on the page (name and styling).

### [HTML templates](./src/component-with-template.js)

HTML templates are a way to define HTML that is not rendered using the `<template>` tag. The `<slot>` tag can be used to make placeholders for content that is passed to the component.

## Required functionality

Beside the above three functionalities, only basic HTML and JavaScript is needed to create a native web component.

## Lit

Lit is a simple library for building fast, lightweight web components. It uses lit-html to render into the element's Shadow DOM and adds API to help manage element properties and attributes. It still works in any framework. Properties are observed by default, and elements update asynchronously when their properties change.
Lit removes the need to write the boilerplate code for web components.

```ts
// Import LitElement base class, html helper function , and TypeScript decorators
import { LitElement , html , customElement , property } from 'lit'
// Use the customElement decorator to define your class as
// a custom element and registers <my-element> as an HTML tag.
@customElement ('my-element')
export class MyElement extends LitElement {
  // Create an observed property. Triggers update on change.
  @property()
  foo = 'This text originates from a property';
  // Implement `render` to define a template for your element.
  render(){
    return html`<p>A typescript demo: <em>${this.foo}</em></p>`;
  }
}
```

Templates can be made functionally:

```ts
import { html , render } from 'lit html';
// A lit html template uses the `html` template tag:
let sayHello = (name) => html`<h1>Hello ${name}</h1>`;
// It's rendered with the `render()` function:
render(sayHello(' World'), document.body);

setTimeout(() => {
// And re renders only update the data that changed, without VDOM diffing!
  render(sayHello(' Everyone'), document.body);
}, 2000);
```

## Pros and cons on web components

### Pros

- Future proof
- Backwards compatible
- Builds on native browser functionality
- Can be used across frameworks
- Can be used without a framework
- Fast
- Reusable

### Cons

- Not a very big community around it yet
- Somewhat complex to build
- Very manual and low level
- Need to implement event-bus to handle events
- No standard for server side rendering