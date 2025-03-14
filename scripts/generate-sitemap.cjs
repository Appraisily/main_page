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

// Function to generate sitemap XML
function generateSitemap(baseUrl) {
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
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  
  console.log(`Sitemap generated successfully at ${outputPath}`);
  console.log(`Total routes: ${routes.length}`);
}

// Get base URL from command line argument
const baseUrl = process.argv[2];
generateSitemap(baseUrl); 