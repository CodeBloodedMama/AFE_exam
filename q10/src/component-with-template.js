class ComponentWithTemplate extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.myElement = document.createElement("div");
    this.myElement.innerHTML = `
    <template>
      <style>
        p {
          font-family: Arial, sans-serif;
        }
        .template-container {
          border: 1px solid black;
          border-radius: 20px;
          padding: 10px;
          margin: 10px;
        }
      </style>
      <div class="template-container">
        <p>
          The &lt;slot&gt; tag can be used to put
          <strong><slot name="whatToPutInSlot">things</slot></strong>
          in templates
        </p>
      </div>
    </template>`;
    const template = this.myElement.querySelector("template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.style.color = this.getAttribute("color") || "black";
  }
}
if (!customElements.get("component-with-template")) {
  customElements.define("component-with-template", ComponentWithTemplate);
}
