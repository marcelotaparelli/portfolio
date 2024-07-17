import { useState } from 'react'
import './css/App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Skills from './components/Skills';
import Projects from './components/Projects';

function App()  {

  return (
    <main>
      <NavBar/>
      <Home />
      <Skills />
      <Projects /> 
    </main>
  );
}

export default App;
