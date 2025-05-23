#!/usr/bin/env node

/**
 * Script to fetch all post IDs associated with a particular user email
 * from the WordPress REST API
 * 
 * Usage: node scripts/get-user-post-ids.js <email>
 * Example: node scripts/get-user-post-ids.js user@example.com
 */

const https = require('https');

const WP_API_URL = 'https://resources.appraisily.com/wp-json/wp/v2/appraisals';

/**
 * Makes a GET request to the WordPress API
 * @param {string} url - The API URL with query parameters
 * @returns {Promise<Object>} - Parsed JSON response
 */
function fetchAppraisals(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
  });
}

/**
 * Main function to get post IDs for a user email
 * @param {string} email - User email address
 */
async function getUserPostIds(email) {
  if (!email) {
    console.error('Error: Email address is required');
    console.log('Usage: node scripts/get-user-post-ids.js <email>');
    process.exit(1);
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('Error: Invalid email format');
    process.exit(1);
  }

  try {
    console.log(`Fetching appraisals for email: ${email}`);
    
    // Build the API URL with the user email parameter
    const apiUrl = `${WP_API_URL}?user_email=${encodeURIComponent(email)}`;
    
    // Fetch appraisals from WordPress API
    const appraisals = await fetchAppraisals(apiUrl);
    
    if (!Array.isArray(appraisals)) {
      throw new Error('Invalid response format: expected an array');
    }
    
    if (appraisals.length === 0) {
      console.log(`No appraisals found for email: ${email}`);
      return;
    }
    
    // Extract post IDs
    const postIds = appraisals.map(appraisal => appraisal.id);
    
    // Output results
    console.log(`Found ${postIds.length} appraisal(s) for ${email}:`);
    console.log(`Post IDs: ${postIds.join(', ')}`);
    
    // Alternative format as requested
    const formattedIds = postIds.map(id => `post ID ${id}`).join(', ');
    console.log(`Formatted: ${formattedIds}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Get email from command line arguments
const email = process.argv[2];

// Run the script
getUserPostIds(email); 