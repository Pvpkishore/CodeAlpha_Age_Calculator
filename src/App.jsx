import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import animeimg from "./assets/anime.png";

const AgeCalculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [error, setError] = useState('');
  const containerRef = useRef();
  const formRef = useRef();
  const resultRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    gsap.from(containerRef.current, {
      duration: 1.5,
      scale: 0.8,
      opacity: 0,
      ease: 'elastic.out(1, 0.5)'
    });

    gsap.from('.anime-element', {
      duration: 1,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: 'power4.out'
    });
  }, []);

  const validateDate = () => {
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);
    
    if (!day || !month || !year) {
      setError('Please fill all fields');
      return false;
    }
    
    if (inputDate > currentDate) {
      setError('Birthdate cannot be in future');
      return false;
    }
    
    if (inputDate.getMonth() + 1 !== parseInt(month) || 
        inputDate.getDate() !== parseInt(day)) {
      setError('Invalid date');
      return false;
    }
    
    return true;
  };

  const calculateAge = (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateDate()) {
      gsap.fromTo(errorRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
    
    gsap.fromTo(resultRef.current.querySelectorAll('div'),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out'
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-pink-400 rounded-full animate-float" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}>
          </div>
        ))}
      </div>

      <div ref={containerRef} className="bg-opacity-50 backdrop-blur-lg rounded-3xl shadow-anime-glow border-2 border-white/20 relative z-10 w-full max-w-4xl mx-4">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <img 
              src={animeimg}
              alt="Anime Character"
              className="w-28 h-25 shadow-slate-700 shadow-md rounded-md anime-element"
             />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent anime-element">
                Kawaii Age Calculator
              </h1>
              <p className="text-white/80 mt-2 text-lg anime-element">Discover your anime age! ✨</p>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={calculateAge} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="anime-element">
                <label className="block text-cyan-300 text-sm mb-2 font-bold">Day</label>
                <input
                  type="number"
                  placeholder="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-cyan-300/30 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 text-white placeholder-white/30 transition-all"
                  min="1"
                  max="31"
                />
              </div>
              <div className="anime-element">
                <label className="block text-cyan-300 text-sm mb-2 font-bold">Month</label>
                <input
                  type="number"
                  placeholder="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-cyan-300/30 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 text-white placeholder-white/30 transition-all"
                  min="1"
                  max="12"
                />
              </div>
              <div className="anime-element">
                <label className="block text-cyan-300 text-sm mb-2 font-bold">Year</label>
                <input
                  type="number"
                  placeholder="1990"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-cyan-300/30 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 text-white placeholder-white/30 transition-all"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            {error && (
              <div ref={errorRef} className="text-pink-400 text-center font-bold animate-pulse anime-element">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button - Properly included */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-pink-500/30 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Calculate Magic Age!
            </button>
          </form>

          
          {/* Results */}
          <div ref={resultRef} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-pink-300/30 anime-result">
              <div className="text-5xl font-bold text-pink-400">{age.years}</div>
              <div className="text-cyan-300 mt-2">Years</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-cyan-300/30 anime-result">
              <div className="text-5xl font-bold text-cyan-400">{age.months}</div>
              <div className="text-pink-300 mt-2">Months</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-purple-300/30 anime-result">
              <div className="text-5xl font-bold text-purple-400">{age.days}</div>
              <div className="text-indigo-300 mt-2">Days</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <svg className="absolute -top-20 -right-20 w-64 h-64 opacity-30" viewBox="0 0 200 200">
          <path fill="#F472B6" d="M45.7,-59.2C58.3,-50.8,66.4,-34.4,69.1,-17.1C71.8,0.2,69,18.4,61.1,33.7C53.2,49,40.1,61.4,24.3,68.5C8.4,75.6,-10.3,77.4,-25.9,71.7C-41.5,66,-54.1,52.8,-63.6,37.4C-73.1,22,-79.6,4.4,-76.4,-10.9C-73.2,-26.3,-60.4,-39.3,-46.3,-47.2C-32.2,-55.1,-16.1,-57.9,1.1,-59.3C18.3,-60.6,36.6,-60.5,45.7,-59.2Z" transform="translate(100 100)"/>
        </svg>
      </div>
    </div>
  );
};

export default AgeCalculator;