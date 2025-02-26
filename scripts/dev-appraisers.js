/**
 * Development script for running the appraisers app
 * 
 * Works cross-platform on Windows, Mac, and Linux
 */

const { execSync } = require('child_process');
const path = require('path');

// Define paths
const APPRAISERS_APP_PATH = path.join(__dirname, '../apps/appraisers');

// Change directory to appraisers app and run dev command
try {
  console.log('Starting appraisers directory app in development mode...');
  console.log(`Changing to directory: ${APPRAISERS_APP_PATH}`);
  
  // Execute command using the appropriate method for the platform
  process.chdir(APPRAISERS_APP_PATH);
  execSync('npm run dev', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Error running development server:');
  console.error(error);
  process.exit(1);
} 