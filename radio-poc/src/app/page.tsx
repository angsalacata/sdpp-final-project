import Image from "next/image";
import MyComponent from "./test/MyComponent";
import { MixElement } from "./ui/mix-element";
import { LiveStreamElement } from "./ui/live-stream-element";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <LiveStreamElement mixKey={"https://redux-731b6892.radiocult.fm/stream"}></LiveStreamElement>
          <MixElement mixKey={"https://s3.us-east-005.backblazeb2.com/redux-test-bucket/15acc351-b5a2-47ac-8d6a-6e9eee250423/0fb96a49-6a48-4642-9767-8cad341fa00c/d19994ad-6654-444c-ba24-f5b14edba462.mp3"}></MixElement>
        </div>
      </main>
    </div>
  );
}
