# Q07 Next

**Spørgsmål**
- 1. giv en overordnet forklaring på hvad er NextJS
- 2. forklar de forskellige komponent typer i next og hvordan man ka mixe dem
- 3. forklar hvordan App Router bruges og hvordan det er forskelligt fra Pages router.
- 4. forklar authentication og authorization i nextJS
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

opdelt i server eller klient komponenter.
For at integrere disse komponenttyper, importerer man simpelthen de regulære React-komponenter ind i sidekomponenterne for at sammensætte komplekse layouts. 
Dette giver en høj grad af genbrugelighed og modularitet.

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
Next.js tilbyder en hybrid tilgang til rendering, der tillader udviklere at vælge hvordan komponenter skal renderes og brugesz
# Mixing Server and Client Components in Next.js

## Server Components
- Renderes på serveren.
- Bruges til datahåndtering og tunge beregninger.
- Kan ikke bruge React-hooks som `useState` eller `useEffect`.

## Client Components
- Renderes i browseren.
- Bruges til interaktivitet og dynamiske opdateringer.
- Skal deklareres med `use client` i starten af filen.


### Eksempel
**Server Component (`layout.tsx`):**
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Welcome to My App</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
```

**Client Component (`Header.tsx`):**
```tsx
'use client';

import { useState } from 'react';

const Header = () => {
  const [user, setUser] = useState(null);

  return (
    <header>
      <h1>{user ? `Hello, ${user.name}` : 'Welcome!'}</h1>
    </header>
  );
};

export default Header;
```
**mixing af components**
- Brug **Server Components** til datahåndtering og performance-optimering.
- Brug **Client Components** til dynamiske elementer som knapper og formularer.
- Overfør data fra Server Components til Client Components som props.


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

```


### **Forskelle mellem App Router og Pages Router**
| **Feature**          | **App Router**                          | **Pages Router**                       |
|-----------------------|-----------------------------------------|----------------------------------------|
| Routing              | Dynamisk routing med mapper            | Filbaseret routing                     |
| Datahentning         | React Server Components                | `getServerSideProps`, `getStaticProps` |
| Layout-deling        | Indbygget med `layout.tsx`             | Manuel opsætning                       |
| Performance          | Bedre via streaming og Suspense        | Traditionel server-rendering           |

---

**Ekstra**
- **Lazy loading:** Komponenter loades kun, når de er nødvendige.
- **Metadata:** `<Head>` bruges til at optimere SEO.
- **Styling:** Understøtter CSS-moduler, Tailwind CSS og CSS-in-JS

## 4. authentication og authorization i nextJS
Authentication og authorization i Next.js håndteres typisk med **tredjeparts tjenester** som Firebase, NextAuth.js, eller ved hjælp af **JWT (JSON Web Tokens)** og sessioner. 

- **Authentication:** Validerer brugerens identitet og giver adgang til applikationen. Brugeren kan logge ind via en login-side, hvor deres token (f.eks. en JWT) gemmes i cookies eller `localStorage`.

- **Authorization:** Sikrer, at brugere kun har adgang til de dele af applikationen, der matcher deres rolle eller rettigheder. Rollen kan defineres i JWT eller sessionen.

---

## **Hvordan det bruges i Next.js**

### 1. **Authentication:**
- Brugerens token verificeres ved login og gemmes.
- Når brugeren genindlæser appen, hentes token fra cookies eller `localStorage` for at opretholde sessionen.

**Eksempel på login med token:**
```tsx
const login = (jwt: string) => {
  const decodedToken = decodeJWT(jwt);
  localStorage.setItem('jwt', jwt);
  setUser({ jwt, role: decodedToken.role });
};
```

### 2. **Authorization:**
- Rollen (`role`) fra token bruges til at beskytte sider og funktioner.
- Middleware eller server-side funktioner (f.eks. `getServerSideProps`) sikrer, at kun autoriserede brugere har adgang.

**Eksempel: Beskyttelse af sider:**
```tsx
if (user.role !== 'admin') {
  return <p>Access Denied</p>;
}
```

### 3. **Middleware til adgangskontrol:**
Middleware kan beskytte ruter baseret på tokenets tilstedeværelse eller rolle.
```tsx
export function middleware(req) {
  const token = req.cookies.get('jwt');
  if (!token) return NextResponse.redirect('/login');
  return NextResponse.next();
}
```

---

## **Hvorfor dette setup er effektivt**
- **Sikkerhed:** Tokens verificeres på hver anmodning, hvilket reducerer risikoen for uautoriseret adgang.
- **Skalerbarhed:** Rollebaseret adgang gør det nemt at håndtere flere brugergrupper.
- **Enkelt setup:** Ved brug af tredjeparts tjenester eller middleware kræves minimal backend-konfiguration.

---
**Forbindelse til projektet**
- **Authentication:** JWT gemmes i localStorage, og brugerens session bevares.
- **Authorization:** Brugerroller (`accountType`) fra JWT bruges til adgangskontrol på sider og funktioner.


 **Hvorfor JWT og React Context bruges i fitness-next**
1. **Simpelt setup uden backend:** JWT giver mulighed for authentication og sessionstyring uden en backend.
2. **Decentraliseret data:** JWT gemmes i localStorage og reducerer afhængigheden af servere.
3. **Rollebaseret adgangskontrol:** `accountType` i JWT giver fleksibilitet til at beskytte specifikke sider.

---
