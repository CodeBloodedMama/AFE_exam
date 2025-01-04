
# Q3: Routing og SSR i Angular

---

## **Routing og Modul Routing**

Single Page Applications (SPA) er nyttige, fordi de giver brugeren mulighed for kun at loade det nødvendige. Dette forbedrer både brugeroplevelsen og applikationens ydeevne.

Routing bruges i Angular til at navigere mellem forskellige komponenter og skabe en SPA med flere visninger.

Angular tilbyder en kraftfuld måde at håndtere routing på ved hjælp af **RouterModule** og **RouterLink-direktiv**. RouterModule bruges til at konfigurere routeren, og RouterLink bruges til at navigere til en specifik rute.

### **Routing i Angular**

Routing i Angular bruger en "first match wins"-strategi, hvilket betyder, at mere specifikke ruter skal placeres før mindre specifikke ruter. Du kan tilføje en RouterLink-direktiv for at linke til en rute.

**Eksempel**:
- **Fil**: [`src/app/pick/pick.component.html`](./src/app/pick/pick.component.html)
- **Linjer**: 4-9
  ```html
  <a routerLink="/home">Home</a>
  <a routerLink="/about">About</a>
  ```

Det er vigtigt at sikre, at ruter defineret med RouterLink-direktivet er angivet i RoutingModule.

**Eksempel**:
- **Fil**: [`src/app/app-routing.module.ts`](./src/app/app-routing.module.ts)
- **Linjer**: 16-19
  ```typescript
  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent }
  ];
  ```

### **Intern og Ekstern Router**
To routere kan bruges: en ekstern router til hele applikationen og en intern router til lazy-loaded moduler.

**Eksempel**:
- **Fil**: [`src/app/lazy/lazy-routing.module.ts`](./src/app/lazy/lazy-routing.module.ts)
- **Linjer**: 7-11
  ```typescript
  const routes: Routes = [
    { path: '', component: LazyComponent }
  ];
  ```

Wildcard-ruter kan bruges til at håndtere ikke-eksisterende ruter.

**Eksempel**:
- **Fil**: [`src/app/app-routing.module.ts`](./src/app/app-routing.module.ts)
- **Linje**: 27
  ```typescript
  { path: '**', component: PageNotFoundComponent }
  ```

---

## **Lazy-loading**

Angular indlæser som standard alle moduler ved applikationsstart, hvilket kan føre til ydeevneproblemer. Lazy-loading løser dette ved kun at loade moduler, når de er nødvendige.

Lazy-loading konfigureres i routeren ved hjælp af `loadChildren`-egenskaben.

**Eksempel**:
- **Fil**: [`src/app/app-routing.module.ts`](./src/app/app-routing.module.ts)
- **Linje**: 13
  ```typescript
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) }
  ```

---

## **Ruteinformation i den Navigerede Komponent**

For at få adgang til ruteinformation i en komponent kan du injicere `ActivatedRoute`-servicen i komponentens konstruktør. `ActivatedRoute` indeholder detaljer om ruten.

**Eksempel**:
- **Fil**: [`src/app/number/number.component.ts`](./src/app/number/number.component.ts)
- **Linje**: 12
  ```typescript
  constructor(private route: ActivatedRoute) {}
  ```

I visningen kan vi vise ruteinformationen.

**Eksempel**:
- **Fil**: [`src/app/number/number.component.html`](./src/app/number/number.component.html)
- **Linje**: 4
  ```html
  <p>Route number: {{ route.snapshot.params['id'] }}</p>
  ```

---

## **Route Guards**

Route guards bruges til at forhindre uautoriserede brugere i at få adgang til bestemte ruter. Der er fire typer:
1. **CanActivate**: Forhindrer uautoriserede brugere i at tilgå en rute.
2. **CanActivateChild**: Forhindrer uautoriserede brugere i at tilgå børneruter.
3. **CanDeactivate**: Forhindrer brugere i at forlade en rute.
4. **CanLoad**: Forhindrer uautoriserede brugere i at loade et modul.

Guard-logikken implementeres ved at implementere det relevante interface (fx `CanActivate`).

**Eksempel**:
- **Fil**: [`src/app/pick.guard.ts`](./src/app/pick.guard.ts)
- **Linje**: 4
  ```typescript
  export class PickGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return confirm('Are you sure you want to access this route?');
    }
  }
  ```

Guarden bruges i routeren.

**Eksempel**:
- **Fil**: [`src/app/app-routing.module.ts`](./src/app/app-routing.module.ts)
- **Linje**: 24
  ```typescript
  { path: 'protected', component: ProtectedComponent, canActivate: [PickGuard] }
  ```

---

## **Server-Side Rendering (SSR)**

Server-Side Rendering (SSR) er en teknik, hvor applikationen renderes på serveren i stedet for klienten. Dette forbedrer både SEO og ydeevnen.

### **Fordele ved SSR**
1. **SEO**: Søgemaskiner kan nemt crawle server-genereret HTML.
2. **Performance**: Hurtigere initial rendering, da serveren sender færdig HTML.

### **Teknikker i SSR**

#### **Pre-rendering**
Applikationen kører ved build-tid for at generere HTML og fange dens tilstand. Dette reducerer belastningen på serveren ved at levere statiske HTML-filer.

#### **Rehydrering**
Rehydrering er processen, hvor klientens JavaScript "booter" og genbruger den servergenererede HTML. Dette betyder, at JavaScript genskaber event listeners og dataforbindelser baseret på den eksisterende DOM, uden at genindlæse hele siden. Dette gør SSR meget effektiv til interaktive applikationer.

#### **Hydration**
Hydration er en del af rehydreringen og refererer specifikt til genoprettelsen af applikationens tilstand på klienten. Det sikrer, at klientens JavaScript synkroniseres med den server-renderede HTML. Under hydration binder Angular alle komponenter og services til DOM'en og genopretter eventuelle interaktive elementer.

---

### **Sådan Implementeres SSR**
1. Tilføj SSR-pakken:
   ```bash
   ng add @angular/ssr
   ```
2. Start applikationen med SSR:
   ```bash
   npm run dev:ssr
   ```