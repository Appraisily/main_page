/** @type {import('tailwindcss').Config} */
const sharedConfig = require("@repo/tailwind-config");

module.exports = {
  // Extend the shared config
  ...sharedConfig,
  // Add app-specific content paths
  content: [
    ...sharedConfig.content,
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
} 