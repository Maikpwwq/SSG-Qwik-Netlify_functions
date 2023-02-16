import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href="/" title="qwik">
          Qwik app with netlify edge functions to MongoDB
        </a>
      </div>      
    </header>
  );
});
