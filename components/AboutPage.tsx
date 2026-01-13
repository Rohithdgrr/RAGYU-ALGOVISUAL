
import React, { useState, useEffect } from 'react';

interface Feedback {
  id: string;
  name: string;
  type: 'Problem' | 'Bug' | 'Appreciation';
  message: string;
  date: string;
}

const STORAGE_KEY = 'algovisual_real_feedback';

export const AboutPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [activeTab, setActiveTab] = useState<'Problem' | 'Bug' | 'Appreciation'>('Appreciation');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);

  // Load real feedback from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFeedbacks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse feedback", e);
      }
    }
  }, []);

  // Save feedback when updated
  const saveFeedbacks = (newFeedbacks: Feedback[]) => {
    setFeedbacks(newFeedbacks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFeedbacks));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      name: name.trim(),
      type: activeTab,
      message: message.trim(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    saveFeedbacks([newFeedback, ...feedbacks]);
    setName('');
    setMessage('');
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Bug': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Problem': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
  };

  return (
    <div className="animate-message pb-20 space-y-12">
      {/* Creator Profile Section */}
      <section className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 sm:p-20 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white text-3xl font-black mb-8 shadow-2xl shadow-slate-200">
            ROT
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Meet <span className="text-blue-600">ROT.</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">B.Tech Student</span>
            <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">Indian</span>
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">Telangana</span>
            <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">Warangal</span>
          </div>
          <p className="text-slate-500 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium mb-10">
            Hey there! I'm <span className="text-slate-900 font-bold">ROT</span>, a B.Tech student from <span className="text-slate-900 font-bold">Warangal</span>, Telangana. 
            This visualizer is a project I built to help engineering students like me understand complex Data Structures and Algorithms with ease. I focus on minimalist design and high-quality logic.
          </p>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900">Warangal</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hometown</span>
            </div>
            <div className="w-px h-10 bg-slate-100"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900">B.Tech</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Education</span>
            </div>
          </div>
          <a
            href="https://github.com/Rohithdgrr/RAGYU-ALGOVISUAL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            <i className="fa-brands fa-github text-sm"></i>
            View on GitHub
          </a>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[3.5rem] border border-amber-100 p-8 sm:p-16 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200">
              <i className="fa-solid fa-triangle-exclamation text-white text-lg"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Important Notice</h2>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] border border-amber-100 p-6 sm:p-8 mb-6">
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-4">
              <strong className="text-slate-900">This website is not fully perfect for all visualizations.</strong>
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-4">
              As a student project, this visualizer is continuously being improved. While we strive for accuracy and clarity in all algorithm visualizations, some complex data structures and algorithms may have limitations in their visual representation.
            </p>
            <ul className="space-y-3 text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-4">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-circle-info text-amber-500 mt-1 text-sm"></i>
                <span>Some visualizations may not display perfectly on all screen sizes or devices</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-circle-info text-amber-500 mt-1 text-sm"></i>
                <span>Certain edge cases in algorithms may not be fully captured in the visualization</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-circle-info text-amber-500 mt-1 text-sm"></i>
                <span>Animation speeds and step-by-step explanations may vary across different algorithms</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-circle-info text-amber-500 mt-1 text-sm"></i>
                <span>This is an educational tool and may not cover all possible scenarios or variations</span>
              </li>
            </ul>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              Your feedback is invaluable in helping us improve these visualizations. If you encounter any issues or have suggestions for better visual representations, please use the feedback form below.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/Rohithdgrr/RAGYU-ALGOVISUAL/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <i className="fa-brands fa-github text-xs"></i>
              Report Issue on GitHub
            </a>
            <a
              href="#feedback"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              <i className="fa-solid fa-comment text-xs"></i>
              Send Feedback
            </a>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="bg-white rounded-[3.5rem] border border-slate-100 p-8 sm:p-16 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4 italic">Real User Feedback</h2>
            <p className="text-slate-500 font-medium mb-6">Your feedback is stored locally and helps improve the platform.</p>
            <a
              href="https://github.com/Rohithdgrr/RAGYU-ALGOVISUAL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <i className="fa-brands fa-github text-xs"></i>
              GitHub Repository
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mb-20 bg-slate-50/50 p-8 sm:p-10 rounded-[2.5rem] border border-slate-100">
            <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-sm w-fit mx-auto mb-8">
              {(['Appreciation', 'Bug', 'Problem'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveTab(type)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === type ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {type === 'Bug' ? 'Bugs' : type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-white border-2 border-slate-50 rounded-2xl text-sm font-bold shadow-sm focus:outline-none focus:border-blue-500 transition-all"
              />
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Share your experience, bugs or suggestions..."
                className="w-full h-32 px-6 py-4 bg-white border-2 border-slate-50 rounded-2xl text-sm font-bold shadow-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-5 bg-blue-600 text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-[0.98]"
            >
              Post Feedback
            </button>
          </form>

          {/* Feedback List */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-4 flex items-center justify-between">
              <span>Live Feedbacks</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{feedbacks.length} total</span>
            </h3>
            
            <div className="space-y-4">
              {feedbacks.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-medium">
                  No feedback yet. Be the first to share!
                </div>
              ) : (
                feedbacks.slice(0, visibleCount).map((fb, idx) => (
                  <div key={fb.id} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm animate-message" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs border border-slate-100">
                          {fb.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900">{fb.name}</h4>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{fb.date}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getBadgeColor(fb.type)}`}>
                        {fb.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed pl-1">
                      {fb.message}
                    </p>
                  </div>
                ))
              )}
            </div>

            {visibleCount < feedbacks.length && (
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 5)}
                  className="px-10 py-4 bg-white border-2 border-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Show More Feedback ({feedbacks.length - visibleCount} more)
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
