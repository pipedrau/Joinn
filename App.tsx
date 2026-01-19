import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { JoinnStack } from './components/JoinnStack';
import { Partners } from './components/Partners';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <LanguageProvider>
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto no-scrollbar md:snap-y md:snap-mandatory snap-y snap-proximity scroll-smooth bg-white text-zinc-900 selection:bg-blue-100 selection:text-blue-900"
      >
        <LoadingScreen />
        <Navbar />
        <main>
          <Hero />
          <ProblemSolution scrollContainerRef={scrollContainerRef} />
          <JoinnStack scrollContainerRef={scrollContainerRef} />
          <Partners />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;