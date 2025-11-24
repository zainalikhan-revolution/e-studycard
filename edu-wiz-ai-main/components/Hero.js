// ============================================
// HERO.JS - ENHANCED HOMEPAGE COMPONENT
// ✅ Complete features section
// ✅ Beautiful UI matching screenshots
// ✅ Smooth animations
// ============================================

function Hero({ onScrollToTutors }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden' },
    
    // Animated background
    React.createElement('div', { className: 'absolute inset-0 opacity-10' },
      React.createElement('div', { className: 'absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse' }),
      React.createElement('div', { className: 'absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse', style: { animationDelay: '1s' } })
    ),

    // Main content
    React.createElement(
      'div',
      { className: 'relative z-10 container mx-auto px-4 py-20' },
      
      // Badge
      React.createElement(
        'div',
        { className: `text-center mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}` },
        React.createElement(
          'div',
          { className: 'inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg' },
          '⚡ Pakistan\'s First AI Video Tutor Platform'
        )
      ),

      // Main heading
      React.createElement(
        'h1',
        { className: `text-center text-5xl md:text-7xl font-bold mb-6 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}` },
        React.createElement('span', { className: 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent' }, 'Learn with AI Legends')
      ),

      // Subtitle
      React.createElement(
        'p',
        { className: `text-center text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}` },
        'Get personalized tutoring from Einstein, Al-Khwarizmi, and 6 other legendary teachers'
      ),

      // Urdu subtitle
      React.createElement(
        'p',
        { className: `text-center text-lg text-gray-400 mb-12 max-w-3xl mx-auto transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`, dir: 'rtl' },
        'آئن سٹالن، الخوارزمی اور 6 دیگر عظیم اساتذہ سے ذاتی تعلیم حاصل کریں'
      ),

      // CTA Buttons
      React.createElement(
        'div',
        { className: `flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}` },
        
        React.createElement(
          'button',
          {
            onClick: onScrollToTutors,
            className: 'group px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3'
          },
          React.createElement('span', { className: 'text-2xl' }, '🎥'),
          React.createElement('span', null, 'Learn from AI Live Directly'),
          React.createElement('span', { className: 'text-xl group-hover:translate-x-1 transition-transform' }, '→')
        ),
        
        React.createElement(
          'button',
          {
            onClick: onScrollToTutors,
            className: 'px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3'
          },
          React.createElement('span', { className: 'text-2xl' }, '💬'),
          React.createElement('span', null, 'Try Text Chat')
        )
      ),

      // Features Section
      React.createElement(
        'div',
        { className: `grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}` },
        
        // Feature 1: Live Video Calls
        React.createElement(
          'div',
          { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl' },
          React.createElement(
            'div',
            { className: 'text-5xl mb-4 text-center' },
            '🎥'
          ),
          React.createElement(
            'h3',
            { className: 'text-2xl font-bold text-white mb-3 text-center' },
            'Live Video Calls'
          ),
          React.createElement(
            'p',
            { className: 'text-gray-300 text-center' },
            'Face-to-face learning with realistic AI avatars that explain concepts visually'
          )
        ),

        // Feature 2: Bilingual Support
        React.createElement(
          'div',
          { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl' },
          React.createElement(
            'div',
            { className: 'text-5xl mb-4 text-center' },
            '🌍'
          ),
          React.createElement(
            'h3',
            { className: 'text-2xl font-bold text-white mb-3 text-center' },
            'Bilingual Support'
          ),
          React.createElement(
            'p',
            { className: 'text-gray-300 text-center' },
            'Learn in Urdu, English, or mix both - just like real Pakistani classrooms'
          )
        ),

        // Feature 3: Personalized Learning
        React.createElement(
          'div',
          { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl' },
          React.createElement(
            'div',
            { className: 'text-5xl mb-4 text-center' },
            '🎯'
          ),
          React.createElement(
            'h3',
            { className: 'text-2xl font-bold text-white mb-3 text-center' },
            'Personalized Learning'
          ),
          React.createElement(
            'p',
            { className: 'text-gray-300 text-center' },
            'AI tracks your progress and adapts to your learning style and pace'
          )
        )
      ),

      // Scroll indicator
      React.createElement(
        'div',
        { className: `mt-20 text-center transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}` },
        React.createElement(
          'button',
          {
            onClick: onScrollToTutors,
            className: 'text-white/60 hover:text-white transition-colors duration-300 flex flex-col items-center mx-auto gap-2 group'
          },
          React.createElement('span', { className: 'text-sm font-semibold' }, 'Meet Your Tutors'),
          React.createElement('span', { className: 'text-3xl animate-bounce group-hover:scale-110 transition-transform' }, '⬇️')
        )
      )
    )
  );
}

console.log('✅ Hero.js loaded successfully');
