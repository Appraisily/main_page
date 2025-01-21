import { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  try {
    // Get the original URL and path
    const url = new URL(request.url);
    const path = url.pathname;

    // Define main application routes that should not be proxied
    const mainAppRoutes = [
      '/',
      '/success-payment',
      '/about',
      '/team',
      '/services',
      '/expertise',
      '/how-it-works',
      '/report',
      '/terms',
      '/submission-success',
      '/dashboard',
      '/start'
    ];

    // Check if the path matches any main app route
    const isMainAppRoute = mainAppRoutes.some(route => 
      path === route || path.startsWith(`${route}/`)
    );

    // If it's a main app route, let Netlify handle it
    if (isMainAppRoute) {
      return context.next();
    }

    // Only proxy specific numeric paths that match your WordPress posts
    if (/^\/\d+[a-z0-9-]*\/?$/.test(path)) {
      // Construct the proxy URL
      const proxyUrl = `https://resources.appraisily.com${path}`;

      // Forward the request to WordPress
      const response = await fetch(proxyUrl, {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers),
          // Set the host header to match the WordPress site
          'Host': 'resources.appraisily.com',
          // Add headers to prevent caching issues
          'X-Forwarded-Host': url.host,
          'X-Forwarded-Proto': url.protocol.slice(0, -1)
        }
      });

      // Get the response body
      const body = await response.arrayBuffer();

      // Create headers for the response
      const headers = new Headers(response.headers);
      
      // Ensure proper security headers
      headers.set('X-Frame-Options', 'SAMEORIGIN');
      headers.set('X-Content-Type-Options', 'nosniff');
      
      // Set caching headers for better performance
      headers.set('Cache-Control', 'public, max-age=3600');

      // Return the proxied response
      return new Response(body, {
        status: response.status,
        headers
      });
    }

    // For non-matching paths, let Netlify handle them normally
    return context.next();
  } catch (error) {
    // Handle errors gracefully
    console.error('Proxy error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};