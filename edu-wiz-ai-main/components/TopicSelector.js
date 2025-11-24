// ============================================
// SIMPLE TOPIC SELECTOR - DROPDOWN VERSION
// Perfect for Pakistani Students - Fast & Clean
// No extra pages - just 4 dropdowns in popup
// Book auto-selected from tutor's subject
// ============================================

function SimpleTopicSelector({ tutor, onTopicSelected, onClose }) {
  const [board, setBoard] = React.useState('');
  const [classNum, setClassNum] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [topic, setTopic] = React.useState('');

  // Boards in Pakistan
  const boards = ['Federal', 'Punjab', 'KPK', 'Sindh', 'Balochistan', 'Azad Kashmir', 'Gilgit-Baltistan'];
  const classes = ['9', '10', '11', '12'];

  // Auto book name from tutor's subject
  const bookName = {
    'Physics': 'Physics',
    'Mathematics': 'Mathematics',
    'Chemistry': 'Chemistry',
    'Biology': 'Biology',
    'Computer Science': 'Computer Science ',
    'Pakistan Studies': 'Pakistan Studies',
    'English': 'English',
    'Urdu': 'Urdu'
  }[tutor.subject] || tutor.subject;

  // Units by subject (add more from your database later)
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

  // Topics by unit (add more from your database later)
  const topicsByUnit = {
    'Unit 1: Computer Systems': ['Introduction to Computers', 'Hardware Components', 'Software Types', 'Operating Systems', 'Number Systems'],
    'Unit 1: Mechanics': ['Motion', 'Force & Newton Laws', 'Work & Energy', 'Circular Motion', 'Gravitation'],
    'Unit 1: Stoichiometry': ['Atoms & Molecules', 'Chemical Equations', 'Mole Concept', 'Percentage Composition'],
    'Unit 1: Sets & Functions': ['Sets', 'Functions', 'Types of Functions', 'Inverse Functions']
    // Add more as needed...
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
    onClose();
  };

  return React.createElement('div', { 
    className: 'fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4',
    onClick: onClose
  },
    React.createElement('div', { 
      className: 'bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-2xl w-full border-4 border-purple-600 shadow-2xl',
      onClick: (e) => e.stopPropagation()
    },
      React.createElement('div', { className: 'flex justify-between items-center mb-8' },
        React.createElement('h2', { className: 'text-4xl font-bold text-white' }, '📚 Select Topic'),
        React.createElement('button', { 
          onClick: onClose, 
          className: 'text-5xl text-gray-400 hover:text-white transition-all'
        }, '×')
      ),

      React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8' },
        // Board
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-bold text-gray-300 mb-2' }, 'Board'),
          React.createElement('select', { 
            value: board, 
            onChange: e => setBoard(e.target.value), 
            className: 'w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all'
          },
            React.createElement('option', { value: '' }, 'Select Board'),
            boards.map(b => React.createElement('option', { key: b, value: b }, b))
          )
        ),

        // Class
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-bold text-gray-300 mb-2' }, 'Class'),
          React.createElement('select', { 
            value: classNum, 
            onChange: e => setClassNum(e.target.value), 
            className: 'w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all'
          },
            React.createElement('option', { value: '' }, 'Select Class'),
            classes.map(c => React.createElement('option', { key: c, value: c }, 'Class ' + c))
          )
        ),

        // Unit
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-bold text-gray-300 mb-2' }, 'Chapter / Unit'),
          React.createElement('select', { 
            value: unit, 
            onChange: e => { setUnit(e.target.value); setTopic(''); }, 
            className: 'w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all'
          },
            React.createElement('option', { value: '' }, 'Select Unit'),
            currentUnits.map(u => React.createElement('option', { key: u, value: u }, u))
          )
        ),

        // Topic
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-bold text-gray-300 mb-2' }, 'Topic'),
          React.createElement('select', { 
            value: topic, 
            onChange: e => setTopic(e.target.value), 
            disabled: !unit,
            className: 'w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          },
            React.createElement('option', { value: '' }, unit ? 'Select Topic' : 'First select Unit'),
            currentTopics.map(t => React.createElement('option', { key: t, value: t }, t))
          )
        )
      ),

      // Book info (read-only, auto from tutor)
      React.createElement('div', { className: 'bg-blue-900/30 border border-blue-500 rounded-xl p-4 mb-6' },
        React.createElement('p', { className: 'text-blue-300 text-sm mb-1' }, '📖 Book (Auto-selected)'),
        React.createElement('p', { className: 'text-white font-bold text-lg' }, bookName)
      ),

      React.createElement('div', { className: 'flex justify-end gap-4' },
        React.createElement('button', { 
          onClick: onClose, 
          className: 'px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-lg transition-all'
        }, 'Cancel'),
        React.createElement('button', { 
          onClick: handleStart, 
          className: 'px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-xl shadow-2xl transition-all transform hover:scale-105'
        }, '▶ Start Lesson')
      )
    )
  );
}

console.log('✅ SimpleTopicSelector - LOADED & PERFECT FOR PAKISTAN!');
