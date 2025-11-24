// ============================================
// CHAT HELPER - Fixed for aiAgent
// ✅ Works with your aiAgent.js
// ============================================
(function() {
  'use strict';
  console.log('💬 Loading Chat Helper...');
  
  window.chatWithTutor = async function(tutor, message, conversationHistory = []) {
    try {
      console.log('📤 Chat request for:', tutor.name);
      
      // Check if aiAgent exists
      if (!window.aiAgent) {
        console.error('❌ window.aiAgent not found');
        throw new Error('AI Agent not loaded. Please refresh the page.');
      }
      
      // Build conversation context
      const context = conversationHistory
        .slice(-8)
        .map(msg => `${msg.role === 'user' ? 'Student' : tutor.name}: ${msg.content}`)
        .join('\n');
      
      // Create prompt
      const prompt = `You are ${tutor.name}, teaching ${tutor.subject}.
${context ? `Previous conversation:\n${context}\n\n` : ''}Student: ${message}

Respond as ${tutor.name}. Keep under 150 words.`;

      console.log('🤖 Calling aiAgent...');
      
      // Try generateText first
      if (typeof window.aiAgent.generateText === 'function') {
        const response = await window.aiAgent.generateText(prompt, { temperature: 0.7 });
        console.log('✅ Response received');
        return response;
      }
      
      // Try chat method as fallback
      if (typeof window.aiAgent.chat === 'function') {
        const response = await window.aiAgent.chat(prompt);
        console.log('✅ Response received via chat');
        return response;
      }
      
      // Try generate method as fallback
      if (typeof window.aiAgent.generate === 'function') {
        const response = await window.aiAgent.generate(prompt);
        console.log('✅ Response received via generate');
        return response;
      }
      
      throw new Error('AI Agent has no available methods. Check aiAgent.js configuration.');
      
    } catch (error) {
      console.error('❌ Chat error:', error);
      throw error;
    }
  };
  
  console.log('✅ window.chatWithTutor ready');
})();
