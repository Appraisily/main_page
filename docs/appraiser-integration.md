# Art Appraiser Pages Integration

This document explains how we integrate our art appraiser pages from a separate repository into our main website.

## Overview

We've implemented an automated process that:
1. Clones/updates the art appraiser repository
2. Builds the appraiser pages
3. Copies the built files to our public directory
4. Incorporates them into our main site build

## Configuration

The integration is configured in `scripts/integrate-appraisers.js`. You need to update the following variables:

```javascript
const APPRAISER_REPO = 'https://github.com/your-username/appraiser-repo.git'; // Your repo URL
const BUILD_OUTPUT_DIR = 'dist'; // The output directory of your appraiser build
```

## Usage

### Automatic Integration

The appraiser pages are automatically integrated during the build process. When you run:

```bash
npm run build
```

The integration script will run first (via prebuild), then the regular build process continues.

### Manual Integration

If you need to integrate the appraiser pages without building the main site:

```bash
npm run integrate-appraisers
```

## Required Packages

The integration requires the following packages:
- fs-extra

Install with:

```bash
npm install --save-dev fs-extra
```

## Troubleshooting

If you encounter issues:

1. **Repository access**: Ensure you have correct permissions to access the appraiser repository
2. **Build issues**: Check that the appraiser repository builds correctly on its own
3. **Path issues**: Verify the BUILD_OUTPUT_DIR matches the actual output directory of the appraiser build

## Site Structure

After integration, the appraiser pages will be available at `/appraisers/` on your site. 