import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { JoinnStack } from './components/JoinnStack';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white text-zinc-900 selection:bg-blue-100 selection:text-blue-900"
    >
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution scrollContainerRef={scrollContainerRef} />
        <JoinnStack scrollContainerRef={scrollContainerRef} />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}

export default App;