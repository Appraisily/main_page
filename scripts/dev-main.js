/**
 * Development script for running the main app
 * 
 * Works cross-platform on Windows, Mac, and Linux
 */

const { execSync } = require('child_process');
const path = require('path');

// Define paths
const MAIN_APP_PATH = path.join(__dirname, '../apps/main');

// Change directory to main app and run dev command
try {
  console.log('Starting main app in development mode...');
  console.log(`Changing to directory: ${MAIN_APP_PATH}`);
  
  // Execute command using the appropriate method for the platform
  process.chdir(MAIN_APP_PATH);
  execSync('npm run dev', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Error running development server:');
  console.error(error);
  process.exit(1);
} 