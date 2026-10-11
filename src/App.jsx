import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Sparkles, 
  Gift, 
  PartyPopper, 
  Flame, 
  ArrowLeft,
  RotateCcw
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'birthday'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [confetti, setConfetti] = useState([]);
  
  // User photo & Video background paths
  const userPhoto = './mahe.jpg'; 
  const backgroundVideo = './kandy.mp4'; 

  const audioCtxRef = useRef(null);

  // Function to play Happy Birthday Tune automatically
  const startBirthdayTune = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const notes = [
        { note: 261.63, duration: 0.4 }, // C4
        { note: 261.63, duration: 0.4 }, // C4
        { note: 293.66, duration: 0.8 }, // D4
        { note: 261.63, duration: 0.8 }, // C4
        { note: 349.23, duration: 0.8 }, // F4
        { note: 329.63, duration: 1.2 }, // E4
        
        { note: 261.63, duration: 0.4 }, // C4
        { note: 261.63, duration: 0.4 }, // C4
        { note: 293.66, duration: 0.8 }, // D4
        { note: 261.63, duration: 0.8 }, // C4
        { note: 392.00, duration: 0.8 }, // G4
        { note: 349.23, duration: 1.2 }, // F4
      ];

      let time = ctx.currentTime;
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.note, time);

        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + n.duration - 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + n.duration);

        time += n.duration;
      });
    } catch (e) {
      console.log('Audio error', e);
    }
  };

  const triggerSurprise = () => {
    setIsTransitioning(true);
    const newConfetti = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -20,
      size: Math.random() * 12 + 6,
      color: ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 7)],
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      rotation: Math.random() * 360
    }));
    setConfetti(newConfetti);

    setTimeout(() => {
      setCurrentPage('birthday');
      setIsTransitioning(false);
      // Automatically play the song when entering the birthday page
      startBirthdayTune();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans text-white select-none">
      
      {/* Dynamic CSS Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes bubble {
          0% { transform: translateY(100vh) scale(0.3); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }
        @keyframes linePulse {
          0%, 100% { opacity: 0.2; transform: scaleX(0.9); }
          50% { opacity: 0.9; transform: scaleX(1.1); }
        }
        @keyframes glowText {
          0%, 100% { text-shadow: 0 0 15px rgba(244,63,94,0.6), 0 0 30px rgba(168,85,247,0.6); }
          50% { text-shadow: 0 0 25px rgba(236,72,153,0.9), 0 0 50px rgba(59,130,246,0.9); }
        }
        @keyframes giftJump {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-glow-text { animation: glowText 3s infinite alternate; }
        .animate-gift { animation: giftJump 2s infinite ease-in-out; }
      `}</style>

      {/* ================= PAGE TRANSITION OVERLAY ================= */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl transition-all duration-700">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-40 w-40 animate-ping rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-75"></div>
            <Sparkles className="h-20 w-20 animate-spin text-pink-400 duration-1000" />
          </div>
          <p className="mt-6 animate-bounce text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400">
            Preparing Your Surprise... ✨
          </p>
        </div>
      )}

      {/* ================= HOME PAGE ================= */}
      {currentPage === 'home' && (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
          
          {/* Background Video (kandy.mp4) with Sound Auto-play (muted attribute removed) */}
          <video 
            autoPlay 
            loop 
            playsInline
            className="absolute inset-0 h-full w-full object-cover filter brightness-[0.4] contrast-[1.1] scale-105"
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Abstract Glowing Colorful Lines Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-pink-600/30 blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-purple-600/30 blur-[120px] animate-pulse delay-1000"></div>
          </div>

          {/* Main Glassmorphism Card */}
          <div className="relative z-10 max-w-lg w-full text-center p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center animate-float">
            
            {/* User Profile Frame (mahe.jpg) */}
            <div className="relative mb-6 group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              <img 
                src={userPhoto} 
                alt="Birthday Person" 
                className="relative h-36 w-36 rounded-full object-cover border-4 border-white/80 shadow-xl"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000';
                }}
              />
              <div className="absolute bottom-0 right-0 rounded-full bg-pink-500 p-2 text-white shadow-lg">
                <Heart className="h-5 w-5 fill-current" />
              </div>
            </div>

            <span className="mb-2 inline-block rounded-full bg-pink-500/20 px-4 py-1 text-xs font-semibold tracking-wider text-pink-300 border border-pink-500/30">
              SPECIAL DAY
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
              Someone Special Has A <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Surprise!</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-md">
              A special celebration awaits you. Click the button below to unlock your magical birthday surprise!
            </p>

            {/* Glowing Action Button */}
            <button
              onClick={triggerSurprise}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 font-bold transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg shadow-pink-500/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-500 group-hover:opacity-90"></span>
              <span className="relative flex items-center gap-3 rounded-full bg-slate-950 px-8 py-4 text-lg font-bold text-white transition-all duration-300 group-hover:bg-transparent">
                <PartyPopper className="h-6 w-6 text-pink-400 group-hover:text-white transition-colors" />
                <span>Click Me!</span>
                <Sparkles className="h-5 w-5 text-yellow-300 animate-spin" />
              </span>
            </button>

          </div>
        </div>
      )}

      {/* ================= SURPRISE BIRTHDAY PAGE ================= */}
      {currentPage === 'birthday' && (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 py-12 px-4 flex flex-col items-center justify-between">
          
          {/* Animated Background Colorful Light Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50 animate-[linePulse_4s_infinite]" />
            <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40 animate-[linePulse_6s_infinite]" />
            <div className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 animate-[linePulse_5s_infinite]" />
            <div className="absolute bottom-10 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40 animate-[linePulse_7s_infinite]" />
          </div>

          {/* Floating Colorful Bubbles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full backdrop-blur-sm border border-white/20"
                style={{
                  left: `${(i * 4) % 100}%`,
                  width: `${(i % 5) * 15 + 20}px`,
                  height: `${(i % 5) * 15 + 20}px`,
                  background: `radial-gradient(circle at 30% 30%, ${
                    ['rgba(244,63,94,0.4)', 'rgba(168,85,247,0.4)', 'rgba(59,130,246,0.4)', 'rgba(16,185,129,0.4)'][i % 4]
                  }, transparent)`,
                  animation: `bubble ${6 + (i % 5) * 2}s infinite linear`,
                  animationDelay: `${(i % 7) * 0.8}s`
                }}
              />
            ))}
          </div>

          {/* Confetti Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confetti.loop || confetti.map((c) => (
              <div
                key={c.id}
                className="absolute rounded-sm"
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: `${c.size}px`,
                  height: `${c.size}px`,
                  backgroundColor: c.color,
                  transform: `rotate(${c.rotation}deg)`,
                  animation: `bubble ${c.duration}s infinite ease-in`,
                  animationDelay: `${c.delay}s`
                }}
              />
            ))}
          </div>

          {/* Header Bar */}
          <div className="relative z-20 w-full max-w-4xl flex justify-between items-center mb-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md border border-white/20 transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Main Birthday Content Area */}
          <div className="relative z-10 max-w-3xl w-full text-center my-auto flex flex-col items-center">
            
            {/* Animated Birthday Typography */}
            <div className="mb-8">
              <h1 className="text-5xl sm:text-7xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 animate-glow-text mb-2">
                Happy Birthday
              </h1>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                To You! 🎉
              </h2>
            </div>

            {/* Photo Avatar with Halo Effect */}
            <div className="relative mb-10">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-75 blur-lg animate-pulse"></div>
              <img 
                src={userPhoto} 
                alt="Birthday Star" 
                className="relative h-44 w-44 rounded-full object-cover border-4 border-white shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000';
                }}
              />
            </div>

            {/* Interactive Birthday Cake */}
            <div className="relative my-6 flex flex-col items-center">
              <p className="text-xs text-pink-300 mb-3 uppercase tracking-widest font-semibold">
                {candlesBlown ? "✨ Make a wish! ✨" : "Click candles to blow them out!"}
              </p>

              {/* Candles */}
              <div className="flex gap-4 mb-2 z-10 cursor-pointer" onClick={() => setCandlesBlown(!candlesBlown)}>
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {!candlesBlown && (
                      <Flame className="h-6 w-6 text-yellow-400 animate-bounce fill-yellow-400 filter drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                    )}
                    <div className="h-10 w-2.5 rounded-t bg-gradient-to-b from-pink-300 to-pink-500 shadow-md"></div>
                  </div>
                ))}
              </div>

              {/* Cake Top */}
              <div className="w-48 h-10 bg-pink-400 rounded-t-2xl border-b-4 border-pink-500 flex justify-around items-center px-2 shadow-lg">
                <span className="w-3 h-3 rounded-full bg-white opacity-80"></span>
                <span className="w-3 h-3 rounded-full bg-white opacity-80"></span>
                <span className="w-3 h-3 rounded-full bg-white opacity-80"></span>
                <span className="w-3 h-3 rounded-full bg-white opacity-80"></span>
              </div>

              {/* Cake Base */}
              <div className="w-56 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-b-2xl shadow-2xl flex items-center justify-center border-t-2 border-white/20">
                <span className="text-xl font-black text-white/90 tracking-widest">CELEBRATE</span>
              </div>
            </div>

            {/* Interactive Gift Box Section */}
            <div className="mt-8">
              {!giftOpened ? (
                <button
                  onClick={() => setGiftOpened(true)}
                  className="animate-gift flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-xl shadow-pink-500/20 border border-white/20 group-hover:scale-110 transition duration-300">
                    <Gift className="h-12 w-12" />
                  </div>
                  <span className="text-sm font-semibold text-pink-300 group-hover:text-white transition">
                    Tap to Open Surprise Gift! 🎁
                  </span>
                </button>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-pink-500/40 shadow-2xl max-w-md animate-fade-in text-center">
                  <h3 className="text-xl font-bold text-pink-400 mb-2">💌 Special Birthday Wish 💌</h3>
                  <p className="text-slate-200 text-sm leading-relaxed mb-4">
                    "May your day be filled with endless joy, unforgettable moments, laughter, and all the love in the world. Keep shining bright!"
                  </p>
                  <button 
                    onClick={() => setGiftOpened(false)}
                    className="text-xs text-slate-400 hover:text-white underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <RotateCcw className="h-3 w-3" /> Close Box
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Footer Note */}
          <div className="relative z-10 text-center text-xs text-slate-500 mt-6">
            Made with ❤️ for a Very Special Birthday Celebration
          </div>

        </div>
      )}

    </div>
  );
}