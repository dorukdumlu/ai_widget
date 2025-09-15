import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <script
        dangerouslySetInnerHTML={{
          __html: "(function(){ window.AI_WIDGET_VERTICAL='gym'; window.AI_WIDGET_LANG='tr'; window.AI_WIDGET_TENANT='carrera-mistral'; })();",
        }}
      />
      <script src="/widget.js" async />
    </>
  );
}
