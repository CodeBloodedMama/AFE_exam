# **Q07 Next.js**

## **Spørgsmål**
1. Giv en overordnet forklaring på, hvad Next.js er.  
2. Forklar de forskellige komponenttyper i Next.js, og hvordan man kan mixe dem.  
3. Forklar hvordan App Router bruges, og hvordan den er forskellig fra Pages Router.  
4. Forklar authentication og authorization i Next.js.

**Kør projektet med:**  
`npm run dev` i **fitness-next**.

---

## **1. Hvad er Next.js?**

Next.js er et avanceret React-framework designet til at bygge produktionsklare webapplikationer. Det tilbyder:

- **Server-Side Rendering (SSR):** HTML genereres på serveren for hurtigere indlæsning og bedre SEO.
- **Static Site Generation (SSG):** Statisk HTML genereres ved build-tid for hurtige sideloads.
- **Incremental Static Regeneration (ISR):** Opdater statiske sider uden at genopbygge hele sitet.
- **API-ruter:** Backend-funktionalitet kan bygges direkte i projektet.
- **Understøttelse for styling:** CSS-moduler, Tailwind CSS og CSS-in-JS.
- **Nem deployment:** Direkte integration med Vercel.

---

## **2. Komponenttyper i Next.js og mixing**

### **Komponenttyper**
1. **Page Components:**  
   - Definerer sider i applikationen.  
   - Understøtter SSR og SSG via `getServerSideProps` og `getStaticProps`.

2. **React-komponenter:**  
   - Genanvendelige komponenter placeret i `components` mappen.

3. **Server Components:**  
   - Renderes på serveren.  
   - Bruges til datastyring og optimering.  
   - Kan ikke bruge hooks som `useState`.

4. **Client Components:**  
   - Renderes i browseren.  
   - Bruges til dynamiske funktioner og brugerinteraktion.  
   - Skal deklareres med `use client`.

---

### **Mixing af Server og Client Components**

**Eksempel på mixing:**
- **Server Component (`layout.tsx`):**
  ```tsx
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <header>
            <h1>My App</h1>
          </header>
          {children}
        </body>
      </html>
    );
  }
  ```

- **Client Component (`Header.tsx`):**
  ```tsx
  'use client';

  const Header = () => {
    const [user, setUser] = useState(null);
    return <h1>{user ? `Welcome, ${user.name}` : 'Welcome!'}</h1>;
  };

  export default Header;
  ```

---

## **3. App Router vs. Pages Router**

### **Pages Router**
- Filbaseret routing med `pages` mappen.  
- Brug `getStaticProps` og `getServerSideProps` til datastyring.  
- Layout-deling kræver manuel opsætning.

### **App Router**
- Baseret på `app` mappen.  
- Understøtter React Server Components.  
- Delte layout-ruter og streaming for bedre ydeevne.

**Eksempel på App Router:**
```tsx
// filepath: /src/app/layout.tsx
export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>My Fitness App</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
```

**Forskelle mellem App Router og Pages Router:**

| **Feature**          | **App Router**                          | **Pages Router**                       |
|-----------------------|-----------------------------------------|----------------------------------------|
| Routing              | Dynamisk routing med mapper            | Filbaseret routing                     |
| Datahentning         | React Server Components                | `getServerSideProps`, `getStaticProps` |
| Layout-deling        | Indbygget med `layout.tsx`             | Manuel opsætning                       |
| Performance          | Bedre via streaming og Suspense        | Traditionel server-rendering           |

---

## **4. Authentication og Authorization i Next.js**

### **Authentication**
- Validerer brugerens identitet via JWT eller tredjeparts tjenester som Firebase/NextAuth.js.
- Tokens gemmes i `localStorage` eller cookies.

**Eksempel på login med JWT:**
```tsx
const login = (jwt: string) => {
  const decodedToken = decodeJWT(jwt);
  localStorage.setItem('jwt', jwt);
  setUser({ jwt, role: decodedToken.role });
};
```

### **Authorization/adgangskontrol**
- Begrænser adgang baseret på brugerroller.
- Middleware eller server-side funktioner bruges til at beskytte sider.

**Eksempel: Beskyttelse af sider:**
```tsx
if (user.role !== 'admin') {
  return <p>Access Denied</p>;
}
```

**Middleware til adgangskontrol:**
```tsx
export function middleware(req) {
  const token = req.cookies.get('jwt');
  if (!token) return NextResponse.redirect('/login');
  return NextResponse.next();
}
```

### **Hvorfor dette setup er effektivt?**
- **Sikkerhed:** Tokens verificeres ved hver anmodning.  
- **Skalerbarhed:** Let håndtering af flere brugergrupper.  
- **Enkelhed:** Kræver minimal backend-konfiguration.

---

Denne struktur gør det lettere at forstå og besvare de spørgsmål, der er stillet.
## **4. Authentication og Authorization i Next.js**

Authentication og authorization er kernefunktioner i Next.js, der sikrer, at brugere kan identificeres og gives de korrekte adgangsrettigheder.

### **Authentication**  
- Authentication handler om at validere, at en bruger er den, de udgiver sig for at være.  
- Typiske implementeringsmetoder inkluderer:  
  1. **NextAuth.js:** Bruges til OAuth-login med tjenester som Google, GitHub osv.  
  2. **Firebase Authentication:** Social login og email/password-autentificering.  
  3. **JWT (JSON Web Tokens):** Tokens genereres ved login og bruges til at gemme brugeroplysninger sikkert i `localStorage` eller cookies.  

**Eksempel på JWT-implementering i login:**  
```tsx
const login = (jwt: string) => {
  const decodedToken = decodeJWT(jwt);
  localStorage.setItem('jwt', jwt);
  setUser({ jwt, role: decodedToken.role });
};
```

### **Authorization**  
- Authorization handler om at begrænse brugerens adgang baseret på deres roller eller rettigheder.  
- Dette kan implementeres med middleware eller server-side validering:  

**Eksempel på rollebaseret adgangskontrol:**  
```tsx
if (user.role !== 'admin') {
  return <p>Access Denied</p>;
}
```

**Middleware til adgangskontrol:**  
```tsx
export function middleware(req) {
  const token = req.cookies.get('jwt');
  if (!token) return NextResponse.redirect('/login');
  return NextResponse.next();
}
```

### **Generel implementering i Next.js**  
1. **Authentication:**  
   - Brug JWT til at gemme brugeroplysninger og validere sessioner.  
   - Alternativt kan tredjeparts tjenester som Firebase bruges.  

2. **Authorization:**  
   - Middleware bruges til at beskytte ruter.  
   - Server-side kontrol sikrer, at kun autoriserede brugere kan tilgå specifikke sider.  

**Hvor det bruges i projektet:**  
I **fitness-next** er authentication og authorization implementeret med JWT. Brugerens token gemmes i `localStorage`, og rollen (`accountType`) bruges til at beskytte sider. For mere detaljer, se `auth-context.tsx`.
