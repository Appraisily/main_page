// scripts/integrate-appraisers.js
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - MODIFY THESE VALUES
const TEMP_DIR = path.join(__dirname, '../.temp-appraisers');
const APPRAISER_REPO = 'https://github.com/Appraisily/art-appraiser-directory-frontend.git'; // Actual repo URL
const DESTINATION = path.join(__dirname, '../public/appraisers');
const BUILD_OUTPUT_DIR = 'dist'; // The output directory of your appraisers build process

// Create temp directory
fs.ensureDirSync(TEMP_DIR);

try {
  console.log('🔄 Starting integration of appraiser pages...');
  
  // Clone or pull the repository
  if (fs.existsSync(path.join(TEMP_DIR, '.git'))) {
    console.log('📥 Pulling latest changes...');
    execSync('git pull', { cwd: TEMP_DIR, stdio: 'inherit' });
  } else {
    console.log('📥 Cloning repository...');
    execSync(`git clone ${APPRAISER_REPO} ${TEMP_DIR}`, { stdio: 'inherit' });
  }

  // Install dependencies and build
  console.log('🏗️ Building appraisers site...');
  execSync('npm install', { cwd: TEMP_DIR, stdio: 'inherit' });
  execSync('npm run build', { cwd: TEMP_DIR, stdio: 'inherit' });

  // Copy built files to destination
  console.log('📋 Copying files to public directory...');
  fs.ensureDirSync(DESTINATION);
  fs.copySync(
    path.join(TEMP_DIR, BUILD_OUTPUT_DIR),
    DESTINATION
  );

  console.log('✅ Appraiser pages successfully integrated!');
} catch (error) {
  console.error('❌ Error integrating appraiser pages:', error);
  process.exit(1);
} 