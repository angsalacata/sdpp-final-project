import { LiveStreamElement } from "./ui/live-stream-element";
import { Suspense } from "react";
import { fetchInitialGetLiveStream } from "./lib/radio-actions";

export default function Home() {

  const initialData = fetchInitialGetLiveStream()

  return (
      <main className="landing" >
          <h1 >
            Welcome to SDPP Radio
          </h1>
          <Suspense fallback = {<div>Loading Stream Info...</div>}>
          <LiveStreamElement mixKey={"https://redux-731b6892.radiocult.fm/stream"} initialData= {initialData}></LiveStreamElement>
          </Suspense>
      </main>
  );
}
