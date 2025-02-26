/**
 * Post-build script for Appraisily Monorepo
 * 
 * This script copies the appraisers app build into the main app's /directory folder
 * Works cross-platform on Windows, Mac, and Linux
 */

const fs = require('fs');
const path = require('path');

// Define paths
const MAIN_APP_DIST = path.join(__dirname, '../apps/main/dist');
const APPRAISERS_APP_DIST = path.join(__dirname, '../apps/appraisers/dist');
const DIRECTORY_PATH = path.join(MAIN_APP_DIST, 'directory');

/**
 * Creates a directory if it doesn't exist
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Copy a file from source to destination
 */
function copyFile(source, destination) {
  fs.copyFileSync(source, destination);
}

/**
 * Copy entire directory and its contents
 */
function copyDirectory(source, destination) {
  // Create the destination directory if it doesn't exist
  ensureDirectoryExists(destination);
  
  // Read the source directory
  const files = fs.readdirSync(source);
  
  // Copy each file/directory
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      // Recursively copy directories
      copyDirectory(sourcePath, destPath);
    } else {
      // Copy files
      copyFile(sourcePath, destPath);
    }
  }
}

// Main execution
try {
  console.log('Starting post-build process...');
  
  // Check if source directory exists
  if (!fs.existsSync(APPRAISERS_APP_DIST)) {
    throw new Error(`Appraisers app build directory not found: ${APPRAISERS_APP_DIST}`);
  }
  
  // Check if main app build directory exists
  if (!fs.existsSync(MAIN_APP_DIST)) {
    throw new Error(`Main app build directory not found: ${MAIN_APP_DIST}`);
  }
  
  // Ensure directory path exists
  ensureDirectoryExists(DIRECTORY_PATH);
  
  // Copy appraisers app to directory folder
  console.log(`Copying from ${APPRAISERS_APP_DIST} to ${DIRECTORY_PATH}`);
  copyDirectory(APPRAISERS_APP_DIST, DIRECTORY_PATH);
  
  console.log('Post-build completed successfully!');
} catch (error) {
  console.error('Error during post-build process:');
  console.error(error);
  process.exit(1);
} 