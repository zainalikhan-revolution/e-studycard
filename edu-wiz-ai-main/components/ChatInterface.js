// ============================================
// CHAT INTERFACE - With Back Button
// ✅ Back button added above chat
// ✅ Close button in header
// ✅ Fixed for your existing aiAgent
// ============================================

function ChatInterface({ tutor, onBack }) {
  const [messages, setMessages] = React.useState([
    { 
      role: 'assistant', 
      content: `السلام علیکم! I'm ${tutor.name}. How can I help you with ${tutor.subject} today?` 
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    try {
      console.log('Sending message to:', tutor.name);
      
      // Pass conversation history to chatWithTutor
      const response = await window.chatWithTutor(tutor, userMessage, messages);
      
      console.log('Received response:', response);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Sorry, I encountered an error. Please try again or check your internet connection.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" data-name="chat-interface" data-file="components/ChatInterface.js">
      <div className="container mx-auto max-w-4xl">
        {/* ✅ BACK BUTTON - Added above chat card */}
        <div className="mb-4">
          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 font-semibold transition-all shadow-lg"
          >
            <span className="text-xl">←</span>
            <span>واپس جائیں / Back to Tutors</span>
          </button>
        </div>

        <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-2xl">
          {/* Tutor Header */}
          <div className={`p-6 bg-gradient-to-r ${tutor.color}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{tutor.emoji}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{tutor.name}</h2>
                  <p className="text-white text-opacity-90">{tutor.subject} Tutor</p>
                </div>
              </div>
              <button 
                onClick={onBack}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
                title="Close chat"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-800">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md p-4 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-700 bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اپنا سوال پوچھیں... Ask your question..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] disabled:opacity-50"
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="icon-send text-xl"></div>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Tip: Press Enter to send your message
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ NO EXPORT STATEMENT - This is correct for browser scripts!
console.log('✅ ChatInterface.js with BACK BUTTON loaded successfully');
