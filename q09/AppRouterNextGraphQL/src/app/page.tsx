import { Suspense } from "react";
import ClientComponent from "./clientcomponent/page";
import ServerComponent from "./servercomponent/page";


export default function Home() {
  return (
    <div>
      <ClientComponent />
      <Suspense fallback={<div>Loading...</div>}>  
        <ServerComponent/>
      </Suspense>
    </div>
  );
}
