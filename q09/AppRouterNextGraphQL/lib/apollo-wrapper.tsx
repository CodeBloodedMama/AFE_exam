//Use this for client components

"use client";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
    NextSSRApolloClient,
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import React from "react";



// Definer en funktion til at oprette en Apollo Client instans
function makeClient() {
    const httpLink = new HttpLink({
        uri: "https://www.dnd5eapi.co/graphql",
    });
    
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined" //SSR, if window is undefined we are on the server
            ? ApolloLink.from([
                new SSRMultipartLink({
                    stripDefer: true,
                }),
                httpLink,
            ])
        : httpLink,
    });
}


// Definer en wrapper-komponent, der bruger ApolloNextAppProvider til at integrere Apollo Client med Next.js

export function ApolloWrapper( {children} : React.PropsWithChildren ) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}