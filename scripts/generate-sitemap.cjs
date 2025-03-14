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
    
    return routes;
  } catch (error) {
    console.error('Error extracting routes:', error);
    return [];
  }
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
  
  // XML header
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  // Add each route to the sitemap
  routes.forEach(route => {
    const url = route === '/' ? normalizedBaseUrl : `${normalizedBaseUrl}${route}`;
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
  'screener'
  // Add more subdomains here as needed
];

// Get base URL from command line argument
const baseUrl = process.argv[2];

// Generate both sitemaps
generateMainSitemap(baseUrl);
generateSitemapIndex(baseUrl, subdomains); 