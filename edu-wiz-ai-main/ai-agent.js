// ============================================
// VISION AGENT - MULTI-PROVIDER SYSTEM
// ✅ Tries all vision providers automatically
// ✅ Smart fallback system
// ✅ Supports Gemini, OpenAI, Replicate
// ============================================

import config from './config.js';

class VisionAgent {
  constructor() {
    this.providers = config.getActiveVisionProviders();
    console.log('👁️ Vision Agent initialized with providers:', this.providers.map(p => p.name));
  }

  async analyzeImage(base64Image, prompt) {
    console.log('👁️ Analyzing image with', this.providers.length, 'providers available');
    
    const errors = [];
    
    // Try each provider in priority order
    for (const provider of this.providers) {
      try {
        console.log(`🔄 Trying ${provider.name}...`);
        
        const response = await this.callProvider(provider, base64Image, prompt);
        
        console.log(`✅ ${provider.name} succeeded!`);
        return response;
        
      } catch (error) {
        console.warn(`❌ ${provider.name} failed:`, error.message);
        errors.push({ provider: provider.name, error: error.message });
      }
    }
    
    // All providers failed
    console.error('❌ All vision providers failed:', errors);
    throw new Error(`All vision providers failed. Details: ${JSON.stringify(errors)}`);
  }

  async callProvider(provider, base64Image, prompt) {
    switch (provider.name) {
      case 'Google Gemini Vision':
        return await this.callGeminiVision(provider, base64Image, prompt);
      
      case 'OpenAI Vision':
        return await this.callOpenAIVision(provider, base64Image, prompt);
      
      case 'Replicate':
        return await this.callReplicate(provider, base64Image, prompt);
      
      default:
        throw new Error(`Unknown vision provider: ${provider.name}`);
    }
  }

  async callGeminiVision(provider, base64Image, prompt) {
    const response = await fetch(`${provider.endpoint}?key=${provider.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: base64Image
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini Vision API error: ${error}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  async callOpenAIVision(provider, base64Image, prompt) {
    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${provider.apiKey}`
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }],
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI Vision API error: ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async callReplicate(provider, base64Image, prompt) {
    // Create prediction
    const createResponse = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${provider.apiKey}`
      },
      body: JSON.stringify({
        version: 'llava-v1.6-34b-latest',
        input: {
          image: `data:image/jpeg;base64,${base64Image}`,
          prompt: prompt,
          max_tokens: 1024
        }
      })
    });

    if (!createResponse.ok) {
      const error = await createResponse.text();
      throw new Error(`Replicate create error: ${error}`);
    }

    const prediction = await createResponse.json();
    
    // Poll for result
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 30;

    while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const statusResponse = await fetch(prediction.urls.get, {
        headers: { 'Authorization': `Bearer ${provider.apiKey}` }
      });

      if (!statusResponse.ok) {
        throw new Error('Failed to check prediction status');
      }

      result = await statusResponse.json();
      attempts++;
    }

    if (result.status === 'failed') {
      throw new Error('Replicate prediction failed');
    }

    if (result.status !== 'succeeded') {
      throw new Error('Replicate prediction timeout');
    }

    return result.output.join('');
  }
}

// Initialize and expose globally
const visionAgent = new VisionAgent();
window.visionAgent = visionAgent;

console.log('✅ Vision Agent ready with', visionAgent.providers.length, 'providers');
