# Q09 GraphQL
<!-- References to code will be made in markdown by using: See more in line XX in [name of snippet]("PATH_TO_FILE") -->

**Questions:**

- Explain the principles of GraphQL.
- Discuss pros and cons of REST vs GraphQL.
- Show how to access a GraphQL Web API from React.
- Show how to access a GraphQL Web API from Next, and explain why it is different from doing the same in React.

## What is GraphQL

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

Building a GraphQL api can be more intensive than building a REST api. If your problem can be solved with a REST api, then you should use that. GraphQL is a good choice if you have a lot of different data sources, or if you have a lot of different clients that need different data.

![GraphQL api](./images/GraphQL.png)

Your GraphQL server uses a schema to describe the shape of your data graph. The schema specifies exactly which queries and mutations are available for clients to execute against your data graph. The schema is made with the GraphQL Schema Definition Language (SDL). The schema is the contract between the client and the server. The client can only ask for what is defined in the schema.

Example of a schema:

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

The structure of a GraphQL query is threefold. It contains three fields: Document, Variables and Meta-Information.
There are three different types of operations: Query (simple read), Mutation (write followed by a read) and Subscription (request real time data updates).

An example of a GraphQL query and response can be seen in the following snippets:

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

In this query we are asking for the name of the hero and the names of the heroes friends. The response will look like this:

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

Unless an error occurs with the request. Then the response will look something like this:

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

With GraphQL we only get exactly what we ask for and nothing more. This means that we can avoid overfetching and underfetching and don't have to make multiple requests to get the data we need or start filtering the data on the client side.

## GraphQL in Next.js

### Apollo Client

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

#### Client component

When using the apollo client for a client component in Next.js we need do to the following setup:

1. Create a new apollo client in the [lib folder](./AppRouterNextGraphQL/lib/apollo-wrapper.tsx)
2. Use the wrapper from step 1 and wrap the RootLayout in the [layout.tsx file](./AppRouterNextGraphQL/src/app/layout.tsx)
3. Create a client component and use the apollo client in the [Client component](./AppRouterNextGraphQL/src/app/clientcomponent/page.tsx)

Step 3 uses the apollo client by using the `UseSuspenseQuery` hook.

Additionally we import and use the `gql` tag to parse the query string into a query document. This can be seen in line 8 in [Client component](./AppRouterNextGraphQL/src/app/clientcomponent/page.tsx)

The client component is then instantiated on line 9 in the [Home component](./AppRouterNextGraphQL/src/app/page.tsx)

The client component only gets a name and starts a counter that increments every second.

#### Server component

Another way to use the apollo client is by using a server component.

Normally we would use getServerSideProps to enable SSR but this is only doable in the pages directory. Since the newest version of Next.js (13.4) uses the app directory there have been som changes.

In the pages directory, getServerSideProps is used to fetch data on the server and forward props to the default exported React component in the file. The initial HTML for the page is prerendered from the server, followed by "hydrating" the page in the browser (making it interactive).

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

But we sadly can't use that anymore since we are using the app directory.

Instead, we can co-locate our data fetching inside our React components. This allows us to send less JavaScript to the client, while maintaining the rendered HTML from the server.

By setting the cache option to no-store, Next.js indicates that the fetched data should never be cached. This is how we implement the getServerSideProps behaviour in the app directory. As documented on the [Next.js website](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-6-migrating-data-fetching-methods).

```typescript
// `app` directory

// This function can be named anything
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()
 
  return projects
}
 
export default async function Dashboard() {
  const projects = await getProjects()
 
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

There is a small problem with this approach. We are using apollo and the apollo client uses the `query` method. However, we can set the fetch options on the apollo query method and set the cache to no-store to still get the same behaviour.

See more in line 43 & 50 in [server component](./AppRouterNextGraphQL/src/app/servercomponent/page.tsx)

The apollo client that we use in the server component (line 40 & 47) comes from:

[server component setup](./AppRouterNextGraphQL/lib/apolloClientServer.js)

Which simply creates a new apollo client.

The server component gets a name (barbarian) and skills  

We can specify the `"server only"` and prevent client components from being used however this is not necessary.

The `cache: 'no-store'` option allows us to see the suspense fallback that is used in the `Home` component. See more in line 10 in [home component](./AppRouterNextGraphQL/src/app/page.tsx)

### Trying to use Client components in Server Only

![Server Only with client](images/image.png)

## GraphQL in React

GraphQL differs in React compared to Next.js in the sense that you don't have a server component. You only have client components.

The approach is still the same. We create a new apollo client and use the provider as a wrapper for the app. See more in line 21 in [index.js](./reactgraphql/src/index.js)

Then we create some client components that use the apollo client. See more in [line 16 & 18](./reactgraphql/src/App.js).

The functionality of the React app is quite simple. It has a dropdown menu that gets all the different classes in Dungeons and Dragons. When you select a class it will show the spells that the class can use. The dropdown menu can be seen in lines 16-22 in [App.js](./reactgraphql/src/components/Classes.js)

Then the selected class is used in the [Spells component](./reactgraphql/src/components/Spells.js).

The queries are still structured the same way as they were in Next.js.
