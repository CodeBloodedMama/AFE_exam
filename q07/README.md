# Q07 Next

**Spørgsmål**
- 1. giv en overordnet forklaring på hvad er NextJS
- 2. forklar de forskellige komponent typer i next og hvordan man ka mixe dem
- 3. forklar hvordan App Router bruges og hvordan det er forskelligt fra Pages router.

[npm run dev] i fitness-next

## 1. Next oversigt

Next.js er et avanceret React-framework, der er designet til at opbygge produktionsklare webapplikationer. Det forbedrer React ved at tilføje server-side rendering **(SSR)**, static site generation **(SSG)**, og client-side **(CSR)** rendering, hvilket optimerer både ydeevne og SEO. 
Frameworket tilbyder automatisk routing baseret på filsystemet, API-ruter for at bygge backend funktionaliteter inden for det samme projekt, og indbygget understøttelse for CSS og CSS-in-JS biblioteker. Dette gør Next.js ideelt til udvikling af hurtige, skalerbare applikationer, der kræver høj optimering for søgemaskiner og ydeevne.
Det er nemt at deploy appen til Vercel.

- Server-side rendering (SSR) sikrer, at siderne er forudindlæste på serveren, hvilket giver hurtigere indlæsningstider og bedre SEO-optimering, da indholdet er synligt for søgemaskiner fra første load.
- Static site generation (SSG) tillader udviklere at generere HTML-sider ved build-tid baseret på forudbestemte data, hvilket resulterer i ultrahurtige sideloads og minimal serverbelastning.
- Incremental Static Regeneration (ISR) er en hybrid tilgang, hvor statiske sider kan genopbygges on-demand uden at skulle genbygge hele sitet.

### Forskellige typer komponenter i nextjs og hvordan man blander dem : 

1. **PageComponents**:  Disse findes i pages mappen. Hver JavaScript eller TypeScript fil i denne mappe svarer automatisk til en rute baseret på filnavnet. Sidekomponenter er indgangspunkter for forskellige stier i din applikation og kan anvende specielle livscyklusfunktioner til datahentning som ´getStaticProps´ og ´getServerSideProps´.
2. **Almindelige React komponenter**: typiske React-komponenter, der anvendes til at opbygge brugergrænsefladen. De kan placeres hvor som helst i projektet, men ofte i en components mappe. De kan genbruges på tværs af forskellige sider og indlejres i page-komponenter.

For at integrere disse komponenttyper, importerer man simpelthen de regulære React-komponenter ind i sidekomponenterne for at sammensætte komplekse layouts. Dette giver en høj grad af genbrugelighed og modularitet.

### Eksempel på brug af komponenter i `fitness-next` appen

1. **Opret en komponent**:
   ```tsx
   // filepath: /src/components/Header.tsx
   import React from 'react';

   const Header = () => {
     return (
       <header>
         <h1>Welcome to My Fitness App</h1>
       </header>
     );
   };

   export default Header;
   ```

og med brugen af komponenten i en side : 
```tsx
// filepath: /src/app/page.tsx
import React from 'react';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div>
      <Header />
      <p>This is the home page.</p>
    </div>
  );
};

export default HomePage;

```


#### Client og Server komponenter i nextJS

**Server components**
- SSR-komponenter håndterer rendering af HTML på serveren, før siden sendes til klienten. Dette er ideelt for SEO og initial load performance, da indholdet er fuldt renderet og synligt for søgemaskiner samt brugere uden JavaScript.
- API-ruter i Next.js oprettes under pages/api og fungerer som serverkomponenter, der kan håndtere datahentning, autentificering, og interaktioner med databaser eller eksterne tjenester.

**Client components**
- Klientkomponenter renderes i browseren og udnytter client-side rendering (CSR). Disse komponenter er typisk dem, der håndterer dynamiske brugerinteraktioner, tilstandsstyring og alt, der kræver opdateringer i realtid uden en ny sideindlæsning.
- Klientkomponenter kan være alt fra interaktive brugergrænseflader, formularer, til dynamiske lister, der opdateres baseret på brugerinput.

#### Hvordan blandes client og server komponenter
Next.js tilbyder en hybrid tilgang til rendering, der tillader udviklere at vælge den mest effektive rendering metode for hver del af applikationen. Her er nogle måder at kombinere server- og klientkomponenter på:


## 3. Forklar hvordan man bruger App router, og hvordan den adskiller sig fra Pages router
Next.js introducerede en ny routing-mekanisme kaldet App Router i version 13.5, som er forskellig fra den traditionelle Pages Router.

#### Pages Router:

- Filbaseret routing: Hver fil i pages mappen bliver automatisk en route.
- getServerSideProps og getStaticProps: Bruges til at hente data på serveren eller ved build-tid.
- getInitialProps: Bruges til at hente data både på serveren og klienten.
- Konventionel routing: Routes er baseret på filstrukturen i pages mappen.
### App Router:
- Mere fleksibel routing: Tillader brug af dynamiske ruter og layout-ruter.
- Server Components: Understøtter brug af React  - Server Components, hvilket gør det muligt at hente data direkte i komponenter uden brug af getServerSideProps eller getStaticProps.
- Layout-ruter: Tillader deling af layout mellem forskellige sider.
- Suspense og Streaming: Understøtter React's - Suspense og Streaming for bedre ydeevne og brugeroplevelse.

### Eksempel på brug af App Router i fitness-next appen
```tsx
// filepath: /src/app/layout.tsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My Fitness App</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
```
brugen af layout component i en page: 
```tsx 
// filepath: /src/app/page.tsx
import React from 'react';
import Layout from './layout';

const HomePage = () => {
  return (
    <Layout>
      <p>This is the home page using the App Router.</p>
    </Layout>
  );
};

export default HomePage;
```

**øve**

"Next.js er et React-baseret framework udviklet af Vercel, der gør det nemt at bygge server-renderede og statisk genererede webapplikationer. Vigtige funktioner inkluderer server-side rendering (SSR), static site generation (SSG), API routes, automatisk kode-splitning, og indbygget CSS og Sass support.

I min fitness-next app har jeg struktureret projektet med en pages mappe til sider og en components mappe til genanvendelige komponenter. Jeg bruger også en styles mappe til CSS-filer.

Jeg har oprettet genanvendelige komponenter i components mappen og importerer dem i siderne i pages mappen. For eksempel har jeg en Header komponent, som jeg bruger i flere sider.

Jeg bruger getServerSideProps og getStaticProps til at hente data på serveren eller ved build-tid. Dette sikrer, at al nødvendig data er tilgængelig, før siden renderes.

Jeg har implementeret en Layout komponent i src/app/layout.tsx, som indeholder en header og en main sektion. Jeg bruger denne komponent til at wrappe indholdet af mine sider, hvilket sikrer et konsistent layout på tværs af applikationen.

Jeg bruger App Router til at definere dynamiske ruter og layout-ruter. For eksempel har jeg en Layout komponent, som jeg bruger til at dele layout mellem forskellige sider.

For at forbedre SEO bruger jeg Next.js' indbyggede funktioner som server-side rendering (SSR) og static site generation (SSG). Jeg inkluderer også relevante metadata i head-sektionen af mine sider ved hjælp af Next.js' Head komponent.

For at optimere ydeevnen bruger jeg automatisk kode-splitning, lazy loading af komponenter, og ved at cache data effektivt. Jeg bruger også Next.js' indbyggede optimeringsfunktioner som Image komponenten til at optimere billeder.