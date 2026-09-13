// Local validation server only. Production serves dist directly on Hostinger.
import { file, serve } from 'bun';
import { resolve, sep } from 'node:path';

const root = resolve('dist');
serve({
  hostname: '127.0.0.1',
  port: 3100,
  async fetch(request) {
    const url = new URL(request.url);
    let pathname: string;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return new Response('Bad request', { status: 400 });
    }
    const absolute = resolve(root, `.${pathname}`);
    if (absolute !== root && !absolute.startsWith(root + sep))
      return new Response('Forbidden', { status: 403 });
    const target = file(
      pathname.endsWith('/') ? `${absolute}/index.html` : absolute,
    );
    if (await target.exists()) return new Response(target);
    if (
      !pathname.endsWith('/') &&
      (await file(`${absolute}/index.html`).exists())
    )
      return Response.redirect(`${url.origin}${pathname}/${url.search}`, 301);
    const notFound = file(
      `${root}/${pathname.startsWith('/en/') ? 'en/404/index.html' : '404.html'}`,
    );
    return new Response((await notFound.exists()) ? notFound : 'Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
});
console.log('Static validation server: http://127.0.0.1:3100');
