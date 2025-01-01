# Spørgsmål 10 - Native webkomponent

## Spørgsmål

- Forklar, hvad en nativ webkomponent er.
- Hvilken funktionalitet kræver browseren?
- Vis, hvordan man bygger en nativ webkomponent.
- Hvordan kan Lit hjælpe med at bygge webkomponenter?
- Diskuter fordele og ulemper ved native webkomponenter.


#### cd q10/carousel-project/src
#### npm install http-server 
#### http-server

## Intro: Hvad er native webkomponent
- Native webkomponenter er lowlevel, selvstændige, genanvendelige moduler, der bruger standard webteknologier. De arbejder på tværs af moderne browsere uden behov for eksterne biblioteker eller frameworks.

- En webkomponent består af tre hoveddele: Custom Elements, Shadow DOM, og HTML Templates.

- kan bruges i enhver webapplikation på tværs af frameworks (og uden frameworks). 

### Brugerdefinerede elementer ( customElements)

CustomElements er en måde at skabe dine egne HTML-tags på. 
Vi kan oprette en ny klasse, der udvider HTMLElement, defineres ved hjælp af metoden `customElements.define()`. 
Metoden tager to argumenter: navnet på elementet og klassen, der definerer og elementet i browseren.
Metoder:

- **Constructor** sker én gang, når komponenten instantieres. Er ikke forbundet til DOM.
- **ConnectedCallback** sker hver gang det brugerdefinerede element føjes til et dokument-forbundet element.

### [Shadow DOM](./src/component-with-template.js)

Shadow DOM er en måde at indkapsle DOM og CSS for en komponent. 

Det defineres ved hjælp af metoden `attachShadow()`. Metoden tager et argument: tilstanden af shadow DOM. 
Tilstanden kan være `open` eller `closed`. Hvis tilstanden er `open`, kan shadow DOM tilgås udefra komponenten. 
Hvis tilstanden er `closed`, kan shadow DOM kun tilgås inde fra komponenten. 
Shadow DOM gengives separat fra hoved-DOM'en. 
Dette betyder, at når en webkomponent bruger shadow DOM, kolliderer komponenten ikke med andre elementer på siden (navn og styling).

Det er smart fordi : 
1. Encapsulation: Shadow DOM kapsler en komponent's interne struktur, så dens HTML, CSS og JavaScript ikke påvirker eller påvirkes af resten af dokumentet. Dette forhindrer stil- og navnekollisioner.

2. Isolation: Det giver isolering af komponentens stil og opførsel, hvilket gør det lettere at udvikle og vedligeholde komplekse komponenter uden at bekymre sig om uforudsete sideeffekter.

3. Reusability: Komponenter med Shadow DOM kan genbruges på tværs af forskellige projekter uden at bekymre sig om stilkonflikter.

4. Scoped Styles: CSS-stilarter defineret inden for en Shadow DOM påvirker kun elementerne inden for den pågældende Shadow DOM, hvilket gør det nemmere at styre og vedligeholde stilarter.

5. Performance: Shadow DOM kan forbedre ydeevnen ved at reducere omfanget af stilberegninger og ommalinger, da ændringer inden for en Shadow DOM ikke nødvendigvis kræver omberegning af stilarter for hele dokumentet.

### [HTML-templates](./src/component-with-template.js)

HTML-skabeloner giver os en måde at definere markup på, som kan genbruges. Ved at bruge <template> og <slot> tags, kan vi oprette fleksible skabeloner, som kan have pladsholdere for brugerdefineret indhold.

## demo: 
Lad os nu se på en simpel demo, hvor jeg har bygget en lille webkomponent, der viser, hvordan vi kan bruge disse teknologier. Denne komponent viser dynamisk indhold baseret på brugerinput og anvender alle de tre teknologier, vi netop har diskuteret.

## Påkrævet funktionalitet

Udover de ovenstående tre funktionaliteter kræves kun grundlæggende HTML og JavaScript for at skabe en nativ webkomponent.

## Lit

Lit er et simpelt bibliotek til at bygge hurtige, lette webkomponenter. Det anvender lit-html til at gengive i elementets Shadow DOM og tilføjer API til at håndtere elementegenskaber og attributter. Det fungerer stadig i ethvert framework. Egenskaberne observeres som standard, og elementer opdateres asynkront, når deres egenskaber ændres. Lit fjerner behovet for at skrive standardkode for webkomponenter.

```ts
// Importér LitElement baseklasse, html hjælpefunktion, og TypeScript dekorationer
import { LitElement, html, customElement, property } from 'lit';
// Brug customElement-dekoratøren til at definere din klasse som
// et brugerdefineret element og registrerer <my-element> som en HTML-tag.
@customElement('my-element')
export class MyElement extends LitElement {
  // Opret en observeret egenskab. Udløser opdatering ved ændring.
  @property()
  foo = 'Denne tekst stammer fra en egenskab';
  // Implementér `render` for at definere en skabelon for dit element.
  render(){
    return html`<p>En TypeScript demonstration: <em>${this.foo}</em></p>`;
  }
}

```

Templates til HTML filen oprettes funktionelt: 

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

## Fordele og ulemper ved webkomponenter

### Fordele

- Fremtidssikret: Webkomponenter er fremtidssikrede, da de bygger på standarder understøttet af alle moderne browsere.
- Bagudkompatibel: De er hurtige og effektive, idet de kan bruges på tværs af forskellige frameworks eller uden et framework
- Bygger på indfødte browserfunktionaliteter
- Kan bruges på tværs af frameworks
- Hurtig: Kan bruges uden et framework
- Genanvendelig: De tilbyder en høj grad af genanvendelighed og vedligeholdelse

### Ulemper

- Ikke et meget stort fællesskab omkring det endnu
- Forholdsvis komplekst at bygge, fx states er svære
- Meget manuelt og på lavt niveau
- Nødvendigt at implementere event-bus for at håndtere begivenheder
- Ingen standard for server-side rendering 

## konklusion:
Native webkomponenter tilbyder en kraftfuld model for webudvikling, der fremmer indkapsling, genanvendelighed, og vedligeholdelse. Med teknologier som Lit til at støtte udviklingsprocessen, er det mere tilgængeligt end nogensinde at implementere robuste, effektive webkomponenter