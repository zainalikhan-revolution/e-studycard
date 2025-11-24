// ============================================
// ELEVENLABS CONFIG - FREE TIER COMPATIBLE
// ✅ Uses eleven_turbo_v2_5 (FREE TIER MODEL!)
// ✅ Multiple unique voices per tutor
// ✅ Proper error handling
// ✅ Fallback to browser TTS
// ✅ STORES AUDIO GLOBALLY FOR PAUSE/STOP
// ============================================

(function() {
  'use strict';

  console.log('🎙️ Loading ElevenLabs Voice Config...');

  // ✅ GLOBAL AUDIO STORAGE - So pause/stop buttons can control it!
  window.currentElevenLabsAudio = null;

  // ========================================
  // VOICE MAPPINGS
  // ========================================
  const TUTOR_VOICES = {
    'Albert Einstein': [
      { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', style: 'Deep, authoritative' },
      { voiceId: 'VR6AewLTigWG4xSOukaG', name: 'Arnold', style: 'Powerful, wise' },
      { voiceId: 'ErXwobaYiN019PkySvjV', name: 'Antoni', style: 'Clear, thoughtful' },
      { voiceId: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', style: 'Professional, calm' }
    ],
    'Al-Khwarizmi': [
      { voiceId: 'ErXwobaYiN019PkySvjV', name: 'Antoni', style: 'Clear, methodical' },
      { voiceId: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', style: 'Professional, wise' },
      { voiceId: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', style: 'Poetic, inspiring' },
      { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', style: 'Deep, authoritative' }
    ],
    'Marie Curie': [
      { voiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', style: 'Warm, encouraging' },
      { voiceId: 'ThT5KcBeYPX3keUQqHPh', name: 'Dorothy', style: 'Pleasant, friendly' },
      { voiceId: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda', style: 'Warm, expressive' },
      { voiceId: 'jBpfuIE2acCO8z3wKNLl', name: 'Gigi', style: 'Young, enthusiastic' }
    ],
    'Ibn Sina': [
      { voiceId: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', style: 'Professional, wise' },
      { voiceId: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', style: 'Poetic, knowledgeable' },
      { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', style: 'Deep, calm' },
      { voiceId: 'ErXwobaYiN019PkySvjV', name: 'Antoni', style: 'Clear, teaching' }
    ],
    'Alan Turing': [
      { voiceId: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', style: 'British, intelligent' },
      { voiceId: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', style: 'Professional, logical' },
      { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', style: 'Deep, analytical' },
      { voiceId: 'ErXwobaYiN019PkySvjV', name: 'Antoni', style: 'Clear, technical' }
    ],
    'Allama Iqbal': [
      { voiceId: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', style: 'Poetic, inspiring' },
      { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', style: 'Deep, powerful' },
      { voiceId: 'ErXwobaYiN019PkySvjV', name: 'Antoni', style: 'Clear, passionate' },
      { voiceId: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', style: 'Professional, wise' }
    ],
    'William Shakespeare': [
      { voiceId: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', style: 'Dramatic, theatrical' },
      { voiceId: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', style: 'British, eloquent' },
      { voiceId: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', style: 'Poetic, expressive' },
      { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', style: 'Deep, dramatic' }
    ],
    'Mirza Ghalib': [
      { voiceId: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', style: 'Poetic Urdu' },
      { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', style: 'Deep, expressive' },
      { voiceId: 'ErXwobaYiN019PkySvjV', name: 'Antoni', style: 'Clear, poetic' },
      { voiceId: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', style: 'Professional, artistic' }
    ]
  };

  // ========================================
  // VOICE SETTINGS
  // ========================================
  const VOICE_SETTINGS = {
    stability: 0.75,
    similarity_boost: 0.75,
    style: 0.5,
    use_speaker_boost: true
  };

  // ========================================
  // GET RANDOM VOICE
  // ========================================
  function getRandomVoice(tutorName) {
    const voices = TUTOR_VOICES[tutorName];
    if (!voices || voices.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * voices.length);
    return voices[randomIndex];
  }

  // ========================================
  // GET API KEY
  // ========================================
  function getElevenLabsKey() {
    if (window.CONFIG && window.CONFIG.apiKeys && window.CONFIG.apiKeys.elevenlabs) {
      return window.CONFIG.apiKeys.elevenlabs;
    }
    
    if (window.CONFIG && window.CONFIG.voice && window.CONFIG.voice.elevenlabs && window.CONFIG.voice.elevenlabs.apiKey) {
      return window.CONFIG.voice.elevenlabs.apiKey;
    }
    
    return null;
  }

  // ========================================
  // CHECK IF ENABLED
  // ========================================
  function isElevenLabsEnabled() {
    if (window.CONFIG && window.CONFIG.voice && window.CONFIG.voice.elevenlabs) {
      return window.CONFIG.voice.elevenlabs.enabled === true;
    }
    if (window.CONFIG && window.CONFIG.features) {
      return window.CONFIG.features.elevenlabs !== false;
    }
    return true;
  }

  // ========================================
  // SPEAK WITH ELEVENLABS - ✅ STORES AUDIO GLOBALLY!
  // ========================================
  window.speakWithElevenLabs = async function(text, tutorName, onStart, onEnd) {
    try {
      // Stop any previous audio
      if (window.currentElevenLabsAudio) {
        try {
          window.currentElevenLabsAudio.pause();
          window.currentElevenLabsAudio.currentTime = 0;
        } catch (e) {
          console.log('⚠️ Error stopping previous audio:', e);
        }
      }

      if (!isElevenLabsEnabled()) {
        console.log('⚠️ ElevenLabs disabled, using browser TTS');
        useBrowserTTS(text, onStart, onEnd);
        return;
      }

      const apiKey = getElevenLabsKey();
      
      if (!apiKey) {
        console.warn('⚠️ ElevenLabs API key not found, using browser TTS');
        useBrowserTTS(text, onStart, onEnd);
        return;
      }

      const voiceConfig = getRandomVoice(tutorName);
      if (!voiceConfig) {
        console.warn(`⚠️ No voice config for ${tutorName}, using browser TTS`);
        useBrowserTTS(text, onStart, onEnd);
        return;
      }

      console.log(`🎙️ ${tutorName} speaking with ElevenLabs voice: ${voiceConfig.name} (${voiceConfig.style})`);
      
      if (onStart) onStart();

      // ✅ CRITICAL FIX: Use eleven_turbo_v2_5 model (FREE TIER!)
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceConfig.voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_turbo_v2_5', // ✅ FREE TIER MODEL!
            voice_settings: VOICE_SETTINGS
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ ElevenLabs API error ${response.status}:`, errorText);
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // ✅ CRITICAL: Store audio globally so pause/stop buttons can control it!
      const audio = new Audio(audioUrl);
      window.currentElevenLabsAudio = audio; // ✅ THIS IS THE FIX!
      
      audio.volume = 1.0;
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        window.currentElevenLabsAudio = null; // Clear reference
        console.log('✅ ElevenLabs audio finished');
        if (onEnd) onEnd();
      };
      
      audio.onerror = (error) => {
        console.error('❌ Audio playback error:', error);
        URL.revokeObjectURL(audioUrl);
        window.currentElevenLabsAudio = null; // Clear reference
        if (onEnd) onEnd();
      };
      
      await audio.play();
      console.log('✅ ElevenLabs audio playing with FREE TIER model!');

    } catch (error) {
      console.error('❌ ElevenLabs error:', error);
      console.log('⚠️ Falling back to browser TTS');
      window.currentElevenLabsAudio = null; // Clear reference
      useBrowserTTS(text, onStart, onEnd);
    }
  };

  // ========================================
  // FALLBACK: BROWSER TTS
  // ========================================
  function useBrowserTTS(text, onStart, onEnd) {
    try {
      window.speechSynthesis.cancel();
      
      setTimeout(() => {
        if (onStart) onStart();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.volume = 1;
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          console.log('✅ Browser TTS finished');
          if (onEnd) onEnd();
        };
        
        utterance.onerror = (error) => {
          console.error('❌ Browser TTS error:', error);
          if (onEnd) onEnd();
        };
        
        window.speechSynthesis.speak(utterance);
        console.log('🔊 Browser TTS speaking');
      }, 150);
    } catch (error) {
      console.error('❌ Browser TTS error:', error);
      if (onEnd) onEnd();
    }
  }

  // ========================================
  // INITIALIZATION
  // ========================================
  setTimeout(() => {
    const apiKey = getElevenLabsKey();
    const enabled = isElevenLabsEnabled();
    
    if (enabled && apiKey) {
      const totalVoices = Object.values(TUTOR_VOICES).reduce((sum, voices) => sum + voices.length, 0);
      console.log('✅ ElevenLabs Config Loaded!');
      console.log(`✅ Using FREE TIER model: eleven_turbo_v2_5`);
      console.log(`✅ ElevenLabs ENABLED with API key: ${apiKey.substring(0, 8)}...`);
      console.log(`✅ ${totalVoices} unique voices configured across ${Object.keys(TUTOR_VOICES).length} tutors`);
      console.log(`✅ Audio element will be stored in window.currentElevenLabsAudio for pause/stop control`);
    } else if (!enabled) {
      console.warn('⚠️ ElevenLabs DISABLED in config - will use browser TTS');
    } else {
      console.warn('⚠️ ElevenLabs API key not found - will use browser TTS');
    }
  }, 500);

  window.TUTOR_VOICES = TUTOR_VOICES;
  window.getRandomVoice = getRandomVoice;
  window.getElevenLabsKey = getElevenLabsKey;

})();

console.log('✅ elevenlabs-config.js with PAUSE/STOP support loaded successfully');
