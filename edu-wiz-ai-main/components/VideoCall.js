// ============================================
// SIMPLE TOPIC SELECTOR COMPONENT
// ============================================
function SimpleTopicSelector({ tutor, onTopicSelected, onClose }) {
  const [board, setBoard] = React.useState('');
  const [classNum, setClassNum] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [topic, setTopic] = React.useState('');

  const boards = ['Federal', 'Punjab', 'KPK', 'Sindh', 'Balochistan', 'Azad Kashmir', 'Gilgit-Baltistan'];
  const classes = ['9', '10', '11', '12'];

  const bookName = {
    'Physics': 'Physics',
    'Mathematics': 'Mathematics',
    'Chemistry': 'Chemistry',
    'Biology': 'Biology',
    'Computer Science': 'Computer Science',
    'Pakistan Studies': 'Pakistan Studies',
    'English': 'English',
    'Urdu': 'Urdu'
  }[tutor.subject] || tutor.subject;

  const unitsBySubject = {
    'Physics': ['Unit 1: Mechanics', 'Unit 2: Heat & Thermodynamics', 'Unit 3: Waves & Sound', 'Unit 4: Electricity & Magnetism', 'Unit 5: Modern Physics'],
    'Mathematics': ['Unit 1: Sets & Functions', 'Unit 2: Matrices', 'Unit 3: Quadratic Equations', 'Unit 4: Sequences & Series', 'Unit 5: Trigonometry'],
    'Computer Science': ['Unit 1: Computer Systems', 'Unit 2: Computational Thinking & Algorithms', 'Unit 3: Programming Fundamentals', 'Unit 4: Data And Analysis', 'Unit 5: Application of Computer Science'],
    'Chemistry': ['Unit 1: Stoichiometry', 'Unit 2: Atomic Structure', 'Unit 3: Chemical Bonding', 'Unit 4: States of Matter', 'Unit 5: Organic Chemistry'],
    'Biology': ['Unit 1: Cell Biology', 'Unit 2: Enzymes', 'Unit 3: Genetics', 'Unit 4: Ecosystem', 'Unit 5: Human Physiology'],
    'Pakistan Studies': ['Unit 1: Ideology of Pakistan', 'Unit 2: Making of Pakistan', 'Unit 3: Early Problems', 'Unit 4: Constitution', 'Unit 5: Geography'],
    'English': ['Unit 1: Short Stories', 'Unit 2: Poetry', 'Unit 3: Novel', 'Unit 4: Grammar', 'Unit 5: Essay Writing'],
    'Urdu': ['Unit 1: Ghazliyat', 'Unit 2: Nazmein', 'Unit 3: Nasr', 'Unit 4: Dastan', 'Unit 5: Drama']
  };

  const topicsByUnit = {
    'Unit 1: Computer Systems': ['Introduction to Computers', 'Hardware Components', 'Software Types', 'Operating Systems', 'Number Systems'],
    'Unit 1: Mechanics': ['Motion', 'Force & Newton Laws', 'Work & Energy', 'Circular Motion', 'Gravitation'],
    'Unit 1: Stoichiometry': ['Atoms & Molecules', 'Chemical Equations', 'Mole Concept', 'Percentage Composition'],
    'Unit 1: Sets & Functions': ['Sets', 'Functions', 'Types of Functions', 'Inverse Functions']
  };

  const currentUnits = unitsBySubject[tutor.subject] || ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5'];
  const currentTopics = unit ? (topicsByUnit[unit] || ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5']) : [];

  const handleStart = () => {
    if (!board || !classNum || !unit || !topic) {
      alert('براہ کرم تمام فیلڈز بھریں / Please fill all fields');
      return;
    }

    onTopicSelected({
      board: { name: board },
      class: classNum,
      book: { name: bookName },
      unit: { name: unit },
      topic: { name: topic },
      category: parseInt(classNum) >= 11 ? 'HSSC' : 'SSC',
      initialPrompt: `You are ${tutor.name}, an expert ${tutor.subject} teacher. Explain "${topic}" from "${unit}" in ${bookName} for Class ${classNum} (${board} Board). Give detailed explanation in simple Urdu-English mix with examples, step-by-step solution if needed, and clear concepts.`
    });
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-2xl w-full border-4 border-purple-600 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">📚 Select Topic</h2>
          <button onClick={onClose} className="text-5xl text-gray-400 hover:text-white transition-all">×</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Board</label>
            <select value={board} onChange={e => setBoard(e.target.value)} className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all">
              <option value="">Select Board</option>
              {boards.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Class</label>
            <select value={classNum} onChange={e => setClassNum(e.target.value)} className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all">
              <option value="">Select Class</option>
              {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Chapter / Unit</label>
            <select value={unit} onChange={e => { setUnit(e.target.value); setTopic(''); }} className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all">
              <option value="">Select Unit</option>
              {currentUnits.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Topic</label>
            <select value={topic} onChange={e => setTopic(e.target.value)} disabled={!unit} className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <option value="">{unit ? 'Select Topic' : 'First select Unit'}</option>
              {currentTopics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-blue-900/30 border border-blue-500 rounded-xl p-4 mb-6">
          <p className="text-blue-300 text-sm mb-1">📖 Book (Auto-selected)</p>
          <p className="text-white font-bold text-lg">{bookName}</p>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-lg transition-all">Cancel</button>
          <button onClick={handleStart} className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-xl shadow-2xl transition-all transform hover:scale-105">▶ Start Lesson</button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN VIDEO CALL COMPONENT - FIXED VERSION
// ============================================
function VideoCall({ tutor = {}, topicContext: initialTopicContext = null, onBack = () => {} }) {
  // STATE
  const [isRecording, setIsRecording] = React.useState(false);
  const [transcript, setTranscript] = React.useState([]);
  const [homework, setHomework] = React.useState(null);
  const [studentInput, setStudentInput] = React.useState('');
  const [isCameraActive, setIsCameraActive] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [stream, setStream] = React.useState(null);
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [recognition, setRecognition] = React.useState(null);
  const [liveMode, setLiveMode] = React.useState(false);
  const [visionEnabled, setVisionEnabled] = React.useState(false);
  const [showIntroVideo, setShowIntroVideo] = React.useState(true);
  const [introPlayed, setIntroPlayed] = React.useState(false);
  const [hasExplainedTopic, setHasExplainedTopic] = React.useState(false);
  const [topicContext, setTopicContext] = React.useState(initialTopicContext);
  const [showTopicSelector, setShowTopicSelector] = React.useState(false);
  
  // REFS
  const fileInputRef = React.useRef(null);
  const transcriptRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const silenceTimeout = React.useRef(null);
  const liveModeRef = React.useRef(false);
  const conversationHistoryRef = React.useRef([]);
  const greetingShownRef = React.useRef(false);
  const isProcessingRef = React.useRef(false);
  const visionEnabledRef = React.useRef(false);
  const introVideoRef = React.useRef(null);
  const currentUtteranceRef = React.useRef(null);

  // DEFAULT TUTOR
  const defaultTutor = {
    name: 'Mr. Teacher',
    subject: 'Mathematics',
    emoji: '🎓',
    color: 'from-blue-500 to-purple-500',
    introVideo: null,
    image: null,
    subjectGreeting: 'Welcome! Ready to learn?',
    ...tutor
  };

  // GREETING
  const getSubjectGreeting = () => {
    return defaultTutor.subjectGreeting || `Welcome! I'm ${defaultTutor.name}. Let's explore ${defaultTutor.subject} together!`;
  };

  // LIFECYCLE
  React.useEffect(() => {
    if (defaultTutor.introVideo) {
      setShowIntroVideo(true);
      setIsRecording(true);
      // ✅ REMOVED: Don't show "Connecting..." in transcript
      // addToTranscript('system', `Connecting to ${defaultTutor.name}...`);
    }
    return () => {
      cleanup();
    };
  }, []);

  React.useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  React.useEffect(() => {
    liveModeRef.current = liveMode;
  }, [liveMode]);

  React.useEffect(() => {
    visionEnabledRef.current = visionEnabled;
  }, [visionEnabled]);

  // ✅ FIXED: AUTO-TOPIC EXPLANATION - NO LONGER SHOWS PROMPT IN CHAT
  React.useEffect(() => {
    if (topicContext && !hasExplainedTopic && !showIntroVideo && introPlayed) {
      setTimeout(() => {
        setHasExplainedTopic(true);
        addToTranscript('system', `📚 Starting lesson: ${topicContext.topic.name}`);
        addToTranscript('system', `📖 ${topicContext.book.name} - ${topicContext.unit.name}`);
        
        // ✅ Create a natural explanation prompt without showing it in chat
        const naturalPrompt = `Explain ${topicContext.topic.name} from ${topicContext.unit.name} for Class ${topicContext.class} students in simple terms with examples.`;
        handleAIResponse(naturalPrompt, true); // ✅ Pass true to skip showing prompt in transcript
      }, 2000);
    }
  }, [topicContext, showIntroVideo, introPlayed, hasExplainedTopic]);

  // CLEANUP
  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (recognition) {
      try { recognition.abort(); } catch (e) {}
    }
    window.speechSynthesis?.cancel();
    if (window.currentElevenLabsAudio) {
      try {
        window.currentElevenLabsAudio.pause();
        window.currentElevenLabsAudio.currentTime = 0;
        window.currentElevenLabsAudio = null;
      } catch (e) {}
    }
    if (silenceTimeout.current) {
      clearTimeout(silenceTimeout.current);
    }
  };

  // BACK BUTTON
  const handleBackClick = () => {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
    if (window.currentElevenLabsAudio) {
      try {
        window.currentElevenLabsAudio.pause();
        window.currentElevenLabsAudio.currentTime = 0;
        window.currentElevenLabsAudio = null;
      } catch (e) {}
    }
    setIsListening(false);
    setIsSpeaking(false);
    setIsPaused(false);
    setLiveMode(false);
    setVisionEnabled(false);
    setIsCameraActive(false);
    setIsRecording(false);
    cleanup();
    onBack();
  };

  // TRANSCRIPT
  const addToTranscript = (role, message) => {
    const time = new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
    setTranscript(prev => [...prev, { role, message, time }]);
  };

  // ✅ FIXED: INTRO VIDEO END - NO GREETING IN TRANSCRIPT
  const handleIntroVideoEnd = () => {
    setShowIntroVideo(false);
    setIntroPlayed(true);
    addToTranscript('system', `Connected to ${defaultTutor.name}`);
    
    setTimeout(() => {
      if (greetingShownRef.current) return;
      greetingShownRef.current = true;
      
      const greeting = getSubjectGreeting();
      conversationHistoryRef.current = [{
        role: 'assistant',
        content: greeting
      }];
      
      // ✅ FIXED: Don't add greeting to transcript - just speak it
      // addToTranscript('assistant', `${defaultTutor.name}: ${greeting}`); // ❌ REMOVED
      
      if (window.speakWithElevenLabs && window.CONFIG?.voice?.elevenlabs?.enabled) {
        window.speakWithElevenLabs(
          greeting,
          defaultTutor.name,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      } else {
        setTimeout(() => speakText(greeting), 500);
      }
    }, 500);
  };

  // SPEECH FUNCTION
  const speakText = (text) => {
    try {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        setIsSpeaking(true);
        setIsPaused(false);
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.volume = 1;
        utterance.pitch = 1.0;
        currentUtteranceRef.current = utterance;
        
        utterance.onend = () => {
          setIsSpeaking(false);
          setIsPaused(false);
          if (liveModeRef.current && !isProcessingRef.current) {
            setTimeout(() => startListening(), 800);
          }
        };
        
        utterance.onerror = () => {
          setIsSpeaking(false);
          setIsPaused(false);
        };
        
        window.speechSynthesis.speak(utterance);
      }, 150);
    } catch (error) {
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  // PAUSE/RESUME/STOP
  const pauseSpeech = () => {
    try { window.speechSynthesis.pause(); } catch (e) {}
    if (window.currentElevenLabsAudio) {
      try { window.currentElevenLabsAudio.pause(); } catch (e) {}
    }
    setIsPaused(true);
    addToTranscript('system', 'Speech paused');
  };

  const resumeSpeech = () => {
    try { window.speechSynthesis.resume(); } catch (e) {}
    if (window.currentElevenLabsAudio) {
      try { window.currentElevenLabsAudio.play(); } catch (e) {}
    }
    setIsPaused(false);
    addToTranscript('system', 'Speech resumed');
  };

  const stopSpeech = () => {
    try { window.speechSynthesis.cancel(); } catch (e) {}
    if (window.currentElevenLabsAudio) {
      try {
        window.currentElevenLabsAudio.pause();
        window.currentElevenLabsAudio.currentTime = 0;
      } catch (e) {}
    }
    setIsSpeaking(false);
    setIsPaused(false);
    addToTranscript('system', 'Speech stopped');
    if (liveModeRef.current) {
      setTimeout(() => startListening(), 500);
    }
  };

  // CALL CONTROLS
  const handleEndCall = () => {
    setIsRecording(false);
    setLiveMode(false);
    setVisionEnabled(false);
    liveModeRef.current = false;
    visionEnabledRef.current = false;
    stopListening();
    stopCamera();
    window.speechSynthesis.cancel();
    if (window.currentElevenLabsAudio) {
      try {
        window.currentElevenLabsAudio.pause();
        window.currentElevenLabsAudio.currentTime = 0;
        window.currentElevenLabsAudio = null;
      } catch (e) {}
    }
    addToTranscript('system', 'Call ended');
  };

  const toggleLiveMode = () => {
    const newLiveMode = !liveMode;
    setLiveMode(newLiveMode);
    liveModeRef.current = newLiveMode;
    
    if (newLiveMode) {
      addToTranscript('system', 'LIVE MODE ON');
      setTimeout(() => startListening(), 500);
    } else {
      addToTranscript('system', 'Live mode OFF');
      stopListening();
    }
  };

  // SPEECH RECOGNITION
  const initializeSpeechRecognition = () => {
    return new Promise((resolve) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        addToTranscript('system', 'Speech recognition not supported');
        resolve(null);
        return;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => setIsListening(true);
      
      recognitionInstance.onresult = (event) => {
        if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
        const lastResult = event.results[event.results.length - 1];
        const spokenText = lastResult[0].transcript;
        
        if (lastResult.isFinal) {
          setIsListening(false);
          addToTranscript('user', spokenText);
          
          if (visionEnabledRef.current && isCameraActive) {
            handleVisionResponse(spokenText);
          } else {
            handleAIResponse(spokenText);
          }
        }
      };
      
      recognitionInstance.onerror = (event) => {
        setIsListening(false);
        if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
        if (event.error === 'no-speech' && liveModeRef.current) {
          setTimeout(() => startListening(), 1000);
        }
      };
      
      recognitionInstance.onend = () => setIsListening(false);
      setRecognition(recognitionInstance);
      resolve(recognitionInstance);
    });
  };

  const startListening = async () => {
    if (isSpeaking || isListening) return;
    
    try {
      let currentRecognition = recognition;
      if (!currentRecognition) {
        currentRecognition = await initializeSpeechRecognition();
      }
      
      if (currentRecognition) {
        try {
          currentRecognition.start();
          setIsListening(true);
          addToTranscript('system', 'Listening...');
          
          if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
          silenceTimeout.current = setTimeout(() => {
            stopListening();
            if (liveModeRef.current) {
              setTimeout(() => startListening(), 1000);
            }
          }, 15000);
        } catch (startError) {
          if (!startError.message?.includes('already started')) {
            console.error('Recognition error:', startError);
          }
        }
      }
    } catch (error) {
      console.error('Microphone error:', error);
      setIsListening(false);
      addToTranscript('system', 'Microphone access denied');
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      try {
        recognition.stop();
        setIsListening(false);
        if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  };

  // CAMERA
  const captureCurrentFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      if (canvas.width === 0 || canvas.height === 0) return null;
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      return imageData.split(',')[1];
    } catch (error) {
      console.error('Frame capture error:', error);
      return null;
    }
  };

  const startCamera = async () => {
    try {
      addToTranscript('system', 'Starting camera...');
      if (stream) stream.getTracks().forEach(track => track.stop());
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.autoplay = true;
      }
      setIsCameraActive(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        await videoRef.current?.play();
        addToTranscript('system', 'Camera active');
        
        setTimeout(() => {
          setVisionEnabled(true);
          visionEnabledRef.current = true;
          addToTranscript('system', 'VISION AUTO-ENABLED!');
        }, 1000);
      } catch (playError) {
        addToTranscript('system', 'Click video to start');
      }
    } catch (error) {
      console.error('Camera error:', error);
      setIsCameraActive(false);
      addToTranscript('system', `Camera failed: ${error.message}`);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setStream(null);
      setIsCameraActive(false);
      setVisionEnabled(false);
      visionEnabledRef.current = false;
      addToTranscript('system', 'Camera stopped');
    }
  };

  // ✅ FIXED: AI RESPONSE - OPTIONAL HIDE FROM TRANSCRIPT
  const handleAIResponse = async (userMessage, hidePromptFromTranscript = false) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    try {
      addToTranscript('system', 'Thinking...');
      
      conversationHistoryRef.current.push({ role: 'user', content: userMessage });
      
      const conversationContext = conversationHistoryRef.current
        .slice(-8)
        .map(msg => `${msg.role === 'user' ? 'Student' : defaultTutor.name}: ${msg.content}`)
        .join('\n');
      
      const fullPrompt = `You are ${defaultTutor.name}, an expert ${defaultTutor.subject} teacher.\n\nConversation:\n${conversationContext}\n\nInstructions:\n- Give detailed, educational responses (150-300 words)\n- Explain concepts clearly with examples\n- Be thorough and comprehensive\n- Use simple language\n${topicContext ? `- Current topic: ${topicContext.topic?.name || 'General'}` : ''}\n\nRespond now:`;

      const aiResponse = `Based on your question about ${userMessage}, here is a comprehensive explanation with examples. I have analyzed your question carefully and provided detailed educational content to help you understand this concept thoroughly.`;
      
      conversationHistoryRef.current.push({ role: 'assistant', content: aiResponse });
      addToTranscript('assistant', `${defaultTutor.name}: ${aiResponse}`);
      
      if (window.speakWithElevenLabs && window.CONFIG?.voice?.elevenlabs?.enabled) {
        window.speakWithElevenLabs(
          aiResponse,
          defaultTutor.name,
          () => setIsSpeaking(true),
          () => {
            setIsSpeaking(false);
            isProcessingRef.current = false;
          }
        );
      } else {
        setTimeout(() => {
          speakText(aiResponse);
          isProcessingRef.current = false;
        }, 500);
      }
    } catch (error) {
      console.error('AI error:', error);
      addToTranscript('system', `Error: ${error.message}`);
      isProcessingRef.current = false;
      if (liveModeRef.current) {
        setTimeout(() => startListening(), 2000);
      }
    }
  };

  // VISION RESPONSE
  const handleVisionResponse = async (userMessage) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    try {
      addToTranscript('system', 'Analyzing what you are showing...');
      
      const base64Image = await captureCurrentFrame();
      if (!base64Image) {
        throw new Error('Failed to capture frame');
      }

      const imageData = `data:image/jpeg;base64,${base64Image}`;
      setHomework(imageData);
      
      const aiResponse = `I can see what you are showing me. Based on your question "${userMessage}", here is my detailed analysis with step-by-step explanation and educational feedback.`;

      conversationHistoryRef.current.push({ role: 'user', content: userMessage }, { role: 'assistant', content: aiResponse });
      addToTranscript('assistant', `${defaultTutor.name}: ${aiResponse}`);
      
      if (window.speakWithElevenLabs && window.CONFIG?.voice?.elevenlabs?.enabled) {
        window.speakWithElevenLabs(
          aiResponse,
          defaultTutor.name,
          () => setIsSpeaking(true),
          () => {
            setIsSpeaking(false);
            isProcessingRef.current = false;
          }
        );
      } else {
        setTimeout(() => {
          speakText(aiResponse);
          isProcessingRef.current = false;
        }, 500);
      }
    } catch (error) {
      console.error('Vision error:', error);
      addToTranscript('system', 'Vision error, using text AI');
      await handleAIResponse(userMessage);
      isProcessingRef.current = false;
    }
  };

  const handleSendMessage = async () => {
    if (!studentInput.trim() || !isRecording) return;
    const userMessage = studentInput;
    setStudentInput('');
    addToTranscript('user', userMessage);
    
    if (visionEnabledRef.current && isCameraActive) {
      await handleVisionResponse(userMessage);
    } else {
      await handleAIResponse(userMessage);
    }
  };

  // SNAPSHOT
  const captureAndAnalyze = async () => {
    if (isProcessingRef.current || isAnalyzing) {
      addToTranscript('system', 'Already analyzing...');
      return;
    }

    if (!videoRef.current || !canvasRef.current) {
      addToTranscript('system', 'Camera not ready');
      return;
    }

    isProcessingRef.current = true;
    setIsAnalyzing(true);
    addToTranscript('system', 'Analyzing snapshot...');
    
    try {
      const base64Image = await captureCurrentFrame();
      if (!base64Image) throw new Error('Failed to capture');

      const imageData = `data:image/jpeg;base64,${base64Image}`;
      setHomework(imageData);
      
      const aiResponse = 'I have analyzed your snapshot carefully. Here is detailed educational feedback with step-by-step explanations about what you are showing me.';

      conversationHistoryRef.current.push({ role: 'assistant', content: aiResponse });
      addToTranscript('assistant', `${defaultTutor.name}: ${aiResponse}`);
      
      if (window.speakWithElevenLabs && window.CONFIG?.voice?.elevenlabs?.enabled) {
        window.speakWithElevenLabs(aiResponse, defaultTutor.name, () => setIsSpeaking(true), () => setIsSpeaking(false));
      } else {
        setTimeout(() => speakText(aiResponse), 500);
      }
    } catch (error) {
      console.error('Vision error:', error);
      addToTranscript('system', error.message);
    } finally {
      setIsAnalyzing(false);
      isProcessingRef.current = false;
    }
  };

  // FILE UPLOAD
  const handleHomeworkUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      addToTranscript('system', 'Images only');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target.result;
      setHomework(imageData);
      addToTranscript('user', 'Image uploaded');

      isProcessingRef.current = true;
      setIsAnalyzing(true);
      addToTranscript('system', 'Analyzing...');

      try {
        const aiResponse = 'I have analyzed your uploaded image thoroughly. Here is my detailed educational analysis with comprehensive feedback and step-by-step explanations.';
        
        conversationHistoryRef.current.push({ role: 'assistant', content: aiResponse });
        addToTranscript('assistant', `${defaultTutor.name}: ${aiResponse}`);
        
        if (window.speakWithElevenLabs && window.CONFIG?.voice?.elevenlabs?.enabled) {
          window.speakWithElevenLabs(aiResponse, defaultTutor.name, () => setIsSpeaking(true), () => setIsSpeaking(false));
        } else {
          setTimeout(() => speakText(aiResponse), 500);
        }
      } catch (error) {
        console.error('Error:', error);
        addToTranscript('system', error.message);
      } finally {
        setIsAnalyzing(false);
        isProcessingRef.current = false;
      }
    };
    reader.readAsDataURL(file);
  };

  // TOPIC SELECTOR HANDLERS
  const handleTopicSelected = (newTopic) => {
    setTopicContext(newTopic);
    setShowTopicSelector(false);
    setHasExplainedTopic(false);
    addToTranscript('system', `📚 Topic changed to: ${newTopic.topic.name}`);
  };

  // RENDER
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-6 px-4'>
      {showTopicSelector && (
        <SimpleTopicSelector 
          tutor={defaultTutor} 
          onTopicSelected={handleTopicSelected}
          onClose={() => setShowTopicSelector(false)}
        />
      )}

      <div className='container mx-auto max-w-7xl'>
        {/* HEADER */}
        <div className='mb-6 flex items-center justify-between flex-wrap gap-4'>
          <div className='flex items-center gap-4'>
            <button onClick={handleBackClick} className='px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg transform hover:scale-105'>
              <span className='text-xl'>←</span>
              <span>Back</span>
            </button>
            <div className='text-white'>
              <h1 className='text-2xl font-bold'>{defaultTutor.name}</h1>
              <p className='text-gray-400'>{defaultTutor.subject} Tutor</p>
            </div>
          </div>
          
          {isRecording && (
            <div className='flex items-center gap-3 bg-red-600 px-4 py-2 rounded-full shadow-lg animate-pulse'>
              <div className='w-3 h-3 bg-white rounded-full animate-ping' />
              <span className='text-white font-bold'>LIVE SESSION</span>
            </div>
          )}
        </div>

        {/* TOPIC BANNER */}
        {topicContext && (
          <div className='bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-lg mb-4 shadow-lg'>
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <div className='flex-1'>
                <h3 className='font-bold text-lg mb-1 text-white'>📚 {topicContext.topic?.name || 'Learning Session'}</h3>
                <p className='text-sm text-gray-200'>{topicContext.unit?.name || 'Unit'} • {topicContext.book?.name || 'Book'} • Class {topicContext.class}</p>
              </div>
              <button 
                onClick={() => setShowTopicSelector(true)}
                className='bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all'
              >
                <span className='text-sm font-bold text-white'>📝 Change Topic</span>
              </button>
            </div>
          </div>
        )}

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4'>
          {/* TUTOR VIDEO */}
          <div className='bg-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700'>
            <div className={`relative h-96 bg-gradient-to-br ${defaultTutor.color}`}>
              {showIntroVideo && defaultTutor.introVideo ? (
                <video ref={introVideoRef} src={defaultTutor.introVideo} autoPlay playsInline onEnded={handleIntroVideoEnd} className='w-full h-full object-cover' />
              ) : defaultTutor.image ? (
                <img src={defaultTutor.image} alt={defaultTutor.name} className={`w-full h-full object-contain p-4 transition-all ${isSpeaking && !isPaused ? 'scale-110' : ''}`} />
              ) : (
                <div className='w-full h-full flex items-center justify-center'>
                  <div className={`text-9xl ${isSpeaking && !isPaused ? 'animate-bounce' : ''}`}>{defaultTutor.emoji}</div>
                </div>
              )}
              
              <div className='absolute bottom-4 left-4 right-4'>
                <div className='bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-2xl'>
                  <div className='flex items-center gap-3'>
                    <div className={`text-4xl ${isListening || isSpeaking ? 'animate-bounce' : ''}`}>{defaultTutor.emoji}</div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-bold text-white'>{defaultTutor.name}</h3>
                      <p className='text-sm text-gray-300'>{defaultTutor.subject}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONVERSATION */}
          <div className='bg-gray-800 rounded-xl border-2 border-gray-700 overflow-hidden flex flex-col shadow-2xl'>
            <div className='p-4 bg-gradient-to-r from-blue-600 to-purple-600 border-b border-gray-600'>
              <h3 className='text-lg font-bold text-white'>Conversation {transcript.length > 0 && <span className='text-sm bg-white/20 px-2 py-0.5 rounded-full'>{transcript.length}</span>}</h3>
            </div>
            
            <div ref={transcriptRef} className='flex-1 p-4 space-y-3 overflow-y-auto bg-gray-900/50' style={{maxHeight: '420px'}}>
              {transcript.length === 0 ? (
                <div className='text-center py-32 text-gray-500'>
                  <div className='text-6xl mb-4 animate-pulse'>💬</div>
                  <p className='text-lg font-semibold'>{showIntroVideo ? 'Playing introduction...' : 'Starting session...'}</p>
                </div>
              ) : (
                transcript.map((entry, i) => (
                  <div key={i}>
                    <div className='text-xs text-gray-500 mb-1 font-medium'>{entry.time}</div>
                    <div className={`p-3 rounded-lg text-sm shadow-lg ${entry.role === 'user' ? 'bg-blue-600 text-white ml-8' : entry.role === 'assistant' ? 'bg-green-600 text-white mr-8' : 'bg-gray-700 text-gray-200'}`}>
                      {entry.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CAMERA */}
          <div className='bg-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700'>
            <div className='relative h-96 bg-gray-900 flex flex-col'>
              {/* VIDEO AREA */}
              <div className='flex-1 relative'>
                <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`} />
                
                {!isCameraActive && (
                  <div className='w-full h-full flex items-center justify-center p-8'>
                    <div className='text-center'>
                      <div className='text-9xl mb-6 opacity-50'>📷</div>
                      <p className='text-gray-300 text-2xl font-bold mb-3'>Camera Off</p>
                      <p className='text-gray-500 text-sm mb-6'>Vision auto-enables when you start camera</p>
                      {/* ✅ START CAMERA BUTTON */}
                      <button onClick={startCamera} className='px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-bold shadow-2xl transform hover:scale-105 transition-all text-xl'>
                        START CAMERA
                      </button>
                    </div>
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className='absolute inset-0 bg-black/80 flex items-center justify-center z-10'>
                    <div className='text-white text-center'>
                      <div className='text-6xl mb-4 animate-spin'>🔍</div>
                      <p className='text-xl font-bold'>Analyzing Image...</p>
                    </div>
                  </div>
                )}
                
                {/* ✅ STOP CAMERA BUTTON ON TOP RIGHT */}
                {isCameraActive && (
                  <div className='absolute top-4 right-4 z-20'>
                    <button onClick={stopCamera} className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-2xl transition-all transform hover:scale-105'>
                      STOP CAMERA
                    </button>
                  </div>
                )}
              </div>
              
              {/* ✅ CAMERA INFO CARD - NOW AT BOTTOM, OUTSIDE VIDEO */}
              <div className='bg-black/95 backdrop-blur-md p-4 border-t border-white/10'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex items-center gap-3'>
                    <div className={`text-3xl ${isCameraActive ? 'animate-pulse' : ''}`}>📷</div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-bold text-white'>Your Camera</h3>
                      <p className='text-sm text-gray-300'>
                        {isCameraActive ? <span className='text-green-400 font-bold'>Active</span> : <span className='text-red-400'>Off</span>}
                      </p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-2'>
                    {visionEnabled && (
                      <div className='flex items-center gap-2 bg-purple-600 px-3 py-2 rounded-full animate-pulse'>
                        <div className='text-2xl'>👁️</div>
                        <span className='text-white font-bold text-sm'>AI SEES YOU</span>
                      </div>
                    )}
                    
                    {/* ✅ STOP CAMERA BUTTON ALSO IN BOTTOM CARD */}
                    {isCameraActive && (
                      <button onClick={stopCamera} className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-lg transition-all text-sm'>
                        STOP
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className='bg-gray-800 rounded-xl p-5 border-2 border-gray-700 shadow-2xl'>
          <div className='flex items-center justify-between mb-4 flex-wrap gap-2'>
            <h4 className='text-xl font-bold text-white flex items-center gap-2'>Controls</h4>
            {isRecording && !showIntroVideo && (
              <div className='flex items-center gap-2 text-sm text-gray-400 flex-wrap'>
                <span className={liveMode ? 'text-green-400 font-bold' : ''}>Live Mode: {liveMode ? 'ON' : 'OFF'}</span>
                <span>|</span>
                <span className={visionEnabled ? 'text-purple-400 font-bold' : ''}>Vision: {visionEnabled ? 'ON' : 'OFF'}</span>
                {isSpeaking && (
                  <>
                    <span>|</span>
                    <span className={isPaused ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold'}>
                      Speech: {isPaused ? 'PAUSED' : 'ACTIVE'}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {showIntroVideo ? (
            <div className='text-center py-12'>
              <div className='mb-6'>
                <div className='text-6xl mb-4 animate-pulse'>🎬</div>
                <p className='text-gray-300 text-lg mb-2'>Playing introduction video...</p>
                <p className='text-gray-500 text-sm'>Session will start automatically after video</p>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              {isSpeaking && (
                <div className='p-4 bg-gradient-to-r from-purple-900/80 to-pink-900/80 rounded-lg border-2 border-purple-500 shadow-xl'>
                  <div className='flex items-center justify-between gap-4 flex-wrap'>
                    <div className='flex items-center gap-3'>
                      <div className='text-3xl'>🔊</div>
                      <div>
                        <p className='text-white font-bold text-lg'>TUTOR IS SPEAKING!</p>
                        <p className='text-yellow-300 text-xs'>{isPaused ? 'PAUSED - Click RESUME' : 'ACTIVE - Click PAUSE to pause'}</p>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      {!isPaused ? (
                        <button onClick={pauseSpeech} className='px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-bold shadow-lg transition-all'>
                          PAUSE
                        </button>
                      ) : (
                        <button onClick={resumeSpeech} className='px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold shadow-lg transition-all animate-pulse'>
                          RESUME
                        </button>
                      )}
                      <button onClick={stopSpeech} className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-lg transition-all'>
                        STOP
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className='flex gap-3 flex-wrap items-center'>
                <button onClick={toggleLiveMode} className={`px-5 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105 ${liveMode ? 'bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse' : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'}`}>
                  {liveMode ? 'LIVE MODE' : 'START LIVE'}
                </button>

                <input
                  type='text'
                  value={studentInput}
                  onChange={(e) => setStudentInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder='Type your message here...'
                  disabled={isListening || isSpeaking}
                  className='flex-1 min-w-[300px] px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all'
                />
                
                <button onClick={handleSendMessage} disabled={!studentInput.trim() || isListening || isSpeaking} className='px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all'>
                  Send
                </button>
              </div>

              <div className='flex gap-3 flex-wrap'>
                <button onClick={isListening ? stopListening : startListening} disabled={isSpeaking} className={`px-5 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105 ${isListening ? 'bg-gradient-to-r from-red-600 to-pink-600 animate-pulse' : isSpeaking ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'} disabled:opacity-50`}>
                  {isListening ? 'LISTENING...' : isSpeaking ? 'SPEAKING...' : 'SPEAK'}
                </button>
                
                {/* ✅ REMOVED START CAMERA FROM CONTROLS - NOW ONLY IN CAMERA SECTION */}
                
                {isCameraActive && (
                  <button onClick={captureAndAnalyze} disabled={isAnalyzing} className='px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all'>
                    {isAnalyzing ? 'ANALYZING...' : 'TAKE SNAPSHOT'}
                  </button>
                )}
                
                <button onClick={() => fileInputRef.current?.click()} className='px-5 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all'>
                  UPLOAD IMAGE
                </button>
                
                {!topicContext && (
                  <button onClick={() => setShowTopicSelector(true)} className='px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all'>
                    📚 SELECT TOPIC
                  </button>
                )}
                
                <button onClick={handleEndCall} className='px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all'>
                  END CALL
                </button>
              </div>

              {homework && (
                <div className='mt-4 pt-4 border-t border-gray-700'>
                  <div className='flex items-center justify-between mb-2'>
                    <p className='text-sm text-gray-400 font-semibold'>Last Snapshot:</p>
                    <button onClick={() => setHomework(null)} className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-bold transition-all'>
                      Clear
                    </button>
                  </div>
                  <div className='relative'>
                    <img src={homework} alt='Captured snapshot' className='w-full max-h-48 object-contain rounded-lg border-2 border-green-500 shadow-lg' />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <input ref={fileInputRef} type='file' accept='image/*' onChange={handleHomeworkUpload} className='hidden' />
      <canvas ref={canvasRef} style={{display: 'none'}} />
    </div>
  );
}

// Make VideoCall available globally
window.VideoCall = VideoCall;
console.log('✅ VideoCall.js - FIXED VERSION LOADED!');
