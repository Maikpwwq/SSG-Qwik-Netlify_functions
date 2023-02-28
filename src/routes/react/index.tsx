import { component$, useSignal, useResource$ } from "@builder.io/qwik"; // , useBrowserVisibleTask$
import type { DocumentHead } from "@builder.io/qwik-city";
// import { TableApp } from "~/integrations/react/mui";

export const mongo = async () => {
  await fetch(
    // "https://localhost:8888/.netlify/functions/get_contacts"
    "https://shimmering-blini-920323.netlify.app/.netlify/functions/get_mongoose"
  )
    .then((res) => {
      console.log("MongoRes", res, res.json());
      // res.json();
    })
    .then((docs) => {
      console.log("My-docs", docs);
    });
};

// export const mongoDataFetch = mongo();
// console.log("finalData", mongoDataFetch);

export default component$(() => {
  // const count = useSignal(0);
  const mongo_data = useSignal(mongo);
  const response = useResource$(mongo);

  // useBrowserVisibleTask$(() => {
  //   console.log("finalData", response.loading, response.value); //.value
  // });

  return (
    <>
      <h1>Qwik/React/Netlify/MongoDB</h1>
      {mongo_data} - {response}
      {/* <TableApp client:visible>Slider is {count.value}</TableApp> */}
      {/* <MUIButton variant={variant.value} host:onClick$={() => alert('click')}>
        Slider is {count.value}
      </MUIButton> */}
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik React",
};
