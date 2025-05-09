// netlify.js - Install optional dependencies for build
console.log('Running custom Netlify build script');
const { execSync } = require('child_process');

try {
  console.log('Installing esbuild Linux binary...');
  execSync('npm install @esbuild/linux-x64@0.21.3 --no-save', { stdio: 'inherit' });
  
  console.log('Running original build command...');
  execSync('tsc && vite build && node scripts/generate-sitemap.cjs https://appraisily.com', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 