import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { TableApp } from '~/integrations/react/mui';


export const mongo = async () => {
  await fetch("https://localhost:8888/.netlify/functions/get_contacts")
    .then((res) => {
      console.log("MongoRes", res);
      res.json();
    })
    .then((docs) => {
      console.log("My-docs", docs);
    });
};

export default component$(() => {
  const count = useSignal(0);
  const mongo_data = useSignal(mongo) || "";

  return (
    <>
      <h1>Qwik/React/Netlify/MongoDB</h1>
      {mongo_data}
      <TableApp client:visible>Slider is {count.value}</TableApp>
      {/* <MUIButton variant={variant.value} host:onClick$={() => alert('click')}>
        Slider is {count.value}
      </MUIButton> */}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik React',
};
