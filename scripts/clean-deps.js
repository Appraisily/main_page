/**
 * Clean Dependencies Script for Appraisily Monorepo
 *
 * This script removes node_modules directories across the monorepo
 * and optionally cleans npm cache to help resolve dependency issues.
 * It supports Windows, Mac, and Linux.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Define paths
const REPO_ROOT = path.join(__dirname, '..');
const APPS_DIR = path.join(REPO_ROOT, 'apps');
const PACKAGES_DIR = path.join(REPO_ROOT, 'packages');

// Get command line arguments
const args = process.argv.slice(2);
const cleanCache = args.includes('--cache');

// Helper for user confirmation
async function confirmAction(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(`${question} (y/N): `, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

// Remove directory helper
function removeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }

  try {
    console.log(`🧹 Removing ${dirPath}`);
    
    // Use different commands based on platform
    if (process.platform === 'win32') {
      // Windows - use RD command
      execSync(`rd /s /q "${dirPath}"`, { stdio: 'ignore' });
    } else {
      // Unix/Linux/Mac - use rm command
      execSync(`rm -rf "${dirPath}"`, { stdio: 'ignore' });
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to remove ${dirPath}: ${error.message}`);
    return false;
  }
}

// Clean node_modules in a directory and its subdirectories
async function cleanNodeModules(baseDir, dirName) {
  if (!fs.existsSync(baseDir)) {
    console.log(`📂 Directory not found: ${baseDir}`);
    return;
  }

  try {
    // Get all subdirectories
    const items = fs.readdirSync(baseDir, { withFileTypes: true });
    const directories = items.filter(item => item.isDirectory()).map(item => item.name);
    
    // Process each directory
    for (const dir of directories) {
      const fullPath = path.join(baseDir, dir);
      const nodeModulesPath = path.join(fullPath, 'node_modules');
      
      if (fs.existsSync(nodeModulesPath)) {
        console.log(`📦 Found node_modules in ${dirName}/${dir}`);
        removeDirectory(nodeModulesPath);
      }
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${baseDir}: ${error.message}`);
  }
}

// Main execution
async function main() {
  console.log('🧼 Appraisily Monorepo - Dependency Cleaner\n');
  
  // Confirm action
  const confirmed = await confirmAction('This will remove all node_modules folders in the monorepo. Continue?');
  if (!confirmed) {
    console.log('❌ Operation cancelled');
    return;
  }
  
  // Remove root node_modules
  const rootNodeModules = path.join(REPO_ROOT, 'node_modules');
  if (fs.existsSync(rootNodeModules)) {
    console.log('📦 Removing root node_modules');
    removeDirectory(rootNodeModules);
  }
  
  // Clean apps
  await cleanNodeModules(APPS_DIR, 'apps');
  
  // Clean packages
  await cleanNodeModules(PACKAGES_DIR, 'packages');
  
  // Clean npm cache if requested
  if (cleanCache) {
    console.log('🧹 Cleaning npm cache');
    try {
      execSync('npm cache clean --force', { stdio: 'inherit' });
      console.log('✅ npm cache cleaned');
    } catch (error) {
      console.error(`❌ Failed to clean npm cache: ${error.message}`);
    }
  }
  
  // Complete
  console.log('\n✨ Cleanup complete! Run "npm install" to reinstall dependencies.\n');
}

// Execute main function
main().catch(error => {
  console.error(`❌ Unexpected error: ${error.message}`);
  process.exit(1);
}); 