import { setup, draw } from "@/app/ui/info/wave";
import Sketch from "react-p5";

export default function InfoPage() {
  return (
    <div className="info">
      <h1>Info</h1>
      <h2>SDPP Radio</h2>
      <p>
        Welcome to SDPP Radio,
      </p>
      <p>
        This is a proof of concept built for CS 396-SDPP.
      </p>
      <p>
        This web radio features mixes previously aired you can access from the archive page and live radio streamed that you can play from the home page.
        You can see the live streaming schedule for the week on the schedule page.
      </p>
      <p>
        Please enjoy the music archived and streamed on this website!
      </p>
    </div>
  );
}
