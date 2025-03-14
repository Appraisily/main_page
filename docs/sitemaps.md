# Sitemap Configuration for Appraisily

This document explains how the sitemap system is set up for the main Appraisily website and its subdomains.

## Overview

The sitemap system uses a sitemap index to organize multiple sitemaps across the main domain and subdomains:

1. **Main sitemap**: Contains all routes from the main website
2. **Sitemap index**: A master file that references both the main sitemap and all subdomain sitemaps
3. **Subdomain sitemaps**: Individual sitemaps for each subdomain (e.g., screener.appraisily.com)

## File Structure

- `public/sitemap.xml` - The sitemap index file that references all other sitemaps
- `public/sitemap-main.xml` - The sitemap for the main website (appraisily.com)
- Each subdomain should have its own `sitemap.xml` file in its root directory

## How It Works

1. When the build script runs, it generates two files:
   - `sitemap-main.xml`: Contains all the routes extracted from the main website's App.tsx
   - `sitemap.xml`: The index file that references both the main sitemap and all configured subdomain sitemaps

2. The sitemap index file (sitemap.xml) follows the standard format:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <sitemap>
       <loc>https://appraisily.com/sitemap-main.xml</loc>
       <lastmod>2024-03-13</lastmod>
     </sitemap>
     <sitemap>
       <loc>https://screener.appraisily.com/sitemap.xml</loc>
       <lastmod>2024-03-13</lastmod>
     </sitemap>
     <!-- additional subdomains would be listed here -->
   </sitemapindex>
   ```

## Adding a New Subdomain

To add a new subdomain to the sitemap index:

1. Create a sitemap.xml file in the root directory of the subdomain's website
2. Add the subdomain to the list in the `generate-sitemap.cjs` script:
   ```javascript
   const subdomains = [
     'screener',
     'new-subdomain' // Add your new subdomain here
   ];
   ```
3. Rebuild the website to generate the updated sitemap index

## Requirements for Subdomain Sitemaps

Each subdomain should:
1. Have its own sitemap.xml file at its domain root
2. Follow standard sitemap protocol (XML format with urlset namespace)
3. Be publicly accessible at `https://[subdomain].appraisily.com/sitemap.xml`

## Verification

After deployment, verify that:
1. The main sitemap is accessible at https://appraisily.com/sitemap-main.xml
2. The sitemap index is accessible at https://appraisily.com/sitemap.xml
3. Each subdomain sitemap is accessible at its appropriate URL

## Search Engine Submission

For optimal indexing:
1. Submit the sitemap index URL (https://appraisily.com/sitemap.xml) to search engines
2. Verify ownership of all domains/subdomains in search console properties
3. The sitemap index handles notifying search engines about all subdomain content 