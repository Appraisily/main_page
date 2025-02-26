/**
 * Preview Production Build Script for Appraisily Monorepo
 *
 * This script runs the production build preview for both main and appraisers apps.
 * It supports Windows, Mac, and Linux.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Define paths
const MAIN_APP_PATH = path.join(__dirname, '../apps/main');
const APPRAISERS_APP_PATH = path.join(__dirname, '../apps/appraisers');

// Helper function to check if directory exists
function directoryExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (error) {
    return false;
  }
}

// Helper function to run preview based on app name
function runPreview(appName, appPath) {
  if (!directoryExists(appPath)) {
    console.error(`Error: ${appName} directory not found at ${appPath}`);
    return false;
  }

  const distPath = path.join(appPath, 'dist');
  if (!directoryExists(distPath)) {
    console.error(`Error: No build found for ${appName}. Run 'npm run build:${appName.toLowerCase()}' first.`);
    return false;
  }

  console.log(`\n📦 Starting preview server for ${appName} app...\n`);
  console.log(`🌐 Serving build from: ${distPath}\n`);

  try {
    // Change to app directory and run preview
    process.chdir(appPath);
    execSync('npm run preview', { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\n❌ Failed to start preview server for ${appName} app:`);
    console.error(error.message);
    return false;
  }
}

// Main execution
const appArg = process.argv[2]?.toLowerCase();

if (appArg === 'main') {
  runPreview('Main', MAIN_APP_PATH);
} else if (appArg === 'appraisers') {
  runPreview('Appraisers', APPRAISERS_APP_PATH);
} else {
  console.log('🚀 Appraisily Monorepo - Production Build Preview\n');
  console.log('Usage: npm run preview:[app]');
  console.log('  - npm run preview:main      - Preview main app');
  console.log('  - npm run preview:appraisers - Preview appraisers app\n');
  console.log('Make sure to build the app first with npm run build:[app]');
} 