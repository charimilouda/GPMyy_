import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';import Home from './components/landingPage/home.js';
import About from './components/landingPage/About.js';
import Work from './components/landingPage/Work.js';
import Testimonial from './components/landingPage/Testimonial.js';
import Contact from './components/landingPage/Contact.js';
import Footer from './components/landingPage/Footer.js';
import Accueil from './components/ChefProjet/Accueil/Accueil.js';
const AppRoutes = () => {
  // Définition des routes
  let routes = useRoutes([
    {
      path: "/",
      element: <div className="App"><Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer /></div>, 
    },
    {
      path: "/accueil",
      element: <Accueil nomUtilisateur="CHARI Milouda" />, 
    },
  ]);
  
  return routes; 
};
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />  {/* Affiche  */}
    </BrowserRouter>
  );
};
export default App;
