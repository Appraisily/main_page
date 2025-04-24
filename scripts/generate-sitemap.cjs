const fs = require('fs');
const path = require('path');

// Function to extract routes from App.tsx
function extractRoutesFromAppTsx() {
  try {
    const appFilePath = path.join(__dirname, '../src/App.tsx');
    const appFileContent = fs.readFileSync(appFilePath, 'utf8');
    
    // Regular expression to find Route components with path attributes
    const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
    
    const routes = [];
    let match;
    
    while ((match = routeRegex.exec(appFileContent)) !== null) {
      const route = match[1];
      // Skip dynamic routes with params for sitemap (they need special handling)
      if (!route.includes(':')) {
        routes.push(route);
      }
    }
    
    // Add any manually specified routes that might not be in the app directly
    const manualRoutes = [
      '/qualified-appraisals',
      // Add any other important pages that might not be caught by the regex
    ];
    
    // Combine and deduplicate routes
    return [...new Set([...routes, ...manualRoutes])];
  } catch (error) {
    console.error('Error extracting routes:', error);
    return [];
  }
}

// Get route metadata for better sitemap generation
function getRouteMetadata(route) {
  // Define priority and change frequency based on route importance
  const routeMetadata = {
    '/': { priority: '1.0', changefreq: 'weekly', hasImage: true },
    '/about': { priority: '0.8', changefreq: 'monthly', hasImage: false },
    '/team': { priority: '0.7', changefreq: 'monthly', hasImage: true },
    '/qualified-appraisals': { priority: '0.8', changefreq: 'monthly', hasImage: false },
    '/services': { priority: '0.9', changefreq: 'monthly', hasImage: true },
    '/expertise': { priority: '0.8', changefreq: 'monthly', hasImage: true },
    '/how-it-works': { priority: '0.9', changefreq: 'monthly', hasImage: false },
    '/terms': { priority: '0.4', changefreq: 'yearly', hasImage: false },
    '/privacy': { priority: '0.4', changefreq: 'yearly', hasImage: false },
    '/start': { priority: '0.9', changefreq: 'monthly', hasImage: false },
    '/success-payment': { priority: '0.5', changefreq: 'monthly', hasImage: false },
    '/submission-success': { priority: '0.5', changefreq: 'monthly', hasImage: false },
    '/dashboard': { priority: '0.6', changefreq: 'weekly', hasImage: false },
    '/profile': { priority: '0.5', changefreq: 'monthly', hasImage: false },
    '/login': { priority: '0.3', changefreq: 'monthly', hasImage: false },
    '/signup': { priority: '0.3', changefreq: 'monthly', hasImage: false },
    '/reset-password': { priority: '0.2', changefreq: 'monthly', hasImage: false },
  };
  
  return routeMetadata[route] || { priority: '0.5', changefreq: 'monthly', hasImage: false };
}

// Function to generate sitemap XML for the main site
function generateMainSitemap(baseUrl) {
  const routes = extractRoutesFromAppTsx();
  
  if (!baseUrl) {
    console.error('Base URL is required. Please provide it as an argument: node generate-sitemap.js https://yourdomain.com');
    process.exit(1);
  }
  
  // Normalize base URL (ensure it doesn't end with a slash)
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Current date for lastmod
  const today = new Date().toISOString().split('T')[0];
  
  // XML header with image namespace
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;
  
  // Add each route to the sitemap
  routes.forEach(route => {
    const url = route === '/' ? normalizedBaseUrl : `${normalizedBaseUrl}${route}`;
    const metadata = getRouteMetadata(route);
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${metadata.changefreq}</changefreq>
    <priority>${metadata.priority}</priority>`;
    
    if (metadata.hasImage) {
      if (route === '/') {
        sitemap += `
    <image:image>
      <image:loc>https://ik.imagekit.io/appraisily/WebPage/logo_new.png</image:loc>
      <image:title>Appraisily Logo</image:title>
    </image:image>`;
      } else if (route === '/services') {
        sitemap += `
    <image:image>
      <image:loc>https://ik.imagekit.io/appraisily/WebPage/services-hero.jpg</image:loc>
      <image:title>Art Appraisal Services</image:title>
    </image:image>`;
      }
    }
    
    sitemap += `
  </url>
`;
  });
  
  // Close XML
  sitemap += `</urlset>`;
  
  // Write to file
  const outputPath = path.join(__dirname, '../public/sitemap-main.xml');
  fs.writeFileSync(outputPath, sitemap);
  
  console.log(`Main sitemap generated successfully at ${outputPath}`);
  console.log(`Total routes: ${routes.length}`);
  
  return outputPath;
}

// Function to generate sitemap index file
function generateSitemapIndex(baseUrl, subdomains) {
  if (!baseUrl) {
    console.error('Base URL is required');
    process.exit(1);
  }
  
  // Normalize base URL (ensure it doesn't end with a slash)
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const today = new Date().toISOString().split('T')[0];
  
  // XML header
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  // Add main sitemap
  sitemapIndex += `  <sitemap>
    <loc>${normalizedBaseUrl}/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`;
  
  // Add subdomain sitemaps
  subdomains.forEach(subdomain => {
    sitemapIndex += `  <sitemap>
    <loc>https://${subdomain}.${normalizedBaseUrl.replace('https://', '')}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`;
  });
  
  // Close XML
  sitemapIndex += `</sitemapindex>`;
  
  // Write to file
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapIndex);
  
  console.log(`Sitemap index generated successfully at ${outputPath}`);
  console.log(`Total sitemaps indexed: ${subdomains.length + 1}`);
}

// Define subdomains that have sitemaps
const subdomains = [
  'screener',
  'landing-appraisers',
  'articles',
  'art-appraiser-directory',
  'antique-appraiser-directory'
  // Add more subdomains here as needed
];

// Get base URL from command line argument or use default
const baseUrl = process.argv[2] || 'https://appraisily.com';

// Generate both sitemaps
generateMainSitemap(baseUrl);
generateSitemapIndex(baseUrl, subdomains); 