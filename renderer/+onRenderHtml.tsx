// https://vite-plugin-ssr.com/onRenderHtml
export default onRenderHtml;

import { generateHydrationScript, isServer, renderToStream } from 'solid-js/web';
import { PageLayout } from './PageLayout';
import { escapeInject, dangerouslySkipEscape, stampPipe } from 'vite-plugin-ssr/server';
import { PageContext } from './types';

function onRenderHtml(pageContext: PageContext) {
  const { pipe } = renderToStream(() => <PageLayout container={{ type: isServer ? 'server' : 'client' }} pageContext={pageContext} />);
  stampPipe(pipe, 'node-stream');

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext;
  const title = (documentProps && documentProps.title) || 'Vite SSR app';

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="page-view">${pipe}</div>
      </body>
    </html>`;
}
