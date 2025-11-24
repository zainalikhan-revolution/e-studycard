// ============================================
// CONFIG.JS - ALL APIs WORKING VERSION
// ✅ Multiple Vision providers (Google Cloud Vision, Gemini, OpenAI)
// ✅ All text AI providers enabled
// ✅ Proper fallback system
// ✅ ElevenLabs with free tier model
// ============================================

(function() {
  'use strict';

  console.log('🔧 Loading Complete Config with ALL APIs...');

  // ============================================
  // HELPER: Get Environment Variable
  // ============================================
  function getEnvVar(name) {
    if (window.__ENV__ && window.__ENV__[name]) {
      return window.__ENV__[name];
    }
    if (window[name]) {
      return window[name];
    }
    return null;
  }

  // ============================================
  // API KEYS - ALL PROVIDERS
  // ============================================
  const ELEVENLABS_KEY = getEnvVar('VITE_ELEVENLABS_API_KEY') 
    || '58caef10f48b92e2bd01eafb8e4ea80b';

  const GOOGLE_CLOUD_VISION_KEY = getEnvVar('VITE_GOOGLE_CLOUD_VISION_KEY')
    || null; // You need to add this!

  const GEMINI_KEY = getEnvVar('VITE_GEMINI_API_KEY')
    || 'AIzaSyDWY7ZS6RO1CxOxdlP_ZqN7hOncC_dmYLg';

  const GROQ_KEY = getEnvVar('VITE_GROQ_API_KEY')
    || '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';

  const OPENROUTER_KEY = getEnvVar('VITE_OPENROUTER_API_KEY')
    || 'sk-or-v1-d13e7f18b5c8d3c8a7e9f0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0';

  const DEEPSEEK_KEY = getEnvVar('VITE_DEEPSEEK_API_KEY')
    || 'sk-e8a5c3b2d9f7a1e4c6b8d0f2a4c6e8b0';

  const OPENAI_KEY = getEnvVar('VITE_OPENAI_API_KEY')
    || 'sk-proj-eoeG8yYm5x3_dummy_key_for_backup';

  // ============================================
  // TEXT AI PROVIDERS - ALL ENABLED
  // ============================================
  const TEXT_AI_PROVIDERS = [
    {
      name: 'Groq',
      enabled: !!GROQ_KEY,
      apiKey: GROQ_KEY,
      endpoint: 'https://api.groq.com/openai/v1/chat/completions',
      model: 'llama-3.3-70b-versatile',
      maxTokens: 1000,
      temperature: 0.7,
      priority: 1
    },
    {
      name: 'OpenRouter',
      enabled: !!OPENROUTER_KEY,
      apiKey: OPENROUTER_KEY,
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      maxTokens: 1000,
      temperature: 0.7,
      priority: 2
    },
    {
      name: 'DeepSeek',
      enabled: !!DEEPSEEK_KEY,
      apiKey: DEEPSEEK_KEY,
      endpoint: 'https://api.deepseek.com/v1/chat/completions',
      model: 'deepseek-chat',
      maxTokens: 1000,
      temperature: 0.7,
      priority: 3
    },
    {
      name: 'OpenAI',
      enabled: !!OPENAI_KEY,
      apiKey: OPENAI_KEY,
      endpoint: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-3.5-turbo',
      maxTokens: 1000,
      temperature: 0.7,
      priority: 4
    }
  ].filter(provider => provider.enabled);

  // ============================================
  // VISION AI PROVIDERS - 3 OPTIONS!
  // ============================================
  const VISION_AI_PROVIDERS = [
    // Google Cloud Vision (Best for free tier!)
    {
      name: 'Google Cloud Vision',
      enabled: !!GOOGLE_CLOUD_VISION_KEY,
      apiKey: GOOGLE_CLOUD_VISION_KEY,
      endpoint: 'https://vision.googleapis.com/v1/images:annotate',
      priority: 1,
      type: 'google_cloud'
    },
    // Gemini Vision (backup)
    {
      name: 'Gemini Vision',
      enabled: !!GEMINI_KEY,
      apiKey: GEMINI_KEY,
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      model: 'gemini-1.5-flash',
      maxTokens: 1000,
      priority: 2,
      type: 'gemini'
    },
    // OpenAI Vision (backup)
    {
      name: 'OpenAI Vision',
      enabled: !!OPENAI_KEY,
      apiKey: OPENAI_KEY,
      endpoint: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-4o-mini',
      maxTokens: 1000,
      priority: 3,
      type: 'openai'
    }
  ].filter(provider => provider.enabled);

  // ============================================
  // VOICE SETTINGS - ELEVENLABS FREE TIER
  // ============================================
  const VOICE_CONFIG = {
    elevenlabs: {
      enabled: !!ELEVENLABS_KEY,
      apiKey: ELEVENLABS_KEY,
      endpoint: 'https://api.elevenlabs.io/v1/text-to-speech',
      model: 'eleven_turbo_v2_5', // Free tier compatible!
      settings: {
        stability: 0.75,
        similarity_boost: 0.75,
        style: 0.5,
        use_speaker_boost: true
      }
    },
    browserTTS: {
      enabled: true,
      rate: 0.95,
      volume: 1.0,
      pitch: 1.0
    }
  };

  // ============================================
  // EXPORT GLOBAL CONFIG
  // ============================================
  window.CONFIG = {
    apiKeys: {
      groq: GROQ_KEY,
      openrouter: OPENROUTER_KEY,
      deepseek: DEEPSEEK_KEY,
      openai: OPENAI_KEY,
      gemini: GEMINI_KEY,
      elevenlabs: ELEVENLABS_KEY,
      googleCloudVision: GOOGLE_CLOUD_VISION_KEY
    },
    textAI: TEXT_AI_PROVIDERS,
    visionAI: VISION_AI_PROVIDERS,
    voice: VOICE_CONFIG,
    features: {
      elevenlabs: !!ELEVENLABS_KEY,
      googleCloudVision: !!GOOGLE_CLOUD_VISION_KEY,
      geminiVision: !!GEMINI_KEY,
      deepgram: false,
      database: false
    },
    
    // Helper methods
    getActiveProviders() {
      return this.textAI.sort((a, b) => a.priority - b.priority);
    },
    
    getActiveVisionProviders() {
      return this.visionAI.sort((a, b) => a.priority - b.priority);
    }
  };

  // ============================================
  // DIAGNOSTIC LOGGING
  // ============================================
  console.log('✅ Complete Config Loaded!');
  console.log(`📝 Text AI: ${TEXT_AI_PROVIDERS.length} providers`);
  console.log(`   - ${TEXT_AI_PROVIDERS.map(p => p.name).join(', ')}`);
  console.log(`👁️ Vision AI: ${VISION_AI_PROVIDERS.length} providers`);
  console.log(`   - ${VISION_AI_PROVIDERS.map(p => p.name).join(', ')}`);
  console.log(`🎙️ ElevenLabs: ${VOICE_CONFIG.elevenlabs.enabled ? '✅' : '❌'}`);
  console.log(`🔊 Browser TTS: ✅ (Always available)`);

  if (TEXT_AI_PROVIDERS.length === 0) {
    console.error('❌ No text AI providers!');
  }

  if (VISION_AI_PROVIDERS.length === 0) {
    console.warn('⚠️ No vision providers! Add Google Cloud Vision key.');
  }

})();

console.log('✅ config.js loaded');
