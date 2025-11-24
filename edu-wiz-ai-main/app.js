// ============================================
// APP.JS - WITH TOPIC SELECTOR INTEGRATED
// ✅ Adds Board → Class → Book → Chapter → Topic selection
// ✅ Connects to your estudycard.com database
// ✅ Works with existing VideoCall component
// ============================================

console.log('📱 app.js with Topic Selector starting...');

function App() {
  console.log('🎨 App component rendering...');
  
  const [selectedTutor, setSelectedTutor] = React.useState(null);
  const [mode, setMode] = React.useState(null);
  const [currentScreen, setCurrentScreen] = React.useState('home'); // home, tutors, topicSelection, videoCall, chat
  const [selectedTopicContext, setSelectedTopicContext] = React.useState(null);
  const tutorsGridRef = React.useRef(null);

  // ✅ SCROLL TO TUTORS
  const scrollToTutors = () => {
    console.log('🎯 Scrolling to tutors...');
    if (tutorsGridRef.current) {
      setTimeout(() => {
        tutorsGridRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  // ============================================
  // TUTORS DATA
  // ============================================
  const tutors = [
    {
      id: 1,
      name: "Albert Einstein",
      subject: "Physics",
      emoji: "⚛️",
      color: "from-blue-600 to-cyan-600",
      personality: "Curious and thought-provoking",
      image: "https://res.cloudinary.com/dv9vdvgxt/image/upload/v1762798193/einstein.png_bx3aac.jpg",
      introVideo: "https://res.cloudinary.com/dfnqsvfmu/video/upload/v1762718050/einstein_intro.mp4_gkxnb9.mp4",
      subjectGreeting: "Welcome to Physics! I'll help you understand relativity, quantum mechanics, energy, motion, and the fundamental forces that shape our universe. Together, we'll explore how the cosmos works!"
    },
    {
      id: 2,
      name: "Al-Khwarizmi",
      subject: "Mathematics",
      emoji: "🔢",
      color: "from-purple-600 to-pink-600",
      personality: "Patient and methodical",
      image: "https://res.cloudinary.com/dv9vdvgxt/image/upload/v1762798212/al-khwarizmi.png_bhyhvg.jpg",
      introVideo: "https://res.cloudinary.com/dfnqsvfmu/video/upload/v1762718051/al_khwarizmi_intro.mp4_zh6bbi.mp4",
      subjectGreeting: "Welcome to Mathematics! I'll guide you through algebra, algorithms, geometry, calculus, and problem-solving. Master math, and you master the foundation of all sciences!"
    },
    {
      id: 3,
      name: "Marie Curie",
      subject: "Chemistry",
      emoji: "⚗️",
      color: "from-green-600 to-teal-600",
      personality: "Passionate and encouraging",
      image: "https://res.cloudinary.com/dv9vdvgxt/image/upload/v1762798145/marie-curie.png_xt6oqp.jpg",
      introVideo: "https://res.cloudinary.com/dfnqsvfmu/video/upload/v1762718042/marie_curie_intro.mp4_dtfwbh.mp4",
      subjectGreeting: "Welcome to Chemistry! We'll explore atoms, molecules, reactions, radioactivity, and the periodic table. Chemistry is everywhere - in your body, your food, and the world around you!"
    },
    {
      id: 4,
      name: "Ibn Sina",
      subject: "Biology",
      emoji: "🧬",
      color: "from-emerald-600 to-green-600",
      personality: "Wise and holistic",
      image: "https://res.cloudinary.com/dv9vdvgxt/image/upload/v1762798188/ibn-sina.png_s5jleo.jpg",
      introVideo: "https://res.cloudinary.com/dfnqsvfmu/video/upload/v1762718035/ibn_sina_intro.mp4_nbyr6y.mp4",
      subjectGreeting: "Welcome to Biology! I'll teach you about cells, organs, genetics, ecosystems, human anatomy, and how all living things function. Understanding life is understanding ourselves!"
    },
    {
      id: 5,
      name: "Alan Turing",
      subject: "Computer Science",
      emoji: "💻",
      color: "from-indigo-600 to-blue-600",
      personality: "Logical and innovative",
      image: "https://res.cloudinary.com/dv9vdvgxt/image/upload/v1762798218/alan-turing.png_u2egng.jpg",
      introVideo: "https://res.cloudinary.com/dfnqsvfmu/video/upload/v1762717775/alan_turing_intro.mp4_3_dbxha2.mp4",
      subjectGreeting: "Welcome to Computer Science! I'll teach you programming, algorithms, AI, data structures, and computational thinking. Code is the future - let's build it together!"
    },
    {
      id: 6,
      name: "Allama Iqbal",
      subject: "Pakistan Studies",
      emoji: "🇵🇰",
      color: "from-green-700 to-emerald-700",
      personality: "Inspirational and patriotic",
      image: "https://res.cloudinary.com/dv9vdvgxt/image/upload/v1762798198/allama-iqbal.png_wzjk5y.jpg",
      introVideo: "https://res.cloudinary.com/dfnqsvfmu/video/upload/v1762718201/allama_iqbal_intro.mp4_g395dq.mp4",
      subjectGreeting: "Welcome to Pakistan Studies! I'll share our rich history, culture, independence movement, constitution, geography, and national identity. Know your roots, shape your future!"
    },
    {
      id: 7,
      name: "William Shakespeare",
      subject: "English",
      emoji: "📚",
      color: "from-yellow-600 to-orange-600",
      personality: "Eloquent and dramatic",
      image: "https://res.cloudinary.com/dv9vdvgxt/image/upload/v1762798156/shakespeare.png_fn6g0w.jpg",
      introVideo: "https://res.cloudinary.com/dfnqsvfmu/video/upload/v1762718051/shakespeare_intro.mp4_antf63.mp4",
      subjectGreeting: "Welcome to English Literature! I'll guide you through poetry, drama, grammar, writing, comprehension, and the beauty of language. Words have power - let's master them!"
    },
    {
      id: 8,
      name: "Mirza Ghalib",
      subject: "Urdu",
      emoji: "✍️",
      color: "from-red-600 to-pink-600",
      personality: "Poetic and expressive",
      image: "https://res.cloudinary.com/dv9vdvgxt/image/upload/v1762798126/mirza-ghalib.png_xs6a3u.jpg",
      introVideo: "https://res.cloudinary.com/dfnqsvfmu/video/upload/v1762717958/mirza_ghalib_intro.mp4_wneket.mp4",
      subjectGreeting: "Welcome to Urdu! I'll teach you Urdu poetry, grammar, ghazals, nazms, and the art of expression. Discover the beauty of Urdu language!"
    }
  ];

  // ============================================
  // HANDLERS
  // ============================================
  const handleSelectTutor = (tutor, selectedMode) => {
    console.log(`📚 Selected: ${tutor.name} in ${selectedMode} mode`);
    setSelectedTutor(tutor);
    setMode(selectedMode);
    
    // Go to topic selection ONLY for video mode
    if (selectedMode === 'video') {
      setCurrentScreen('topicSelection');
    } else {
      setCurrentScreen('chat');
    }
  };

  const handleTopicSelected = (topicContext) => {
    console.log('✅ Topic selected:', topicContext);
    setSelectedTopicContext(topicContext);
    setCurrentScreen('videoCall');
  };

  const handleBack = () => {
    console.log('🔙 Going back');
    if (currentScreen === 'topicSelection') {
      setCurrentScreen('home');
      setSelectedTutor(null);
      setMode(null);
    } else {
      setCurrentScreen('home');
      setSelectedTutor(null);
      setMode(null);
      setSelectedTopicContext(null);
    }
  };

  const handleBackToHome = () => {
    console.log('🏠 Going to home');
    setCurrentScreen('home');
    setSelectedTutor(null);
    setMode(null);
    setSelectedTopicContext(null);
  };

  // ============================================
  // RENDER: TOPIC SELECTION SCREEN
  // ============================================
  if (currentScreen === 'topicSelection') {
    console.log('📚 Rendering Topic Selector');
    
    // ✅ FIXED: Changed TopicSelector to SimpleTopicSelector
    if (typeof SimpleTopicSelector === 'undefined') {
      return React.createElement('div', { className: 'min-h-screen bg-gray-900 text-white flex items-center justify-center' },
        React.createElement('div', { className: 'text-center p-8' },
          React.createElement('h1', { className: 'text-3xl font-bold mb-4' }, '⚠️ Topic Selector Loading...'),
          React.createElement('p', { className: 'text-gray-400 mb-6' }, 'Please wait while we load the topic selector'),
          React.createElement('button', { 
            onClick: handleBack,
            className: 'px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold'
          }, 'Go Back')
        )
      );
    }
    
    // ✅ FIXED: Changed TopicSelector to SimpleTopicSelector and onBack to onClose
    return React.createElement(SimpleTopicSelector, {
      tutor: selectedTutor,
      onTopicSelected: handleTopicSelected,
      onClose: handleBack  // ✅ Changed from onBack to onClose
    });
  }

  // ============================================
  // RENDER: VIDEO CALL
  // ============================================
  if (currentScreen === 'videoCall' && selectedTutor && mode === 'video') {
    console.log('🎥 Rendering VideoCall with topic context');
    if (typeof VideoCall === 'undefined') {
      return React.createElement('div', { className: 'min-h-screen bg-gray-900 text-white flex items-center justify-center' },
        React.createElement('div', { className: 'text-center' },
          React.createElement('h1', { className: 'text-3xl font-bold mb-4' }, '❌ VideoCall component not loaded'),
          React.createElement('button', { 
            onClick: handleBackToHome,
            className: 'px-6 py-3 bg-blue-600 rounded-lg'
          }, 'Go Back')
        )
      );
    }
    
    return React.createElement(VideoCall, { 
      tutor: selectedTutor, 
      topicContext: selectedTopicContext,
      onBack: handleBackToHome 
    });
  }

  // ============================================
  // RENDER: CHAT
  // ============================================
  if (currentScreen === 'chat' && selectedTutor && mode === 'chat') {
    console.log('💬 Rendering ChatInterface');
    if (typeof ChatInterface === 'undefined') {
      return React.createElement('div', { className: 'min-h-screen bg-gray-900 text-white flex items-center justify-center' },
        React.createElement('div', { className: 'text-center' },
          React.createElement('h1', { className: 'text-3xl font-bold mb-4' }, '❌ ChatInterface component not loaded'),
          React.createElement('button', { 
            onClick: handleBackToHome,
            className: 'px-6 py-3 bg-blue-600 rounded-lg'
          }, 'Go Back')
        )
      );
    }
    return React.createElement(ChatInterface, { 
      tutor: selectedTutor, 
      topicContext: selectedTopicContext,
      onBack: handleBackToHome 
    });
  }

  // ============================================
  // RENDER: HOME PAGE
  // ============================================
  console.log('🏠 Rendering home/tutors page');
  
  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-900' },
    
    // Hero Section
    typeof Hero !== 'undefined' 
      ? React.createElement(Hero, { onScrollToTutors: scrollToTutors })
      : React.createElement('div', { className: 'text-white text-center py-20' }, 
          React.createElement('h1', { className: 'text-4xl font-bold' }, 'E-Study Card'),
          React.createElement('p', { className: 'text-gray-400 mt-4' }, 'AI Video Tutor Platform')
        ),
    
    // Tutors Grid
    React.createElement(
      'div',
      { ref: tutorsGridRef, className: 'py-20 px-4' },
      React.createElement(
        'div',
        { className: 'container mx-auto max-w-7xl' },
        
        React.createElement(
          'div',
          { className: 'text-center mb-12' },
          React.createElement('h2', { className: 'text-4xl md:text-5xl font-bold text-white mb-4' }, 'Meet Your AI Tutors'),
          React.createElement('p', { className: 'text-xl text-gray-300 mb-2' }, '8 legendary teachers, each with unique personality and teaching style'),
          React.createElement('p', { className: 'text-lg text-blue-400 font-bold' }, '✨ NEW: Select specific topics to learn before starting video call!')
        ),
        
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' },
          tutors.map(tutor =>
            React.createElement(
              'div',
              {
                key: tutor.id,
                className: `bg-gradient-to-br ${tutor.color} rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105`
              },
              
              React.createElement(
                'div',
                { className: 'relative h-64 overflow-hidden' },
                tutor.image ? React.createElement('img', {
                  src: tutor.image,
                  alt: tutor.name,
                  className: 'w-full h-full object-contain p-4',
                  onError: (e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }
                }) : null,
                React.createElement(
                  'div',
                  {
                    className: 'absolute inset-0 flex items-center justify-center',
                    style: { display: tutor.image ? 'none' : 'flex' }
                  },
                  React.createElement('span', { className: 'text-8xl' }, tutor.emoji)
                )
              ),
              
              React.createElement(
                'div',
                { className: 'bg-gray-900/95 backdrop-blur-sm p-6' },
                React.createElement(
                  'div',
                  { className: 'flex items-center gap-2 mb-2' },
                  React.createElement('span', { className: 'text-3xl' }, tutor.emoji),
                  React.createElement('h3', { className: 'text-xl font-bold text-white' }, tutor.subject)
                ),
                React.createElement('p', { className: 'text-lg font-semibold text-white mb-3' }, tutor.name),
                React.createElement(
                  'div',
                  { className: 'flex gap-2' },
                  React.createElement(
                    'button',
                    {
                      onClick: () => handleSelectTutor(tutor, 'chat'),
                      className: 'flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all'
                    },
                    '💬 Chat'
                  ),
                  React.createElement(
                    'button',
                    {
                      onClick: () => handleSelectTutor(tutor, 'video'),
                      className: 'flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all'
                    },
                    '🎥 Video'
                  )
                )
              )
            )
          )
        ),
        
        React.createElement(
          'div',
          { className: 'mt-12 text-center' },
          React.createElement(
            'p',
            { className: 'text-sm text-gray-400' },
            '🎓 ',
            React.createElement('strong', null, 'Choose Video'),
            ' → Select topic → AI explains automatically • 💬 ',
            React.createElement('strong', null, 'Choose Chat'),
            ' for text learning'
          )
        )
      )
    )
  );
}

// ============================================
// RENDER APP
// ============================================
console.log('🎬 Rendering app...');

try {
  const root = document.getElementById('root');
  if (!root) {
    console.error('❌ #root not found!');
  } else {
    ReactDOM.render(React.createElement(App), root);
    console.log('✅ App with Topic Selector loaded!');
  }
} catch (error) {
  console.error('❌ Error:', error);
}
