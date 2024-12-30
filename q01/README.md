# Q1

<!-- Hvis ikke nok: Angular data binding (Angular Components) -->

<!-- Referencer til koden vil blive lavet i markdown ved hjælp af: Se mere i linje XX i [Navn på uddrag]("STI_TIL_FIL") -->

## Introduktion - Hvad handler det om / hvad vil du tale om
### Dæk følgende punkter:
    - Explain the basic Angular concepts (components, directives, modules, services, pipes)
    - Explain how dependency injection is used in Angular
    - Explain how to component-to-component communication can be implemented 

    `ng serve` for at  starter counter demo.
    
---

Angular er et open-source JavaScript-klientside MVC-framework udviklet og vedligeholdt af Google. Angular er en komplet omskrivning af sin populære forgænger AngularJS. Angular-applikationer implementeres primært ved hjælp af TypeScript, HTML og CSS. Angular er et komponentbaseret framework, hvor komponenter er de primære byggesten i en Angular-applikation. Komponenter er genanvendelige og kan indlejres i hinanden. Komponenter er også den primære måde at kommunikere mellem forskellige dele af en Angular-applikation. Angular-applikationer bygges ved hjælp af en kombination af komponenter, direktiver, moduler, services og pipes.

Angular er et komplet framework og har en CLI, der kan bruges til at oprette og administrere Angular-applikationer.

## Angular-koncepter

### Angular-komponenter

Angular-komponenter defineres af en TypeScript-klasse samt en HTML-templat. Komponentklassen indeholder data og logik for komponenten, mens HTML-templaten indeholder visningen. Komponentklassen er dekoreret med `@Component`-dekoratoren, der indeholder metadata om komponenten. `@Component`-dekoratoren indeholder en `selector`, der bruges til at identificere komponenten i HTML-templaten, `templateUrl`, der er stien til HTML-templaten, og `styleUrls`, der er stien til CSS-filerne for komponenten.

Når en Angular-applikation oprettes, vil der altid være en App-komponent, der fungerer som root-komponent.

Strukturen kan ses i mappen kaldet `example-component` i mappen `src/app`.

Angular-komponenter kan oprettes med CLI ved hjælp af `ng g component [componentName]`, men de har funktionalitet til at være selvstændige. Selvstændige komponenter reducerer behovet for `ngModules` og kan bruges til at oprette genanvendelige komponenter. De angiver deres egne afhængigheder og kan bruges i enhver Angular-applikation. Forskellen mellem selvstændige komponenter og almindelige komponenter er, at selvstændige komponenter ikke er deklareret i en `ngModule`.

### Angular-direktiver

Der er tre forskellige typer direktiver i Angular: komponentdirektiver, attributdirektiver og strukturdirektiver.

**Komponentdirektiver:**
En komponent er den oftes anvendte type direktiv, som altid indeholder en template.

**Attributdirektiver:**
Ændrer udseendet eller adfærden af et element, en komponent eller en anden direktiv.

Nogle af disse inkluderer: `NgClass` og `NgStyle`, der kan bruges til dynamisk at tilføje eller fjerne CSS-klasser og stilarter til et element, `NgModel`, der kan bruges til at binde et input-, select- eller textarea-element til en egenskab på komponentklassen. For at bruge en attributdirektiv skal den tilføjes som attribut til et element.

Se mere i linje 1 i [Styling using NgClass](./src/app/example-component/example-component.component.html)

**Strukturdirektiver:**
Ændrer DOM-layoutet ved at tilføje og fjerne DOM-elementer.

Nogle af disse inkluderer `NgIf`, der kan bruges til at tilføje eller fjerne et element fra DOM'en baseret på en betingelse, `NgFor`, der kan bruges til at gentage en template for hvert element i en liste, og `NgSwitch`, der kan bruges til betinget at vise elementer baseret på en værdi.

Se mere i linje 14 og 16 i [List or no list](./src/app/example-component/example-component.component.html)

### Angular-services og dependency injection

En service kan være en værdi, funktion eller feature, som en applikation har brug for. En service er typisk en klasse med et snævert formål. En service registreres med Angular-injektoren, der er ansvarlig for at oprette og levere instanser af servicen, når det er nødvendigt.

Du kan oprette en service med CLI ved hjælp af `ng g service [serviceName]`.

Kode, der ikke direkte interagerer med visningen, skal placeres i en service. Ofte vil du have en asynkron service, der taler med en backend-API. Services bruges også til at dele data mellem ikke-relaterede komponenter.

For at oprette en service skal `@Injectable`-dekoratoren bruges. Denne dekorator fortæller Angular, at klassen kan bruges med dependency injection. `@Injectable`-dekoratoren er ikke strengt nødvendig, hvis servicen ikke har afhængigheder og ikke behøver at blive injiceret nogen steder, men det anses for god praksis altid at bruge den. `@Injectable` har en `providedIn`-egenskab, der bruges til at angive udbyderen af servicen. `providedIn`-egenskaben kan indstilles til `root`, hvilket betyder, at servicen leveres i root injector'en. Dette betyder, at servicen er tilgængelig overalt i applikationen. `providedIn`-egenskaben kan også indstilles til et specifikt modul, hvilket betyder, at servicen kun er tilgængelig i det modul.

Se mere i linje 8 i [Logger service](./src/app/logger.service.ts)

DI kræver, at servicen eller værdien eller funktionen efterspørges af forbrugeren. Forbrugeren er komponenten, der har brug for servicen. Forbrugeren skal efterspørge servicen i constructor'en.

### Angular-pipes

Angular-pipes er ligesom enhver anden pipe i programmering. De tager et input og transformerer det til et output. Pipes bruges til at formatere data til visning. Angular leveres med et sæt indbyggede pipes, men du kan også oprette dine egne brugerdefinerede pipes.

Pipes kan bruges ved hjælp af pipe-operatoren `|` og kan kædes til andre pipes.

Se mere i linje 23 i [Eksempel HTML](./src/app/example-component/example-component.component.html)

Der er to former for pipes i Angular: pure og impure pipes. Pure pipes kaldes kun, når Angular opdager en ændring i værdien eller parametrene, der sendes til en pipe. Impure pipes kaldes for hver ændring i change detection cycle, hvilket kan være meget dyrt. En ren pipe skal bruge en ren funktion, som er en funktion, der behandler input og returnerer værdier uden sideeffekter. Med andre ord skal en ren funktion altid returnere den samme output for det samme input.

Angular tillader også brugerdefinerede pipes. En brugerdefineret pipe kan oprettes med CLI ved hjælp af `ng g pipe [pipeName]`. For at implementere en brugerdefineret pipe skal du implementere `PipeTransform`-interfacet. `PipeTransform`-interfacet har en transform-metode, der tager en værdi og en valgfri række parametre og returnerer den transformerende værdi. Transform-metoden kaldes, når værdien eller parametrene ændres.

### Angular-moduler

Angular-moduler bruges til at organisere en applikation i sammenhængende blokke af funktionalitet. En Angular-applikation defineres af et root-modul, som er AppModule. Når du opretter en ny komponent med CLI, tilføjer CLI automatisk komponenten til AppModule. AppModule er root-modulet i applikationen og er indgangspunktet for applikationen. AppModule er dekoreret med `@NgModule`-dekoratoren, der indeholder metadata om modulet. `@NgModule`-dekoratoren indeholder `deklarations`, som er et array af komponenter, direktiver og pipes, der tilhører modulet, `imports`, som er et array af de moduler, som modulet afhænger af, `providers`, som er et array af de tjenester, som modulet leverer, og `bootstrap`, som er et array af de komponenter, der startes, når applikationen starter.

Se [AppModule](./src/app/app.module.ts)

Du kan også importere et Angular-modul eller selvstændig komponent i et andet modul.

## Komponent-til-komponent-kommunikation

Komponent-til-komponent-kommunikation kan opnås ved hjælp af `@Input`. Lad os tage et eksempel med en parent- og en child-komponent, der skal kommunikere. Parent-komponenten sender en værdi til child-komponentens variabel, der er dekoreret med `@Input`-dekoratoren. Child-komponenten kan derefter bruge denne værdi og vise den. Husk at tjekke modulet for at sikre, at alt er importeret korrekt.

Se mere i linje 26 i [Parent HTML](./src/app/example-component/example-component.component.html) og linje 12 i [Child @Input](./src/app/display-count/display-count.component.ts)
_____
øvepapir:

# Introduktion til Angular og Grundlæggende Koncepter

## Indledning
God dag, i dag vil jeg præsentere de grundlæggende aspekter af Angular, som er et kraftfuldt framework til bygning af dynamiske webapplikationer. Jeg vil gennemgå nøgleelementerne i Angular arkitekturen og demonstrere, hvordan vi har anvendt disse i vores projekt.

## Komponentbaseret Arkitektur

### Forklaring
En af hovedpillerne i Angular er dens komponentbaserede arkitektur. Komponenter er essentielle byggesten, som hver især kapsler visning og logik. Dette gør det nemmere at vedligeholde og genbruge kode. I vores projekt bruger vi en række komponenter, herunder `AppComponent` som er roden og flere underordnede komponenter som håndterer specifikke opgaver.

### Demonstration
Her på skærmen kan I se koden for `AppComponent`, som er defineret i `app.component.ts`. Notér, hvordan vi bruger `@Component`-dekorationen til at definere metadata som selector, templateUrl og styleUrls, som knytter vores TypeScript-logik til HTML og CSS.

## Direktiver og Data Binding

### Forklaring
Angular benytter sig også af direktiver, der tillader os at manipulere DOM direkte i templates. Vi anvender både strukturelle direktiver som `*ngIf` og `*ngFor` til at kontrollere, hvad der vises i brugergrænsefladen baseret på logikken i vores data.

### Demonstration
På denne slide viser jeg, hvordan `*ngIf` anvendes i `example-component.component.html` til betinget at vise elementer, afhængigt af brugerens interaktion. Dette er kraftfuldt, da det reducerer behovet for at manipulere DOM'en direkte med JavaScript og tillader en mere deklarativ tilgang.

## Services og Dependency Injection

### Forklaring
Services i Angular er singleton-objekter, der indeholder genanvendelig forretningslogik. De separerer datahåndtering fra komponenterne, hvilket gør vores kode renere og lettere at teste. Angular's dependency injection-system gør det nemt at levere disse services, hvor de er nødvendige.

### Demonstration
Se eksempelvis på vores `LoggerService`, som er defineret i `logger.service.ts`. Denne service bruges til at logge vigtige systemhændelser og fejl, og den er tilgængelig overalt i vores applikation takket være Angular's injector, som administrerer afhængighederne for os.

## Afsluttende bemærkninger

Til sammen illustrerer disse eksempler, hvordan Angulars arkitektur understøtter opbygningen af skalerbare og vedligeholdelige webapplikationer. Ved at adskille bekymringer mellem komponenter, direktiver og services, kan vi bygge mere komplekse brugergrænseflader på en organiseret måde.

### Opfordring til spørgsmål
Har I spørgsmål til de præsenterede koncepter eller specifikke dele af koden?
