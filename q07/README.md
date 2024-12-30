# Q07 - Next

**Questions**

- Give an overview of Next.js.
- Explain the different types of components in Next, and how mix them.
- Explain how to use the App router, and how it is different from the Pages router.

## Next overview

Next.js is an open-source web development framework for React developed by Vercel. It enables serverside rendering and static generation of websites. It works well with SEO and is very fast because of the serverside rendering. It is easy to deploy the app to Vercel.

### Going from development to production

Development is optimized for developer experience with fast refresh and built-in ESLint and Typescript integraion.

When deploying to production, the optimization is focused on the end-user experience. When going to production, the code needs to be compiled, bundled, minified and code split. Next.js handles much of the code transformation and underlying structure automatically.

**Compilation** happens during development and as a part of the build step.

**Minifying** is the process of removing unnecessary characters from the code like whitespace, comments, indents and line breaks. This reduces the size of the code and improves the application's performance.

**Bundling** is the process of combining multiple files into optimized bundles. This reduces the number of requests needed to load the application.

Next has built in support for **Code splitting** where each page in the app is automatically split into its own js bundle at build time. This means that only the code needed for the current page is loaded. Shared code goes in separate bundles to avoid loading the same code multiple times. After the initial load, Next starts to prefetch code for other pages in the background.

## Types of components

Next has some predefined components like `Image` and `Link` which offer some extra functionality compared to the normal React components. `Image` handles lazy loading, responsive images and image optimization by default. `Link` provides prefetching of pages and client-side navigation. There are a couple more predefined components: `Head`, and `Script` that also optimize usage compared to the normal tags.

Next offers three different ways to render pages:

- Static generation
- Server-side rendering
- Client-side rendering

### Static generation

Static generation is the default rendering method in Next. Pages that do not need to fetch external data will automatically be statically generated at build time. It **generates HTML for each page at build time**. The HTML is then reused on each request. This is the fastest method because the HTML is already generated and ready to be served. It is also the best method for SEO because the HTML is already generated and can be indexed by search engines.

[getStaticProps](./nextjs-blog/pages/posts/[id].js) can be used to fetch external data at build time and send it to the page as props. This is useful for pages that need to fetch external data but do not need to fetch data at request time.

getStaticPaths can be used with dynamic routes to fetch all possible routes based on some fetch call at build time. The param `id` in the example above corresponds to the name of each post in the dynamic route. It is possible to set fallback to false to return a 404 page if the route does not exist.

### Server-side rendering

Server-side rendering **generates HTML on each request**. This is the slowest method because the HTML is generated on each request. It is also the worst method for SEO because the HTML is not generated until the client has loaded the page meaning that Time To First Byte will be slower.

getServerSideProps is implemented the same way as getStaticProps but it is used for server-side rendering and should only be used when there is a need to fetch data at request time.

### Client-side rendering

Client-side rendering **generates HTML on the client**. This is the slowest method because the HTML is generated on each request. It is also the worst method for SEO because the HTML is not generated until the client has loaded the page.

It is possible to make a [Client component](./nextjs-dashboard/app/ui/invoices/pagination.tsx) by adding `'use client'` in the top of a component. This will make the component render on the client, which is nessaary to make the component interactive on the UI. When using `'use client'` all other modules loaded into it will also be loaded on the client.

It is only in Client components that it is possible to use hooks like `useEffect` and `useRouter`.

## App router vs Pages router

Two different ways to handle routing in Next.js. The Pages router is the old way and the App router is the new way.

### Common for both routers

- based on the file name/path
- can contain dynamic routes
- can contain nested routes
- can contain catch-all routes like 404 pages

### Pages router

In the pages router structure pages are placed in the `pages` folder. 

It is necessary to have an App component that is placed in the [_app](./nextjs-blog/pages/_app.js) file placed in `pages/_app.js`. This is a top-level component used to initialize pages and can be used to pass props to all pages. It is also used to add global CSS styles.

Further, it is possible to add a `pages/_document.js` file to customize the HTML document. This is useful for adding external stylesheets and scripts.

A shared layout can be created in the [Layout](./nextjs-blog/components/layout.js) component. This component is then used in the pages that need it in the example it is used in the [index file](./nextjs-blog/pages/index.js).

### App router

In the app router structure pages are placed in the `app` folder.

There are different file conventions seen in the image below. All the files are automatically rendered in the hierarchy seen in the image, but can also be added manually as seen [earlier](./nextjs-dashboard/app/dashboard/(overview)/page.tsx)

![App router structure](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=1920&q=75&dpl=dpl_6CEmJB9zVD2hrQWKMJxksLPfyWfB)

Examples of the files are:

`page` is the actual page that is rendered. It is only contents returned from this file that will be publicly available meaning that anything not returned from `page` (or `route` in the `/api/` path) will only be available on the server.

When it is nesseccary to fetch large amounts of data the [loading](./nextjs-dashboard/app/dashboard/(overview)/loading.tsx) component can be used. It shows an instant loading state from the server while the content of a route segment loads. Furthermore it is possible to stream data to the client by using the [Suspense](./nextjs-dashboard/app/dashboard/(overview)/page.tsx) component. It takes a fallback component that is shown while the data is loading. This way a page will show some content while the rest of the page is loading.

[error](./nextjs-dashboard/app/dashboard/invoices/error.tsx) is used to handle errors. It takes a fallback component that is shown if an error occurs.
