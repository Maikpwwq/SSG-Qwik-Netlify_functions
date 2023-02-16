import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Qwik_React from "./react/index";

export default component$(() => {
  return (
    <div>
      <h1>MongoDB data:</h1>
      <ul>
        <li>
          <Qwik_React />
        </li>
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "SSG Qwik+React+MongoDB+Netlify",
  meta: [
    {
      name: "description",
      content: "Qwik app with netlify edge functions to MongoDB.",
    },
  ],
};
