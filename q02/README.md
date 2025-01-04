# Q02: Reactive Programming med RxJS og Netværkskommunikation i Angular
- Forklar reaktiv programmering med RxJs
- Forklar hvordan netværkskommunikation skal bruges jf. Angulars best practice med en HttpClientModule)

- start app med ( ng serve)
---

## **Reactive Programming ved hjælp af RxJS**

### **Hvad er Reactive Programming?**
Reactive Programming er et programmeringsparadigme, der arbejder med **asynkrone datastrømme**. 
Det er fordelagtigt da vi arbejder med
netværksprotokolmer som er asynkrone.
Med Reactive Extensions for JavaScript (RxJS) kan vi bruge **observables**, som er datastrømme, der udsender værdier over tid. 
RxJS er ideelt til at håndtere asynkrone operationer, såsom API-kald og brugerinteraktioner(events), fordi det reducerer kompleksiteten af at arbejde med samtidige og dynamiske hændelser.

---

### **Nøglebegreber i RxJS**

#### **1. Observables**
En **observable** repræsenterer en strøm af data, der kan udsende flere værdier over tid. 
- **Lazy Execution**: De udfører først, når en **subscriber** opretter forbindelse.
- **Typer**:
  - **Hot observables**: Begynder at producere værdier, selv før der er en subscriber.
  - **Cold observables**: Starter kun, når en subscriber forbinder sig.

**Konvention**: Variabler, der er observables, navngives ofte med `$` som suffix.

**Eksempel fra handin**:
- **Fil fra handIn**: [`src/app/services/credit-card.service.ts`](./src/app/services/credit-card.service.ts)
- **Linje 39**: `getCards()` returnerer en observable, der henter data fra en backend:
  ```typescript
  getCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(`${this.baseUrl}/cards`);
  }
  ```
- Observable.Create() bruges til at oprette brugerdefineret observables.
- .of() opretter en observable fra fasta værdier

---

#### **2. Subscriptions**
En **subscription** forbinder en observer med en observable. Dette initierer datastrømmen. 
Subscriptionen kan bruges til at afbryde forbindelsen og forhindre hukommelseslækager.

**Eksempel fra handIn**:
- **Fil**: [`src/app/card-details/card-details.component.ts`](./src/app/card-details/card-details.component.ts)
- **Linje 102-103**: Abonnerer på `getTransactions()` for at hente transaktioner:
  ```typescript
  this.creditCardService.getTransactions(cardNumber).subscribe({
    next: (transactions) => this.transactions = transactions,
    error: (err) => console.error(err),
  });
  ```
- subscriptions er altså abonneneter der starter dataflow og tillader reaktioner på data

---

#### **3. RxJs Operators**
Operators er funktioner, der manipulerer datastrømme. De bruges enten til at oprette nye observables (**creation operators**) eller ændre eksisterende (**pipeable operators**).

- **Eksempel fra handIn**: Brug af `map` til at fordoble værdierne i en liste:
  ```typescript
  const array = [10, 20, 30];
  const result = from(array).pipe(map(x => x * 2));
  result.subscribe(x => console.log(x)); // Logs: 20, 40, 60
  ```
- I projektet kunne `map` bruges til at formatere transaktioner, før de præsenteres.

- der er 4 hovedtyper: transformation (indeholder map og filter), kombination(merge, concat,combineLatest),
utility(tap til sideeffekter uden ar ændre data, take som begrænser antal værdier til en observable og debounceTime som ignorere værdier der kommer huerift efter hiananden), 
samt error handling ( catchError og retry)

---

### **Fordele ved Reactive Programming**
1. **Asynkronitet**: Gør det nemt at håndtere samtidige datastrømme.
2. **Effektivitet**: Reducerer kompleksiteten i netværks- og eventhåndtering.
3. **Modularitet**: Operators gør det nemt at genbruge logik.

---

## **Netværkskommunikation i Angular**

### **HttpClientModule**
Angulars **HttpClientModule** er et kraftfuldt værktøj til at håndtere HTTP-anmodninger. Det fungerer som et wrapper-lag omkring browserens `XMLHttpRequest`-API og gør det nemt at udføre asynkrone operationer.

---

### **Hvordan bruges HttpClientModule?**

#### **1. Opsætning**
For at bruge `HttpClient`, skal `HttpClientModule` importeres i `AppModule`.

**Eksempel**:
- **Fil**: [`src/app/app.module.ts`](./src/app/app.module.ts)
- **Linje 13**:
  ```typescript
  import { HttpClientModule } from '@angular/common/http';
  @NgModule({
    imports: [HttpClientModule]
  })
  ```

#### **2. Anvendelse af HttpClient**
`HttpClient` kan injiceres i services for at centralisere al API-logik.

**Eksempel**:
- **Fil**: [`src/app/services/credit-card.service.ts`](./src/app/services/credit-card.service.ts)
- **Linje 37**:
  ```typescript
  private http = inject(HttpClient);
  ```

#### **3. Integration med RxJS**
Alle HTTP-anmodninger returnerer observables. Dette gør det muligt at anvende RxJS operators som `map`, `filter` og `catchError`.

**Eksempel**:
- **Fil**: [`src/app/card-details/card-details.component.ts`](./src/app/card-details/card-details.component.ts)
- **Linje 103**: `getTransactions()` returnerer data som observable:
  ```typescript
  this.creditCardService.getTransactions(cardNumber).pipe(
    map(transactions => transactions.filter(t => t.amount > 0))
  ).subscribe(filteredTransactions => this.transactions = filteredTransactions);
  ```

---

### **Interceptors**
En **interceptor** er en service, der interagerer med HTTP-anmodninger og -svar. Det bruges til at tilføje fælles logik som autorisationstokens eller fejlhåndtering.

**Eksempel**:
- **Fil**: [`src/app/interceptor.ts`](./src/app/interceptor.ts)
- **Linje 14**:
  ```typescript
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone({ headers: req.headers.set('Authorization', 'Bearer TOKEN') });
    return next.handle(cloned);
  }
  ```

---

### **Fejlhåndtering**
Fejl kan håndteres med RxJS-operatoren `catchError`. Dette sikrer, at brugeren ikke ser en brudt applikation, hvis der opstår fejl.

**Eksempel**:
- **Fil**: [`src/app/card-details/card-details.component.ts`](./src/app/card-details/card-details.component.ts)
- **Linje 45**:
  ```typescript
  this.creditCardService.getTransactions(cardNumber).pipe(
    catchError(err => {
      console.error('Fejl ved hentning:', err);
      return of([]); // Returner en tom liste som fallback
    })
  ).subscribe();
  ```

---

### **Fordele ved Angulars Netværkskommunikation**
1. **Struktur**: Brug af services og DI centraliserer HTTP-logik.
2. **Reaktivitet**: Observables gør det nemt at reagere på dataændringer.
3. **Genanvendelighed**: Interceptors og RxJS operators gør koden modulær og fleksibel.
4. **Sikkerhed**: Interceptors gør det nemt at implementere fælles sikkerhedslogik.
