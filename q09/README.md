# Q09 GraphQL
<!-- Referencer til kode vil blive lavet i markdown ved at bruge: Se mere i linje XX i [navn på snippet]("PATH_TO_FILE") -->

**Spørgsmål:**

1. Forklar principperne for GraphQL.
2. Diskuter fordele og ulemper ved REST vs GraphQL.
3. Vis hvordan man tilgår et GraphQL Web API fra React.
4. Vis hvordan man tilgår et GraphQL Web API fra Next.js, og forklar hvorfor det er anderledes end at gøre det samme i React.

## 1. Hvad er GraphQL

GraphQL er et forespørgselssprog designet til at gøre kommunikationen mellem klienter og servere mere effektiv og fleksibel. Udviklet af Facebook i 2012, det tillader klienter at anmode om præcis de data, de har brug for, intet mere og intet mindre.
Strukturen af en GraphQL-forespørgsel er tredelt. Den indeholder tre felter: 
- Dokument, 
- Variabler og 
- Meta-Information. 
Der er tre forskellige typer operationer:
- Query (simpel læsning), 
- Mutation (skrivning efterfulgt af en læsning) og 
- Subscription (anmodning om realtidsdataopdateringer).


### grundprincipper i grapQL

- **Effektiv datahentning**: det eliminerer både overfetching og underfetching af data. Dette betyder, at en mobil app kan begrænse mængden af data, der overføres over netværket, hvilket er kritisk for ydeevnen, især på langsomme netværksforbindelser
- **Single endpoint**: I modsætning til REST, som bruger multiple endpoints, håndterer GraphQL alle forespørgsler gennem et enkelt endpoint. Dette simplificerer logistikken betydeligt for API-management
- **stærk type definition**: GraphQL bruger et skema, der definerer, hvordan dataene skal se ud. Dette skema er både en vejledning for udviklere og en kontrakt mellem serveren og klienten, som sikrer, at dataene er præcise og konsistente.
- **introspection**: tillader graphQL API'er at blive selvbeskrivende. Klienter kan forespørge et GraphQL API om, hvilke operationer det understøtter, hvilket er en stor fordel for udviklerværktøjer og automatiseret dokumentation.

- **schema**: 
![GraphQL api](./images/GraphQL.png)

GraphQL-server bruger et schema til at beskrive formen af datagrafen. Schemaet specificerer præcis hvilke forespørgsler og mutationer, der er tilgængelige for klienter at udføre mod din datagraf. 
Schemaet er lavet med GraphQL Schema Definition Language (SDL). Schemaet fungerer som en kontrakt mellem klienten og serveren. Klienten kan kun bede om det, der er defineret i schemaet.


Eksempel på et schema:

```javascript  
type Character {
    id: ID!
    name: String!
    appearsIn: [Episode!]!
    friends: [Character]
}

type Droid {
    id: ID!
    name: String!
}

enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
}

type Query {
    hero(episode: Episode): Character
    droid(id: ID!): Droid
}
```

Et eksempel på en GraphQL-forespørgsel og svar kan ses i følgende snippets:

```javascript
// Query
{
    hero(episode: NEWHOPE) {
        name
        friends {
            name
        }
    }
}

```

I denne forespørgsel beder vi om navnet på helten og navnene på heltens venner. Svaret vil se sådan ud:

```javascript
// Response
    {
        "data": {
            "hero": {
                "name": "R2-D2",
                "friends": [
                    {
                        "name": "Luke Skywalker"
                    },
                    {
                        "name": "Han Solo"
                    },
                    {
                        "name": "Leia Organa"
                    }
                ]
            }
        }
    }
```

Medmindre der opstår en fejl med anmodningen. Så vil svaret se sådan ud:

```javascript
// Response
    {
        "errors": [
            {
                "message": "Name for character with ID 1002 could not be fetched.",
                "locations": [
                    {
                        "line": 6,
                        "column": 7
                    }
                ],
                "path": [
                    "hero",
                    "friends",
                    1,
                    "name"
                ]
            }
        ]
    }
```

Med GraphQL får vi kun præcis det, vi beder om og intet mere. Dette betyder, at vi kan undgå overfetching og underfetching og ikke behøver at lave flere anmodninger for at få de data, vi har brug for, eller begynde at filtrere dataene på klientsiden.



## 2. fordele og ulemper ved REST vs GraphQL

### fordele
Fleksible forespørgsler tillader at man kan hente specifikke resoujrcer i en enkelt forespørgsel, hvilket er minder sandsynligt i REST.
- **Præcis datahentning**: Undgå overfetching og underfetching ved at anmode om præcis de data, du har brug for.
- **Enkelt endpoint**: Alle forespørgsler håndteres gennem et enkelt endpoint, hvilket simplificerer API-management.
- **Stærk typning**: GraphQL bruger et skema, der definerer, hvordan dataene skal se ud, hvilket sikrer præcise og konsistente data.
- **Introspection**: GraphQL API'er er selvbeskrivende, hvilket er en stor fordel for udviklerværktøjer og automatiseret dokumentation.
- **Realtidsopdateringer**: Med Subscriptions kan du modtage realtidsopdateringer.

### ulemper ved graphQL 
- **Kompleks opsætning og vedligeholdelse:** Mere kompleks end REST, især for mindre projekter.
- **Caching:** Sværere at cache forespørgsler effektivt.
- **Initial overhead**: Højere initial overhead for forespørgsler.


### Sammenligning med REST:
- REST er enklere at implementere og vedligeholde for mindre projekter.
- GraphQL er bedre egnet til komplekse applikationer med mange forskellige datakilder og klienter med forskellige behov.


## 3. GraphQL in React

GraphQL adskiller sig i React sammenlignet med Next.js, da man ikke har en serverkomponent. Du har kun klientkomponenter.

Tilgangen er stadig den samme. Vi opretter en ny Apollo Client og bruger provider som en wrapper til appen. Se mere på linje 21 i[index.js](./reactgraphql/src/index.js)

Derefter opretter vi nogle klientkomponenter, der bruger Apollo Client. Se mere i [line 16 & 18](./reactgraphql/src/App.js).

Funktionaliteten af React-appen er ret simpel. Den har en dropdown-menu, der får alle de forskellige klasser i Dungeons and Dragons. Når du vælger en klasse, vil den vise de spells, som klassen kan bruge. Dropdown-menuen kan ses i linje 16-22 i [App.js](./reactgraphql/src/components/Classes.js)

Derefter bruges den valgte klasse i [Spells component](./reactgraphql/src/components/Spells.js).

Forespørgslerne er stadig struktureret på samme måde som de var i Next.js.

```javascript  
type Character {
    id: ID!
    name: String!
    appearsIn: [Episode!]!
    friends: [Character]
}

type Droid {
    id: ID!
    name: String!
}

enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
}

type Query {
    hero(episode: Episode): Character
    droid(id: ID!): Droid
}
```

## 4. GraphQL i Next.js 'npm run dev'

### Apollo Client
Apollo Client er et state management bibliotek for JavaScript, der gør det muligt at administrere både lokale og eksterne data med GraphQL. 

Apollo Clienten bruges til at hente, cache og ændre applikationsdata, alt imens UI automatisk opdateres.

#### Client component [Client component](./AppRouterNextGraphQL/src/app/clientcomponent/page.tsx)

Når man bruger en apollo client for en client komponent i NEXT.js skal man gøre følgende for opsætning:

1. Byg en ny apollo client i [lib folder](./AppRouterNextGraphQL/lib/apollo-wrapper.tsx)
2. Brug den wrapper fra trin1 og wrap RootLayout i [layout.tsx file](./AppRouterNextGraphQL/src/app/layout.tsx)
3. Byg en client komponent og brug apollo client i den i  [Client component](./AppRouterNextGraphQL/src/app/clientcomponent/page.tsx)
Trin 3 bruger apollo clienten ved at bruge  `UseSuspenseQuery` hook.

Der bliver også importet og brug  `gql` tag til at parse query string i et query document. Se linje 8 i  [Client component](./AppRouterNextGraphQL/src/app/clientcomponent/page.tsx)

Client component er instantiatet på line 9 i [Home component](./AppRouterNextGraphQL/src/app/page.tsx)
Client komponenten får et navn og starter en counter der er incrementet hvert sekund.
Man kan ikke bruge en client component i en server only, så failer den til at compile.


#### Server component [server component](./AppRouterNextGraphQL/src/app/servercomponent/page.tsx)
Man kan bruge apolloclienten i en server komponent, denne bruges til at udfører GraphQL forefspørgsler. 
Apollo clienten i server komponenten bruger asynkron datahentning, getData funktionen venter på forespørgslen fuldføres før den returerer data.
Rendering af data sker i server komponenten.

Ved at sætte cache-indstillingen til `no-store` angiver Next.js, at de hentede data aldrig skal caches.
 Implementering af  getServerSideProps-adfærden i app-mappen. Som dokumenteret på [Next.js website](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-6-migrating-data-fetching-methods)

se serverkomponenten her : [server component](./AppRouterNextGraphQL/src/app/servercomponent/page.tsx)

Apollo client vi bruger i  server component (line 40 & 47) kommer fra: [server component setup](./AppRouterNextGraphQL/lib/apolloClientServer.js) og denne instansitere en ny apollo client. 


Server component får et navn (barbarian) og en skill.

Vi kan specificere `"server only"` og forhindre klientkomponenter i at blive brugt, men dette er ikke nødvendigt.

`cache: 'no-store'` option allows us to see the suspense fallback that is used in the `Home` component. See more in line 10 in [home component](./AppRouterNextGraphQL/src/app/page.tsx)


#### Server component

En anden måde at bruge Apollo Client på er ved at bruge en serverkomponent.

Normalt ville vi bruge getServerSideProps til at aktivere SSR, men dette er kun muligt i pages mappen. Siden den nyeste version af Next.js (13.5) bruger app mappen, er der sket nogle ændringer.

I pages mappen bruges getServerSideProps til at hente data på serveren og videresende props til den standardeksporterede React-komponent i filen. Den initiale HTML for siden er prerenderet fra serveren, efterfulgt af "hydrering" af siden i browseren (gør den interaktiv).

```typescript
// `pages` directory
 
export async function getServerSideProps() {
  const res = await fetch(`https://...`)
  const projects = await res.json()
 
  return { props: { projects } }
}
 
export default function Dashboard({ projects }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```
 implementerering af getServerSideProps adfærd i app mappen. Som dokumenteret på [Next.js hjemmeside](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-6-migrating-data-fetching-methods).

See more in line 43 & 50 in [server component](./AppRouterNextGraphQL/src/app/servercomponent/page.tsx)

Apollo client component com vi bruger i  server component (line 40 & 47) kommer fra:

[server component setup](./AppRouterNextGraphQL/lib/apolloClientServer.js)

som opretter en ny apollo client. 
Serverkomponenten får et navn (barbarian) og færdigheder.

Vi kan specificere "server only" og forhindre klientkomponenter i at blive brugt, men dette er ikke nødvendigt.

 `cache: 'no-store'` tillader os at se suspense fallback som bruges i home komponenten. Se mere på  line 10 in [home component](./AppRouterNextGraphQL/src/app/page.tsx)

