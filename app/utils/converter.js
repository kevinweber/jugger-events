/*
 * Util to convert things.
 */

import ReactDOMServer from 'react-dom/server';

export function encodeSvg(reactElement) {
  return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup((reactElement)));
}
