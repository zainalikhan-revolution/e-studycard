// ============================================
// INJECT-ENV.JS - Build-Time Environment Variable Injection
// ✅ Reads from Vercel environment variables
// ✅ Injects into window.__ENV__ at build time
// ✅ Makes variables available to client-side code
// ============================================

const fs = require('fs');
const path = require('path');

console.log('🔧 Injecting environment variables...');

// Get all environment variables
const env = process.env;

// Filter only VITE_ prefixed variables
const viteEnv = {};
Object.keys(env).forEach(key => {
  if (key.startsWith('VITE_')) {
    viteEnv[key] = env[key];
    console.log(`  ✅ ${key}: ${env[key]?.substring(0, 10)}...`);
  }
});

// Create injection script
const injectionScript = `
// ============================================
// AUTO-GENERATED: Environment Variables
// ✅ Generated at build time by inject-env.js
// ============================================
(function() {
  'use strict';
  
  console.log('✅ Environment variables injected:', Object.keys(${JSON.stringify(viteEnv)}));
  
  window.__ENV__ = ${JSON.stringify(viteEnv, null, 2)};
  
  // Also set individual window variables for backward compatibility
  ${Object.entries(viteEnv).map(([key, value]) => 
    `window.${key} = ${JSON.stringify(value)};`
  ).join('\n  ')}
})();
`;

// Write to public directory
const publicDir = path.join(__dirname, 'public');
const envFile = path.join(publicDir, 'env.js');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write file
fs.writeFileSync(envFile, injectionScript);

console.log('✅ Environment variables injected successfully!');
console.log(`📝 Variables injected: ${Object.keys(viteEnv).join(', ')}`);
